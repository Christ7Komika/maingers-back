import passport from "passport";
import { Strategy } from "passport-local";
import { prisma } from "../database";
import { compareSync } from "bcrypt";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const operator = await prisma.operator.findUnique({
          where: {
            email: email,
          },
        });

        // Email is not exist
        if (!operator) {
          return done(null, false, { message: "Aucun operateur trouvé" });
        }

        // Password is invalid
        if (!compareSync(password, operator.password)) {
          return done(null, false, { message: "Idantifiant invalide" });
        }

        return done(null, operator);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((operaror: any, done) => {
  done(null, operaror.id);
});

passport.deserializeUser((id: string, done) => {
  prisma.operator
    .findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        post: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    .then((operator) => done(null, operator))
    .catch((err) => done(err));
});
