import CalculateAverage from "../../src/application/usecase/calculate-average";
import GetEnrollment from "../../src/application/usecase/get-enrollments";

test("Deve calcular a média de um aluno", async function () {
  const input = { idEnrollment: 1 };

  const calculateAverage = new CalculateAverage();
  await calculateAverage.execute(input);

  const getEnrollment = new GetEnrollment();
  const output = await getEnrollment.execute(input);

  expect(output.average).toBe(9);
});
