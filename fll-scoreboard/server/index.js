const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { initDB } = require("./db");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const runsRouter = require("./routes/runs");

app.use("/api/runs", runsRouter);

initDB();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// make io available globally (simple approach for now)
app.set("io", io);

// routes will go here later

io.on("connection", (socket) => {
  console.log("Client connected");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});