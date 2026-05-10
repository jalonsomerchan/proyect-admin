import { useEffect, useMemo, useState } from 'preact/hooks';

const TOKEN_STORAGE_KEY = 'proyect-admin.github-token';
const API_BASE_URL = 'https://api.github.com';
const FINE_GRAINED_TOKEN_URL = 'https://github.com/settings/personal-access-tokens/new';
const TOKENS_SETTINGS_URL = 'https://github.com/settings/tokens';

const deploymentStyles = {
  success: 'status-success',
  failure: 'status-danger',
  error: 'status-danger',
  inactive: 'status-muted',
  pending: 'status-warning',
  queued: 'status-warning',
  in_progress: 'status-info',
  unknown: 'status-muted',
  none: 'status-muted'
};

function formatDate(value) {
  if (!value) return 'Sin datos';

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

function getDeploymentLabel(status) {
  const labels = {
    success: 'Correcto',
    failure: 'Fallido',
    error: 'Error',
    inactive: 'Inactivo',
    pending: 'Pendiente',
    queued: 'En cola',
    in_progress: 'En progreso',
    unknown: 'Desconocido',
    none: 'Sin despliegues'
  };

  return labels[status] ?? status;
}

async function githubFetch(path, token) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response.ok) {
    const fallbackMessage = `GitHub ha respondido con ${response.status}`;
    let message = fallbackMessage;

    try {
      const data = await response.json();
      message = data?.message || fallbackMessage;
    } catch {
      // Keep the fallback message.
    }

    throw new Error(message);
  }

  return response.json();
}

async function getLatestDeploymentState(repo, token) {
  const deployments = await githubFetch(
    `/repos/${repo.full_name}/deployments?per_page=1`,
    token
  );

  const latestDeployment = deployments?.[0];

  if (!latestDeployment) {
    return {
      state: 'none',
      environment: null,
      updatedAt: null
    };
  }

  const statuses = await githubFetch(
    `/repos/${repo.full_name}/deployments/${latestDeployment.id}/statuses?per_page=1`,
    token
  );

  return {
    state: statuses?.[0]?.state || latestDeployment?.state || 'unknown',
    environment: latestDeployment.environment || null,
    updatedAt: statuses?.[0]?.updated_at || latestDeployment.updated_at || null
  };
}

async function getLatestCommitDate(repo, token) {
  const branch = repo.default_branch || 'main';
  const commits = await githubFetch(
    `/repos/${repo.full_name}/commits?sha=${encodeURIComponent(branch)}&per_page=1`,
    token
  );

  return commits?.[0]?.commit?.committer?.date || repo.pushed_at || repo.updated_at;
}

async function getRepositoriesWithDetails(token) {
  const repos = await githubFetch('/user/repos?sort=updated&direction=desc&per_page=20', token);

  return Promise.all(
    repos.map(async (repo) => {
      const [lastCommitDate, deployment] = await Promise.allSettled([
        getLatestCommitDate(repo, token),
        getLatestDeploymentState(repo, token)
      ]);

      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language || 'Sin lenguaje principal',
        private: repo.private,
        lastCommitDate:
          lastCommitDate.status === 'fulfilled'
            ? lastCommitDate.value
            : repo.pushed_at || repo.updated_at,
        deployment:
          deployment.status === 'fulfilled'
            ? deployment.value
            : { state: 'unknown', environment: null, updatedAt: null }
      };
    })
  );
}

