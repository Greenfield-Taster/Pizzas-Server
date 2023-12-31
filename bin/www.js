import app from "../app.js";
import { createServer } from "http";
import Debug from "debug";
import connection from "../mongodb/connection.js";

const debug = Debug("pizzas-server:server");

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

var server = createServer(app);

server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log("connecting to database...");
  await connection.connectToCluster();
});

server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
