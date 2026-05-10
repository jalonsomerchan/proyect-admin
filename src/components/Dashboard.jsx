import { useEffect, useMemo, useState } from 'preact/hooks';

const TOKEN_STORAGE_KEY = 'proyect-admin.github-token';
const API_BASE_URL = 'https://api.github.com';

const deploymentStyles = {
  success: 'bg-emerald-500 text-emerald-950 ring-emerald-200',
  failure: 'bg-red-500 text-red-950 ring-red-200',
  error: 'bg-red-500 text-red-950 ring-red-200',
  inactive: 'bg-slate-400 text-slate-950 ring-slate-200',
  pending: 'bg-amber-400 text-amber-950 ring-amber-200',
  queued: 'bg-amber-400 text-amber-950 ring-amber-200',
  in_progress: 'bg-sky-400 text-sky-950 ring-sky-200',
  unknown: 'bg-zinc-400 text-zinc-950 ring-zinc-200',
  none: 'bg-zinc-400 text-zinc-950 ring-zinc-200'
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
      <section className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/90 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur dark:bg-slate-900/85 sm:p-8">
        <div className="mb-6 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">
            Client-side only
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Conecta tu cuenta de GitHub
          </h2>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
            El token se guarda solo en tu navegador mediante localStorage. No se envía a ningún servidor propio ni se usa ninguna variable de entorno.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-100" htmlFor="github-token">
            GitHub Personal Access Token
          </label>
          <input
            id="github-token"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none ring-sky-300 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            type="password"
            placeholder="github_pat_..."
            value={inputToken}
            onInput={(event) => setInputToken(event.currentTarget.value)}
            autoComplete="off"
          />
          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            Permisos recomendados: lectura de repositorios y deployments. Para repos privados, el token necesita acceso a esos repositorios.
          </p>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          ) : null}

          <button className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-sky-700 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-100 sm:w-auto">
            Ver repositorios
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/90 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur dark:bg-slate-900/85 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">
            GitHub dashboard
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Últimos repositorios actualizados
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{repoCountText}</p>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-200"
          type="button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="min-h-56 animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => {
            const deploymentState = repo.deployment.state || 'unknown';
            const deploymentClass = deploymentStyles[deploymentState] || deploymentStyles.unknown;

            return (
              <article
                key={repo.id}
                className="group flex min-h-64 flex-col justify-between rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/90"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <a
                        className="text-xl font-black tracking-tight text-slate-950 transition group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300"
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {repo.name}
                      </a>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{repo.fullName}</p>
                    </div>
                    {repo.private ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        Privado
                      </span>
                    ) : null}
                  </div>

                  {repo.description ? (
                    <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {repo.description}
                    </p>
                  ) : (
                    <p className="text-sm leading-6 text-slate-400 dark:text-slate-500">Sin descripción.</p>
                  )}

                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="font-semibold text-slate-500 dark:text-slate-400">Último commit</dt>
                      <dd className="text-right font-bold text-slate-800 dark:text-slate-100">
                        {formatDate(repo.lastCommitDate)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="font-semibold text-slate-500 dark:text-slate-400">Lenguaje</dt>
                      <dd className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {repo.language}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Deployment</p>
                    {repo.deployment.environment ? (
                      <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                        {repo.deployment.environment}
                      </p>
                    ) : null}
                  </div>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.14em] ring-4 ${deploymentClass}`}>
                    <span className="h-2.5 w-2.5 rounded-full bg-current" aria-hidden="true" />
                    {getDeploymentLabel(deploymentState)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
