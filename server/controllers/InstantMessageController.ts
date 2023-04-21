import { Request, Response } from "express";
import { prisma } from "../database";

export class InstantMessageController {
  static async one(req: Request, res: Response) {
    const clientId = req.body.clientId;
    const operatorId = req.body.operatorId;
    const clientData = await prisma.instantMessage.findMany({
      where: {
        clientId: clientId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const operatorData = await prisma.instantMessage.findMany({
      where: {
        operatorId: operatorId,
      },
      select: {
        id: true,
        clientId: true,
        isChanged: true,
        isClient: true,
        isNew: true,
        message: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log(operatorData);

    const client = clientId ? clientData : [];
    const operator = operatorId ? operatorData : [];

    return res.status(200).json([...client, ...operator]);
  }

  static async getNews(req: Request, res: Response) {
    return res.status(200).json(
      (
        await prisma.instantMessage.findMany({
          where: {
            clientId: req.params.id,
            AND: {
              isNew: true,
            },
          },
        })
      ).length
    );
  }

  static async updateNews(req: Request, res: Response) {
    await prisma.instantMessage.updateMany({
      where: {
        clientId: req.params.id,
        AND: {
          isNew: true,
        },
      },
      data: {
        isNew: false,
      },
    });

    return res.status(200).end();
  }

  static async store() {}
  static async destroy() {}
}
