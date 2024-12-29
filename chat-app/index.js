import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html")));

io.on("connection", (socket) => {
  console.log("user connected to (server) ✅");

  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", {
      name: msg.name,
      message: msg.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected to (server) ❌");
  });
});

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
