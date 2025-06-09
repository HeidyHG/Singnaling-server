const WebSocket = require('ws');

// Crear servidor WebSocket en el puerto 3000
const wss = new WebSocket.Server({ port: 3000 });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('✅ Cliente conectado. Total:', clients.size);

  ws.on('message', (message) => {
    console.log('📨 Mensaje recibido:', message.toString());

    // Enviar mensaje a todos los demás clientes (menos al emisor)
    for (let client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('❌ Cliente desconectado. Total:', clients.size);
  });
});

console.log('🚀 Servidor WebRTC señalización corriendo en ws://localhost:3000');
