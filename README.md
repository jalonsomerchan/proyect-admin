# Proyect Admin

Dashboard client-side construido con Astro, Preact y Tailwind CSS para visualizar repositorios de GitHub desde el navegador.

## Funcionalidad

- Solicita un GitHub Personal Access Token al usuario.
- Guarda el token únicamente en `localStorage`.
- No usa variables de entorno de servidor ni endpoints privados.
- Lista los últimos 20 repositorios del usuario autenticado.
- Muestra nombre, fecha del último commit, lenguaje principal y estado del último deployment.
- Incluye cierre de sesión para limpiar el token local.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación quedará disponible normalmente en `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

## Token de GitHub

Para repositorios públicos basta con permisos de lectura básicos. Para repositorios privados o deployments privados, el Personal Access Token debe tener acceso de lectura a esos repositorios y a sus deployments.

## Despliegue en GitHub Pages

El proyecto incluye `.github/workflows/deploy.yml` para desplegar automáticamente en GitHub Pages.

Pasos recomendados:

1. Entra en `Settings > Pages` dentro del repositorio.
2. En `Build and deployment`, selecciona `GitHub Actions` como fuente.
3. Ve a `Actions > Deploy to GitHub Pages`.
4. Ejecuta manualmente el workflow con `Run workflow` o haz push a `main`.
5. La web se publicará con la configuración de Astro:
   - `site: https://jalonsomerchan.github.io`
   - `base: /proyect-admin`

URL final esperada: `https://jalonsomerchan.github.io/proyect-admin/`.
