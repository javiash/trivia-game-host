# 🚀 Guía de Deploy en Render.com

Esta guía te ayudará a deployar tu aplicación Trivia de Cumpleaños en Render.com.

## 📋 Requisitos Previos

1. Cuenta en [Render.com](https://render.com) (gratis)
2. Repositorio en GitHub, GitLab o Bitbucket
3. Tu proyecto configurado correctamente

## 🔧 Configuración del Proyecto

El proyecto ya está configurado para Render.com. Los archivos importantes son:

- `render.yaml` - Configuración de Render (opcional)
- `package.json` - Scripts de build y start
- `server.js` - Servidor que sirve tanto API como frontend

## 📝 Pasos para Deploy

### Opción 1: Usando la UI de Render (Recomendado)

1. **Inicia sesión en Render.com**
   - Ve a [dashboard.render.com](https://dashboard.render.com)

2. **Crea un nuevo Web Service**
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio (GitHub/GitLab/Bitbucket)
   - Selecciona el repositorio del proyecto

3. **Configura el servicio:**
   - **Name**: `trivia-cumpleanos` (o el nombre que prefieras)
   - **Environment**: `Node`
   - **Region**: Elige la más cercana a tus usuarios
   - **Branch**: `main` (o la rama que uses)
   - **Root Directory**: (deja vacío, usa la raíz)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (o el plan que prefieras)

4. **Variables de Entorno:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render lo asigna automáticamente, pero puedes especificarlo)

5. **Click en "Create Web Service"**
   - Render comenzará a construir y deployar tu aplicación
   - Esto puede tomar 5-10 minutos la primera vez

6. **Espera a que termine el deploy**
   - Verás los logs en tiempo real
   - Cuando termine, tendrás una URL como: `https://trivia-cumpleanos.onrender.com`

### Opción 2: Usando render.yaml (Avanzado)

Si prefieres usar el archivo `render.yaml`:

1. Asegúrate de que `render.yaml` esté en la raíz de tu repositorio
2. En Render, cuando crees el servicio, selecciona "Apply render.yaml"
3. Render leerá la configuración automáticamente

## ✅ Verificación

Una vez deployado:

1. **Visita tu URL**: `https://tu-app.onrender.com`
2. **Prueba el modo Host**: 
   - Click en "Soy el Anfitrión"
   - Contraseña: `Marco`
3. **Prueba el modo Jugador**:
   - Abre otra pestaña/ventana
   - Click en "Soy un Jugador"
   - Ingresa un nombre

## 🔍 Troubleshooting

### El sitio no carga
- Verifica que el build se completó correctamente
- Revisa los logs en Render Dashboard
- Asegúrate de que `NODE_ENV=production` esté configurado

### Socket.IO no funciona
- Verifica que el servidor esté corriendo
- Revisa la consola del navegador para errores
- Asegúrate de que CORS esté configurado correctamente (ya está en el código)

### Error 404 en rutas
- El servidor ya está configurado para servir el SPA correctamente
- Si persiste, verifica que `dist/index.html` exista después del build

### El build falla
- Verifica que todas las dependencias estén en `dependencies` o `devDependencies`
- Revisa los logs de build en Render
- Asegúrate de que Node.js versión sea compatible (Render usa la última LTS)

## 🔄 Actualizaciones

Para actualizar tu aplicación:

1. Haz push a tu repositorio
2. Render detectará los cambios automáticamente
3. Iniciará un nuevo build y deploy
4. Tu aplicación se actualizará automáticamente

## 💰 Planes de Render

- **Free**: 
  - Perfecto para proyectos personales
  - El servicio se "duerme" después de 15 minutos de inactividad
  - Se despierta automáticamente cuando alguien lo visita (puede tomar ~30 segundos)

- **Starter ($7/mes)**:
  - Sin sleep
  - Mejor para producción

## 📝 Notas Importantes

1. **Primera carga lenta**: En el plan gratuito, la primera carga después de dormir puede tardar ~30 segundos
2. **WebSockets**: Funcionan perfectamente en Render
3. **HTTPS**: Render proporciona HTTPS automáticamente
4. **Dominio personalizado**: Puedes agregar tu propio dominio en la configuración

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en Render.com. Comparte la URL con tus amigos y disfruta de tu trivia de cumpleaños en línea!

