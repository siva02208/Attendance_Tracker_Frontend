export interface StudentCourseInfo {
  studentcourseid: number;
  atCourse: number;
  studentId: number;
  studentName: string;
}


export interface StudentCourseData {
  studentId: number;
  studentName: string;
  studentBranch: string;
  courseId: number;
  courseName: string;
  courseBranch: string;
  courseDescription: string;
}

export interface StudentCourseSummary {
  studentName: string;
  courses: string;
  branch: string;
}
