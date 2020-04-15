const server = require("net").createServer();
var counter = 0;
var sockets = {};

server.on("connection", (socket) => {
  socket.id = counter++;
  //sockets[socket.id] = socket;

  console.log("Client connected");
  socket.write("Please enter your name: \n");

  socket.on("data", data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      
      socket.write(`Welcome ${socket.name} \n`);
      sockets[socket.id] = socket;
      return;
    } else {
      Object.entries(sockets).forEach(([id, cs]) => {
        if (socket.id == id) return;
        cs.write(`${socket.name} [${timestamp()}]: ${data}`);
      });
    }
  });

  socket.on("end", () => {
    delete sockets[socket.id];
    `Client ${socket.id} disconnected!`;
  });

  socket.on("error", console.error);
});

function timestamp() {
    const now = new Date();
    return `${now.getHours()}: ${now.getMinutes()}`;
}

server.listen(8000, () => {
  console.log("Server now active on port 8000.");
});
