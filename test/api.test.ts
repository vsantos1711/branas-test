import axios from "axios";

test("Deve calcular a média de um aluno", async function () {
  const idEnrollment = 1;
  await axios.post(
    `http://localhost:3030/enrollments/${idEnrollment}/calculate-average`,
    {}
  );

  const response = await axios.get(
    `http://localhost:3030/enrollments/${idEnrollment}`
  );
  const output = response.data;

  expect(output.average).toBe(9);
});
