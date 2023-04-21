import { Request, Response } from "express";
import { prisma } from "../database";
import { ErrorType } from "../types/Error";
export class NewsLetterController {
  static async all(_: Request, res: Response) {
    try {
      await prisma.newsLetter.updateMany({
        where: {
          new: true,
        },
        data: {
          new: false,
        },
      });
      return res.status(200).json(await prisma.newsLetter.findMany());
    } catch (err) {
      return res.status(500).json({
        message:
          "Une erreur a été rencontré lors de la récupération des données",
        error: err,
      });
    }
  }

  static async one(req: Request, res: Response) {
    return res.json(
      await prisma.newsLetter.findUnique({
        where: { id: req.params.id },
      })
    );
  }

  static async getNews(_: Request, res: Response) {
    try {
      const news = (
        await prisma.newsLetter.findMany({
          where: {
            new: true,
          },
          select: {
            id: true,
          },
        })
      ).length;

      return res.status(200).json(news);
    } catch (err) {
      return res.status(500).json({
        message:
          "Une erreur a été rencontré lors de la récuperation des données",
        error: err,
      });
    }
  }

  static async store({ body }: Request, res: Response) {
    try {
      await prisma.newsLetter.create({
        data: { ...body },
      });
      return res.status(200).end();
    } catch (e) {
      const err = e as ErrorType;

      if (err.code === "P2002") {
        return res.status(500).json({
          status: 4000,
        });
      }
      return res.status(500).json({
        error: err,
        status: 3000,
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      await prisma.newsLetter.delete({ where: { id: req.params.id } });
      return res.status(200).json(await prisma.newsLetter.findMany());
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
