import express, { Response, Request } from "express";
import CalculateAverage from "./application/usecase/calculate-average";
import GetEnrollment from "./application/usecase/get-enrollments";

const app = express();
app.use(express.json());

app.post(
  "/enrollments/:idEnrollment/calculate-average",
  async function (request: Request, response: Response) {
    const input = { idEnrollment: parseInt(request.params.idEnrollment) };
    const calculateAverage = new CalculateAverage();
    await calculateAverage.execute(input);
    response.end();
  }
);

app.get(
  "/enrollments/:idEnrollment",
  async function (request: Request, response: Response) {
    const input = { idEnrollment: parseInt(request.params.idEnrollment) };
    const getEnrollment = new GetEnrollment();
    const output = await getEnrollment.execute(input);
    response.json({ average: output.average });
  }
);

app.listen(3030);
