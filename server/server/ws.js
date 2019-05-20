const WebSocketServer = require("websocket").server;

const createWebSocketServer = server => {
  const _ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });

  _ws.on("request", function(request) {
    const connection = request.accept(null, request.origin);
    connection.send(JSON.stringify({ connected: true }));

    connection.on("message", ({ utf8Data: message, ...abc }) => {
      _ws.broadcast(message);
    }); // const connection = request.accept(null, request.origin);
  });

  return _ws;
};
module.exports = createWebSocketServer;
