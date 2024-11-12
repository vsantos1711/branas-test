import express, { Response, Request } from "express";

const app = express();
app.use(express.json());

app.get("/", async function (_: Request, response: Response) {
  response.send("Hello World!").status(200);
});

app.listen(3030);
