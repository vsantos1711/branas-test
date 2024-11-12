import express, { Response, Request } from "express";
import pgp from "pg-promise";

const app = express();
app.use(express.json());

app.post(
  "/enrollments/:idEnrollment/calculate-average",
  async function (request: Request, response: Response) {
    const connection = pgp()("postgres://user:pass@postgres:5432/testdatabase");
    const gradesData = await connection.query(
      "SELECT * FROM tests.grade WHERE id_enrollment = $1",
      [request.params.idEnrollment]
    );

    let total = 0;
    for (const grade of gradesData) {
      total += parseFloat(grade.value);
    }
    const average = total / gradesData.length;
    await connection.query(
      "UPDATE tests.enrollment SET average = $1 WHERE id_enrollment = $2",
      [average, request.params.idEnrollment]
    );
    connection.$pool.end();
    response.end();
  }
);

app.get(
  "/enrollments/:idEnrollment",
  async function (request: Request, response: Response) {
    const connection = pgp()("postgres://user:pass@postgres:5432/testdatabase");

    const [enrollmentData] = await connection.query(
      "SELECT * FROM tests.enrollment WHERE id_enrollment = $1",
      [request.params.idEnrollment]
    );

    const average = parseFloat(enrollmentData.average);
    response.json({
      average,
    });
  }
);

app.listen(3030);
