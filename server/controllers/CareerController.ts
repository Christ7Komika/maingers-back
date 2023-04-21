import { Response, Request } from "express";
import { prisma } from "../database";
import { resolve } from "path";
import { CareerFiles } from "../middlewares/uploadCareerFile";

export class CareerController {
  static async all(_: Request, res: Response) {
    try {
      await prisma.career.updateMany({
        where: {
          new: true,
        },
        data: {
          new: false,
        },
      });
      return res.status(200).json(await prisma.career.findMany());
    } catch (err) {
      return res.status(500).json({
        message:
          "Une erreur a été rencontré lors de la récupération des données",
        error: err,
      });
    }
  }

  static async one(req: Request, res: Response) {
    const career = await prisma.career.findUnique({
      where: { id: req.params.id },
    });

    if (career?.view === true) {
      await prisma.career.update({
        where: {
          id: req.params.id,
        },
        data: {
          view: false,
        },
      });
    }
    return res.json(career);
  }

  static async getViews(req: Request, res: Response) {
    try {
      const news = (
        await prisma.career.findMany({
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
        await prisma.career.findMany({
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

  static async store({ body, files }: Request, res: Response) {
    const uploads = files as unknown as CareerFiles;

    const photo = uploads.photo[0];
    const cv = uploads.cv[0];
    const motivation = uploads.motivation[0];

    const data = {
      ...body,
      photo: photo.filename,
      photoPath: resolve(photo.path),
      cv: cv.fieldname,
      cvPath: resolve(cv.path),
      motivationLetter: motivation.fieldname,
      motivationLetterPath: resolve(motivation.path),
    };

    try {
      await prisma.career.create({
        data: { ...data },
      });
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      await prisma.career.delete({ where: { id: req.params.id } });
      return res.status(200).json(await prisma.career.findMany());
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