export default function Dashboard() {
  const [token, setToken] = useState('');
  const [inputToken, setInputToken] = useState('');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setError('');

      try {
        const repositories = await getRepositoriesWithDetails(token);

        if (isMounted) {
          setRepos(repositories);
        }
      } catch (currentError) {
        if (isMounted) {
          setError(currentError.message || 'No se han podido cargar los repositorios.');
          setRepos([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const repoCountText = useMemo(() => {
    if (isLoading) return 'Cargando repositorios...';
    if (!repos.length) return 'Sin repositorios cargados';
    return `${repos.length} repositorios recientes`;
  }, [isLoading, repos.length]);

  function handleLogin(event) {
    event.preventDefault();

    const cleanToken = inputToken.trim();

    if (!cleanToken) {
      setError('Introduce un GitHub Personal Access Token válido.');
      return;
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, cleanToken);
    setToken(cleanToken);
    setInputToken('');
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken('');
    setRepos([]);
    setError('');
  }

  if (!token) {
    return (
      <section className="container-narrow panel" aria-labelledby="connect-title">
        <div className="panel-body">
          <div className="section-stack">
            <div>
              <p className="eyebrow">Privacidad primero</p>
              <h2 id="connect-title" className="text-3xl font-extrabold tracking-tight">
                Conecta GitHub con un token personal
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-muted)]">
                Tu token se queda en este navegador. No hay backend, no hay base de datos y no se manda a ningún servidor de Admin Proyects: solo se usa para llamar directamente a la API oficial de GitHub.
              </p>
            </div>

            <div className="alert">
              <strong>Cómo conseguir el token:</strong>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a className="btn btn-primary btn-full-mobile" href={FINE_GRAINED_TOKEN_URL} target="_blank" rel="noreferrer">
                  Crear token en GitHub
                </a>
                <a className="btn btn-secondary btn-full-mobile" href={TOKENS_SETTINGS_URL} target="_blank" rel="noreferrer">
                  Ver mis tokens
                </a>
              </div>
              <ol className="mt-4 grid gap-2 pl-5 text-sm font-medium" style={{ listStyle: 'decimal' }}>
                <li>Se abrirá GitHub en <strong>Fine-grained personal access tokens</strong>.</li>
                <li>Elige nombre, caducidad y los repositorios que quieres consultar.</li>
                <li>En permisos, usa solo lectura para <strong>Contents</strong>, <strong>Metadata</strong> y <strong>Deployments</strong>.</li>
                <li>Genera el token, cópialo y pégalo aquí. GitHub solo lo muestra una vez.</li>
              </ol>
              <p className="help-text">
                Consejo: crea un token con caducidad y permisos mínimos. No uses permisos de escritura si solo quieres consultar datos.
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleLogin}>
              <div>
                <label className="label" htmlFor="github-token">
                  GitHub Personal Access Token
                </label>
                <input
                  id="github-token"
                  className="input"
                  type="password"
                  placeholder="github_pat_..."
                  value={inputToken}
                  onInput={(event) => setInputToken(event.currentTarget.value)}
                  autoComplete="off"
                />
                <p className="help-text">
                  El token se guarda en localStorage de tu navegador. Puedes borrarlo en cualquier momento con “Cerrar sesión”.
                </p>
              </div>

              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : null}

              <button className="btn btn-primary btn-full-mobile" type="submit">
                Ver repositorios
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-stack" aria-labelledby="repositories-title">
      <div className="panel">
        <div className="panel-body dashboard-header">
          <div>
            <p className="eyebrow">GitHub dashboard</p>
            <h2 id="repositories-title" className="text-3xl font-extrabold tracking-tight">
              Últimos repositorios actualizados
            </h2>
            <p className="mt-2 text-[var(--color-text-muted)]">{repoCountText}</p>
          </div>

          <button className="btn btn-danger btn-full-mobile" type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="loading-grid" aria-label="Cargando repositorios">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="dashboard-grid">
          {repos.map((repo) => {
            const deploymentState = repo.deployment.state || 'unknown';
            const deploymentClass = deploymentStyles[deploymentState] || deploymentStyles.unknown;

            return (
              <article key={repo.id} className="card repo-card">
                <div className="card-body">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <a className="repo-title" href={repo.url} target="_blank" rel="noreferrer">
                        {repo.name}
                      </a>
                      <p className="repo-meta">{repo.fullName}</p>
                    </div>
                    {repo.private ? <span className="badge">Privado</span> : null}
                  </div>

                  {repo.description ? (
                    <p className="repo-description mt-5">{repo.description}</p>
                  ) : (
                    <p className="repo-empty-description mt-5">Sin descripción.</p>
                  )}

                  <dl className="repo-list">
                    <div className="repo-list-row">
                      <dt>Último commit</dt>
                      <dd>{formatDate(repo.lastCommitDate)}</dd>
                    </div>
                    <div className="repo-list-row">
                      <dt>Lenguaje</dt>
                      <dd><span className="badge">{repo.language}</span></dd>
                    </div>
                  </dl>

                  <div className="repo-footer">
                    <div>
                      <p className="repo-footer-label">Deployment</p>
                      {repo.deployment.environment ? (
                        <p className="repo-meta">{repo.deployment.environment}</p>
                      ) : null}
                    </div>
                    <span className={`status-badge ${deploymentClass}`}>
                      {getDeploymentLabel(deploymentState)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
