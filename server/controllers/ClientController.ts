import { Request, Response } from "express";
import { prisma } from "../database";

export class ClientController {
  static async all(_: Request, res: Response) {
    return res.status(200).json(
      await prisma.client.findMany({
        select: {
          id: true,
          clientSocketId: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          message: {
            where: {
              isClient: true,
              isNew: true,
            },
            select: {
              isNew: true,
            },
          },
        },
      })
    );
  }

  static async one(req: Request, res: Response) {
    return res.status(200).json(
      await prisma.client.findFirst({
        where: {
          clientSocketId: req.params.id,
        },
        select: {
          id: true,
          clientSocketId: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      })
    );
  }

  static async handleNew(req: Request, res: Response) {
    try {
      await prisma.instantMessage.updateMany({
        where: {
          clientId: req.params.id,
          isClient: true,
          isNew: true,
        },
        data: {
          isNew: false,
        },
      });
      return res.status(200).json(
        await prisma.client.findMany({
          select: {
            id: true,
            clientSocketId: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            message: {
              where: {
                isClient: true,
                isNew: true,
              },
              select: {
                isNew: true,
              },
            },
          },
        })
      );
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  static async store({ body }: Request, res: Response) {
    try {
      await prisma.client.create({
        data: {
          ...body,
        },
      });
      return res.status(200).end();
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  static async destroy() {}
}
