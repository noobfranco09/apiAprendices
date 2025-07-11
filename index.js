// importamos la libreria
import express from "express"; // es6
import "dotenv/config";
import aprendiz from "../api/src/modules/aprendices/aprendiz.routes.js";
import morgan from "morgan";

import cors from "cors";
//dotenv.config();

const app = express();
app.use(express.json());

/* morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
}); */
app.use(morgan('tiny'));
app.use(cors());

app.use("/aprendiz", aprendiz);

app.listen(process.env.PORT, () => {
  console.log(`API ON in port: ${process.env.PORT}`);
});
