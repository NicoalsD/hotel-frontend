# Hotel Reservas - Frontend

Interfaz web del **Sistema de Reservas de Hotel**, construida con React, Vite y Material UI.

## Ejecución local

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173` y redirige las peticiones `/api` al backend local (`http://localhost:8080`).

## Tecnologías

- React 19 y Vite 8
- Material UI v9 (`@mui/material`, `@mui/icons-material`)
- React Router v7 (`react-router-dom`)
- dayjs para fechas

## Estructura del proyecto

```
src/
  api/         Cliente HTTP y servicio de la API del hotel
  config/      Configuración desde variables de entorno
  components/  Componentes por flujo: search, booking, reservation, invoice, common, layout
  hooks/       Hooks reutilizables
  models/      Clases de dominio (una por archivo)
  pages/       Páginas asociadas a rutas
  theme/       Tema de Material UI
  utils/       Formato, validaciones y catálogos
docs/          Documentación de arquitectura, componentes, API y despliegue
```

Más detalle en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) y [docs/COMPONENTES.md](docs/COMPONENTES.md).

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `http://localhost:5173` |
| `npm run build` | Construye la aplicación en `dist/` |
| `npm run preview` | Sirve la construcción para revisión local |
| `npm run lint` | Ejecuta oxlint sobre el código |

## Variables de entorno

Copie `.env.example` a `.env.local` y defina:

| Variable | Descripción |
| --- | --- |
| `VITE_API_BASE_URL` | URL base del backend. Vacía en desarrollo, donde Vite redirige `/api` a `localhost:8080`. |
