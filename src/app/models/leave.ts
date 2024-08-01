export interface LeaveInfo {
  id?: number;
  studentId: string;
  fromDate: Date;
  toDate:Date;
  teacherId:number;
  leaveDescription:string;
  leaveStatus: string;
}
