import * as dotenv from "dotenv";

dotenv.config();

export default {
  host: process.env.HOST as string,
  port: process.env.PORT as string,
  secret: process.env.SECRET as string,
  refresh: process.env.SECRET as string,
  session: process.env.SESSION as string,
};
