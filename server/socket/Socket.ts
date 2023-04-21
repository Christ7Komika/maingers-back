import { prisma } from "../database";
import { Client, IO, Message } from "../types/Socket";
import { Prisma } from "@prisma/client";

export class Socket {
  static saveMessage(data: Message, socket: IO) {
    prisma.client
      .update({
        where: {
          clientSocketId: data.socketRoom as string,
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

  static saveOperatorMessage(data: Message, socket: IO) {
    if (data.socketRoom) {
      prisma.client
        .update({
          where: {
            clientSocketId: data.socketRoom as string,
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

  static quitRoom() {}

  static async addClient(socket: IO, client: Client) {
    const address = socket.handshake.address;

    const user = await prisma.client.findFirst({
      where: {
        ip: address,
      },
    });

    if (user && user.clientSocketId) {
      await prisma.client.update({
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
    } else {
      prisma.client
        .create({
          data: {
            ip: address,
            clientSocketId: client.clientId,
            name: client.username,
            email: client.email,
          },
        })
        .then(() => {
          console.log(
            "user " +
              client.username +
              " with the id " +
              client.clientId +
              " is connected"
          );
        })
        .catch((err) =>
          console.log(
            "user " +
              client.username +
              " with the id " +
              client.clientId +
              " can't connect : ",
            err
          )
        );
    }
  }
}
