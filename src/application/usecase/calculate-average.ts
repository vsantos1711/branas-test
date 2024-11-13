import pgp from "pg-promise";

export default class CalculateAverage {
  constructor() {}

  async execute(input: Input): Promise<void> {
    const connection = pgp()(
      "postgres://user:pass@localhost:5432/testdatabase"
    );
    const gradesData = await connection.query(
      "SELECT * FROM tests.grade WHERE id_enrollment = $1",
      [input.idEnrollment]
    );

    let total = 0;
    for (const grade of gradesData) {
      total += parseFloat(grade.value);
    }
    const average = total / gradesData.length;
    await connection.query(
      "UPDATE tests.enrollment SET average = $1 WHERE id_enrollment = $2",
      [average, input.idEnrollment]
    );
    await connection.$pool.end();
  }
}

type Input = {
  idEnrollment: number;
};
