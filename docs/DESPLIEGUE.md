# Despliegue

El frontend se publica en **Vercel** como una aplicación Vite estática. El backend Java corre en **AWS Elastic Beanstalk**.

## Vercel

1. Importar el repositorio en Vercel.
2. Framework preset: **Vite**. Comando de construcción: `npm run build`. Directorio de salida: `dist`.
3. Definir la variable de entorno `VITE_API_BASE_URL` si se desea apuntar a otro backend. Si se deja vacía, la aplicación usa rutas relativas `/api`.
4. Desplegar. Cada push a la rama principal genera un nuevo despliegue.

## Rewrites

El archivo `vercel.json` en la raíz define dos reglas:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "http://hotel-backend-grupo.us-east-1.elasticbeanstalk.com/api/:path*" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

- Las peticiones a `/api/...` se reenvían al backend en Elastic Beanstalk, por lo que el navegador no sufre problemas de CORS y el código no necesita conocer la URL del servidor.
- Cualquier otra ruta devuelve `index.html`, para que React Router resuelva rutas como `/reservas/RES-1` al recargar la página.

## Desarrollo local

Vite redirige `/api` a `http://localhost:8080` mediante `server.proxy` en `vite.config.js`. Para trabajar con el backend local no es necesario definir variables de entorno.

## Variables de entorno

Ver `.env.example`. La única variable es `VITE_API_BASE_URL`, que se lee en `src/config/AppConfig.js`.

## Verificación tras el despliegue

- Abrir la página de inicio y ejecutar una búsqueda de disponibilidad.
- Recargar una ruta interna, por ejemplo `/reservas`, y comprobar que no aparece un error 404.
- Confirmar que las peticiones a `/api/hotel/...` responden con datos del backend.
