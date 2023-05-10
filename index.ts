import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import routes from "./server/routes/routes";
import { Server } from "socket.io";
import { createServer } from "http";
import env from "./env";
import { Socket } from "./server/socket/Socket";
import { Client, Message } from "./server/types/Socket";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("tiny"));

app.use("/file", express.static("./server/upload"));

// Socket
const io = new Server(server, {
  cors: {
    // origin: ["http://localhost:5173", "http://localhost:5174"],
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Create the room conversation
  socket.on("client:create-room", async (data: Client) => {
    console.log("client => ", data);
    // Add a client to our database
    await Socket.addClient(socket, data);
    const key = data.clientId as string;

    // Join the room
    socket.join(key);

    // Reload infos client
    socket.broadcast.emit("reload:clients");
  });

  // Operator join a room
  socket.on("operator:join-room", (data) => {
    socket.join(data);
  });

  socket.on("client:message", (data: Message) => {
    if (data.socketRoom) {
      Socket.saveMessage(data, socket);
    }
  });

  // Receive a message from operator
  socket.on("operator:send-message", (data: Message) => {
    Socket.saveOperatorMessage(data, socket);
    if (data.socketRoom) {
      socket.broadcast.emit("message:operator", data);
    }
  });
});

// Routing
app.use(routes);

server.listen(env.port, () => {
  console.log(`[SERVER]::[CONNECTED] -> ${env.host}:${env.port}`);
});
