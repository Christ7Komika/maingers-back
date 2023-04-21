import { Request, Response } from "express";
import { prisma } from "../database";
import { resolve } from "path";

export class ContactController {
  static async all(_: Request, res: Response) {
    try {
      await prisma.contact.updateMany({
        where: {
          new: true,
        },
        data: {
          new: false,
        },
      });
      return res.status(200).json(await prisma.contact.findMany());
    } catch (err) {
      return res.status(500).json({
        message:
          "Une erreur a été rencontré lors de la récupération des données",
        error: err,
      });
    }
  }

  static async one(req: Request, res: Response) {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id },
    });

    if (contact?.view === true) {
      await prisma.contact.update({
        where: {
          id: req.params.id,
        },
        data: {
          view: false,
        },
      });
    }
    return res.json(contact);
  }

  static async getViews(req: Request, res: Response) {
    try {
      const news = (
        await prisma.contact.findMany({
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
        await prisma.contact.findMany({
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
      await prisma.contact.create({
        data: { ...data },
      });
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json();
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      await prisma.contact.delete({ where: { id: req.params.id } });
      return res.status(200).json(await prisma.contact.findMany());
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
