const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Array de mensajes divertidos
const mensajesDivertidos = [
  '¡Hola Mundo! 🌍 ¡Bienvenido a mi aplicación DevOps!',
  '¡Ey! ¡Qué onda, Mundo! 👋',
  '¡HOLAAAA MUNDOOO! 🎉',
  '¿Qué onda, Tierra? 🌎',
  '¡Hola desde Docker! 🐳',
  '¡Hola desde GitHub Actions! 🤖',
  '¡Hola, hermano! ¡Soy una aplicación DevOps! 🚀'
];

// Endpoint raíz - HTML visual
app.get('/', (req, res) => {
  const indiceAleatorio = Math.floor(Math.random() * mensajesDivertidos.length);
  const mensaje = mensajesDivertidos[indiceAleatorio];
  
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hola Mundo DevOps</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          50% { background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%); }
        }
        
        .container {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 50px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
          animation: slideIn 0.8s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        h1 {
          font-size: 3.5em;
          color: white;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .message {
          font-size: 1.5em;
          color: #fff;
          margin: 20px 0;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .info-box {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          margin-top: 30px;
          border-radius: 10px;
          font-size: 0.9em;
          color: #fff;
        }
        
        .info-box p {
          margin: 8px 0;
        }
        
        .badge {
          display: inline-block;
          background: #00d4ff;
          color: #333;
          padding: 8px 15px;
          border-radius: 20px;
          margin: 5px;
          font-weight: bold;
          font-size: 0.85em;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 DevOps</h1>
        <div class="message">${mensaje}</div>
        
        <div class="info-box">
          <p><strong>📊 Estado de la Aplicación:</strong> ✅ En Línea</p>
          <p><strong>🐳 Ejecutándose en Docker:</strong> Sí</p>
          <p><strong>🔄 CI/CD Pipeline:</strong> Activo</p>
          <p><strong>⏰ Timestamp:</strong> ${new Date().toLocaleString('es-MX')}</p>
          <div style="margin-top: 15px;">
            <span class="badge">Node.js</span>
            <span class="badge">Express</span>
            <span class="badge">Docker</span>
            <span class="badge">GitHub Actions</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Endpoint API JSON
app.get('/api/hola', (req, res) => {
  const indiceAleatorio = Math.floor(Math.random() * mensajesDivertidos.length);
  res.json({
    success: true,
    mensaje: mensajesDivertidos[indiceAleatorio],
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    ambiente: process.env.NODE_ENV || 'desarrollo'
  });
});

// Endpoint de salud para los deploys
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 HOLA MUNDO DEVOPS ACTIVO 🚀     ║
║                                       ║
║   Servidor escuchando en:             ║
║   http://localhost:${PORT}              ║
║                                       ║
║   Endpoints disponibles:              ║
║   GET  /              (página HTML)   ║
║   GET  /api/hola      (JSON API)      ║
║   GET  /health        (Health check)  ║
╚═══════════════════════════════════════╝
  `);
});

module.exports = app;

///test