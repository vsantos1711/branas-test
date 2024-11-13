export default interface GradeRepository {
  getGradesById(idEnrollment: number): Promise<Grade[]>;
}
