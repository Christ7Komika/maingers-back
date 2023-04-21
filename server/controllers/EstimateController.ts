import { Request, Response } from "express";
import { prisma } from "../database";
import { resolve } from "path";

export class EstimateController {
  static async all(_: Request, res: Response) {
    try {
      await prisma.estimate.updateMany({
        where: {
          new: true,
        },
        data: {
          new: false,
        },
      });
      return res.status(200).json(await prisma.estimate.findMany());
    } catch (err) {
      return res.status(500).json({
        message:
          "Une erreur a été rencontré lors de la récupération des données",
        error: err,
      });
    }
  }

  static async one(req: Request, res: Response) {
    const estimate = await prisma.estimate.findUnique({
      where: { id: req.params.id },
    });

    if (estimate?.view === true) {
      await prisma.estimate.update({
        where: {
          id: req.params.id,
        },
        data: {
          view: false,
        },
      });
    }
    return res.json(estimate);
  }

  static async getViews(req: Request, res: Response) {
    try {
      const news = (
        await prisma.estimate.findMany({
          where: {
            view: true,
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

  static async getNews(req: Request, res: Response) {
    try {
      const news = (
        await prisma.estimate.findMany({
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

  static async store({ body, file }: Request, res: Response) {
    const doc = file?.filename || "-";
    const docPath = file?.filename ? resolve(file?.path) : "-";

    const data = {
      ...body,
      file: doc,
      filePath: docPath,
    };
    try {
      await prisma.estimate.create({
        data: { ...data },
      });
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  static async destroy(req: Request, res: Response) {
    try {
      await prisma.estimate.delete({ where: { id: req.params.id } });
      return res.status(200).json(await prisma.estimate.findMany());
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
