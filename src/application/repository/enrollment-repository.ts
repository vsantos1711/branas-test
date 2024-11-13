export default interface EnrollmentRepository {
  getEnrollment(idEnrollment: number): Promise<Enrollment>;
  updateEnrollment(enrollment: Enrollment): Promise<void>;
}

type Enrollment = {};
