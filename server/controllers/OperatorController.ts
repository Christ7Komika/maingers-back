import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { hashSync } from "bcrypt";
import { ErrorType } from "../types/Error";
import passport from "passport";
import { Operator } from "@prisma/client";

export class OperatorController {
  static async all(_: Request, res: Response) {
    return res.json(
      await prisma.operator.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          isAdmin: true,
        },
      })
    );
  }

  static async one(req: Request, res: Response) {
    return res.json(
      await prisma.operator.findUnique({
        //@ts-ignore
        where: { id: req.params.id },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          operatorSocketId: true,
          email: true,
          isAdmin: true,
          createdAt: true,
        },
      })
    );
  }

  static async register({ body }: Request, res: Response) {
    try {
      const pwd = (body.password as string).split("~~MH~~");
      const isAdmin = pwd.length === 2 && pwd[0] === "ADM-MH" ? true : false;

      const hash =
        pwd.length === 2 ? hashSync(pwd[1], 10) : hashSync(pwd[0], 10);

      const data = {
        firstname: body.firstname as string,
        lastname: body.lastname as string,
        email: body.email as string,
        post: body.post as string,
        password: hash,
        isAdmin: isAdmin,
      };

      await prisma.operator.create({
        data: {
          ...data,
        },
      });
      return res.status(200).end();
    } catch (e) {
      const err = e as ErrorType;

      if (err.code === "P2002") {
        return res.status(500).json(4000);
      }
      return res.status(500).json({
        error: err,
        status: 3000,
      });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: any, operator: Operator) => {
      if (err) return res.status(400).json({ message: "Request failed" });
      if (!operator) res.status(400).json({ message: "Identifiant invalide" });
      if (operator) {
        req.logIn(operator, (err) => {
          if (err) return res.status(500).json({ error: err });
        });
      }
    })(req, res, next);
    return res.json(req.user);
  }

  static async logout(req: Request, res: Response) {}

  static async switchRole(req: Request, res: Response) {
    const id = req.params.id as string;
    const isAdmin = req.body.isAdmin as boolean;

    if (!isAdmin && typeof isAdmin !== "boolean") {
      return res.status(400).json(1030);
    }

    try {
      await prisma.operator.update({
        where: { id: id },
        data: { isAdmin: isAdmin },
      });
      return res.status(200).end();
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      await prisma.operator.delete({ where: { id: req.params.id } });
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
