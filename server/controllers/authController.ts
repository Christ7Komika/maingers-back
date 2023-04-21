import { prisma } from "../database";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Operator } from "@prisma/client";
import env from "../../env";
import { token } from "morgan";

type OperatorType = {
  email: string;
  password: string;
};

export class AuthController {
  static refreshTokens: string[] = [];

  static async login(req: Request, res: Response) {
    const { email, password }: OperatorType = req.body;

    try {
      const operator = await AuthController.validateEmail(email);
      if (!operator) {
        return res.status(400).json({ message: "Identifiant invalide." });
      }

      if (!AuthController.validatePass(password, operator.password)) {
        return res.status(400).json({ message: "Identifiant invalide." });
      }

      // Generate an access token
      const token = AuthController.generateToken(operator);

      // Generate a refresh token
      const refresh = jwt.sign(operator, env.refresh);

      // Add to refresh token
      AuthController.refreshTokens.push(refresh);

      return res.status(200).json({
        token: token,
        refresh: refresh,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Identifiant invalide",
        error: err,
      });
    }
  }

  static async getOperator(req: Request, res: Response) {
    const token = req.body.token;
    const operator = jwt.decode(token, { complete: true })?.payload;
    return res.json(operator);
  }

  static async logout(req: Request, res: Response) {
    AuthController.refreshTokens = AuthController.refreshTokens.filter(
      (token) => token !== req.body.token
    );
    return res.status(200).json("logout success");
  }

  private static async validateEmail(email: string): Promise<Operator | false> {
    const operator = await prisma.operator.findUnique({
      where: {
        email: email,
      },
    });

    if (operator) return operator;
    return false;
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken: string = req.body.token;
    if (!refreshToken) return res.status(401).json("Token invalide");
    if (!AuthController.refreshTokens.includes(refreshToken)) {
      return res.status(401).json("Token inexistant");
    }

    jwt.verify(refreshToken, env.refresh, (err, user) => {
      if (err) return res.status(401);
      const operator = user as Operator;
      const accessToken = AuthController.generateToken(operator);
      return res.json({ accessToken: accessToken });
    });
  }

  static async isAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json("Aucun token trouvé");
    jwt.verify(token, env.secret, (error, user) => {
      if (error) return res.status(200).json("Token invalide");
      req.user = user;
      next();
    });
  }

  private static generateToken(operator: Operator) {
    return jwt.sign(operator, env.secret, { expiresIn: "3600s" });
  }

  private static validatePass(pwd: string, hash: string): boolean {
    if (bcrypt.compareSync(pwd, hash)) {
      return true;
    }
    return false;
  }
}
