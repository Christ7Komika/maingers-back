"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes_1 = require("./routes/routes");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const env_1 = require("../env");
const Socket_1 = require("./socket/Socket");
const app = express();
const server = (0, http_1.createServer)(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use("/file", express.static("./server/upload"));
// Socket
const io = new socket_io_1.Server(server, {
    cors: {
        // origin: ["http://localhost:5173", "http://localhost:5174"],
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    // Create the room conversation
    socket.on("client:create-room", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("client => ", data);
        // Add a client to our database
        yield Socket_1.Socket.addClient(socket, data);
        const key = data.clientId;
        // Join the room
        socket.join(key);
        // Reload infos client
        socket.broadcast.emit("reload:clients");
    }));
    // Operator join a room
    socket.on("operator:join-room", (data) => {
        socket.join(data);
    });
    socket.on("client:message", (data) => {
        if (data.socketRoom) {
            Socket_1.Socket.saveMessage(data, socket);
        }
    });
    // Receive a message from operator
    socket.on("operator:send-message", (data) => {
        Socket_1.Socket.saveOperatorMessage(data, socket);
        if (data.socketRoom) {
            socket.broadcast.emit("message:operator", data);
        }
    });
});
// Routing
app.use(routes_1.default);
server.listen(env_1.default.port, () => {
    console.log(`[SERVER]::[CONNECTED] -> ${env_1.default.host}:${env_1.default.port}`);
});
