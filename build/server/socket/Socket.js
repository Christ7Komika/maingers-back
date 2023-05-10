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
exports.Socket = void 0;
const database_1 = require("../database");
class Socket {
    static saveMessage(data, socket) {
        database_1.prisma.client
            .update({
            where: {
                clientSocketId: data.socketRoom,
            },
            data: {
                message: {
                    create: {
                        message: data.message,
                        createdAt: new Date(data.date),
                    },
                },
            },
        })
            .then(() => {
            console.log("Message saved");
            socket.broadcast.emit("reload:clients");
            if (data.socketRoom) {
                socket.broadcast.to(data.socketRoom).emit("client:send-message");
            }
        })
            .catch((err) => console.log("Error to saved message : ", err));
    }
    static saveOperatorMessage(data, socket) {
        if (data.socketRoom) {
            database_1.prisma.client
                .update({
                where: {
                    clientSocketId: data.socketRoom,
                },
                data: {
                    message: {
                        create: {
                            operatorName: data.username,
                            message: data.message,
                            createdAt: new Date(data.date),
                            isClient: false,
                        },
                    },
                },
            })
                .then(() => {
                socket.emit("message:new", data.socketRoom);
            })
                .catch((err) => console.log("Can't save message: ", err));
        }
    }
    static quitRoom() { }
    static addClient(socket, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = socket.handshake.address;
            const user = yield database_1.prisma.client.findFirst({
                where: {
                    ip: address,
                },
            });
            if (user && user.clientSocketId) {
                yield database_1.prisma.client.update({
                    where: {
                        clientSocketId: user.clientSocketId,
                    },
                    data: {
                        name: client.username,
                        clientSocketId: client.clientId,
                        message: {
                            create: {
                                message: JSON.stringify({
                                    lastName: user.name,
                                    newName: client.username,
                                }),
                                isChanged: true,
                                createdAt: new Date(),
                            },
                        },
                    },
                });
            }
            else {
                database_1.prisma.client
                    .create({
                    data: {
                        ip: address,
                        clientSocketId: client.clientId,
                        name: client.username,
                        email: client.email,
                    },
                })
                    .then(() => {
                    console.log("user " +
                        client.username +
                        " with the id " +
                        client.clientId +
                        " is connected");
                })
                    .catch((err) => console.log("user " +
                    client.username +
                    " with the id " +
                    client.clientId +
                    " can't connect : ", err));
            }
        });
    }
}
exports.Socket = Socket;
