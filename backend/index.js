import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import routes from "./routes/book.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/book", routes);

app.listen(process.env.PORT, () =>
  console.log("Express ruunig server port: ", process.env.PORT)
);
db.dbConnect();
