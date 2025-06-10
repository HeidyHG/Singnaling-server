const http = require('http');
const io = require('socket.io');

const server = http.createServer();
const socketServer = io(server, {
  cors: {
    origin: "*"
  }
});

socketServer.on('connection', socket => {
  console.log('Usuario conectado:', socket.id);

  socket.on('signal', data => {
    console.log('Señal recibida:', data);
    // data = { targetId, message }
    socket.to(data.targetId).emit('signal', {
      senderId: socket.id,
      message: data.message
    });
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor de señalización escuchando en el puerto ${PORT}`);
});

