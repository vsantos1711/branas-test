import pgp from "pg-promise";

export default class GetEnrollment {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const connection = pgp()(
      "postgres://user:pass@localhost:5432/testdatabase"
    );
    const [enrollmentData] = await connection.query(
      "SELECT * FROM tests.enrollment WHERE id_enrollment = $1",
      [input.idEnrollment]
    );

    const average = parseFloat(enrollmentData.average);
    await connection.$pool.end();

    return { average };
  }
}

type Input = {
  idEnrollment: number;
};

type Output = {
  average: number;
};
