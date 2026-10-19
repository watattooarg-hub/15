# 🚀 Guía de Despliegue en Netlify — Ambifest

Este proyecto está **100% configurado y optimizado** para ser desplegado en **Netlify** de forma gratuita y en menos de 2 minutos.

---

### Opción 1: Despliegue Automático conectando GitHub (Recomendado)

1. Sube este proyecto a tu cuenta de **GitHub** (o GitLab/Bitbucket).
2. Ve a [app.netlify.com](https://app.netlify.com/) e inicia sesión.
3. Haz clic en **"Add new site"** > **"Import an existing project"**.
4. Selecciona tu repositorio de GitHub.
5. Netlify detectará automáticamente el archivo `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Haz clic en **"Deploy site"**. ¡Listo! Tu invitación estará en línea con HTTPS y dominio gratuito (ej: `ambifest-xv.netlify.app`), o puedes agregar tu propio dominio personalizado.

---

### Opción 2: Despliegue Manual por Arrastrar y Soltar (Netlify Drop)

1. En tu computadora, ejecuta en la terminal:
   ```bash
   npm run build
   ```
2. Esto generará la carpeta `dist/` en la raíz del proyecto.
3. Ingresa a [app.netlify.com/drop](https://app.netlify.com/drop).
4. Arrastra y suelta la carpeta `dist` directamente en la ventana del navegador.
5. En segundos tu página web estará publicada en vivo.

---

### 📲 ¿Cómo funciona la confirmación para 500 o más invitados?

1. **Sin límite de invitados:** Puedes compartir el enlace de la invitación con 50, 500 o más invitados.
2. **Registro directo por WhatsApp:** Al confirmar, el invitado envía automáticamente un mensaje formateado con todos sus datos (nombre, teléfono, pases, restricción alimentaria, canción y dedicatoria) directamente al WhatsApp del evento (`+5491123226307`).
3. **Portal Secreto `/midas` (Código: `Ambar$`):** 
   - Se accede agregando `/midas` a la URL o desde el botón en el pie de página.
   - En este entorno cuenta con sincronización centralizada en `/api/rsvps` con actualización en tiempo real (botón de refresco y auto-sondeo cada 12 segundos).
   - Permite filtrar por confirmados (Sí), rechazados (No), restricciones alimentarias y pedidos de canciones.
   - Muestra el teléfono debajo del nombre con botón de llamada y WhatsApp directo.
   - Cuenta con botón para **Descargar Excel / CSV** en un clic.
   - Comienza completamente en **cero (0)**, sin datos de muestra inventados.
4. **Fecha límite de confirmación:** El formulario acepta respuestas hasta el **4 de Noviembre de 2026 a las 14:00 hs (Argentina)**. Pasada esa fecha y hora, el sistema se cierra automáticamente.
