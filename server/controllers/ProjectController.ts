import { Request, Response } from "express";
import { prisma } from "../database";

export class ProjectController {
  static async all(_: Request, res: Response) {
    try {
      await prisma.project.updateMany({
        where: {
          new: true,
        },
        data: {
          new: false,
        },
      });
      return res.status(200).json(await prisma.project.findMany());
    } catch (err) {
      return res.status(500).json({
        message:
          "Une erreur a été rencontré lors de la récupération des données",
        error: err,
      });
    }
  }

  static async one(req: Request, res: Response) {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });

    if (project?.view === true) {
      await prisma.project.update({
        where: {
          id: req.params.id,
        },
        data: {
          view: false,
        },
      });
    }
    return res.json(project);
  }

  static async getViews(req: Request, res: Response) {
    try {
      const news = (
        await prisma.project.findMany({
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
        await prisma.project.findMany({
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
      await prisma.project.create({ data: { ...body } });
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json();
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      await prisma.project.delete({ where: { id: req.params.id } });
      return res.status(200).json(await prisma.project.findMany());
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
