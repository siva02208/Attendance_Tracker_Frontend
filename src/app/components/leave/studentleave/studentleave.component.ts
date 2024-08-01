import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { Router } from '@angular/router';
import { LeaveInfo } from 'src/app/models/leave';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { StucourseService } from 'src/app/services/stucourse.service';

@Component({
  selector: 'app-studentleave',
  templateUrl: './studentleave.component.html',
  styleUrls: ['./studentleave.component.css'],
})
export class StudentleaveComponent implements OnInit {
  Leave: LeaveInfo[] = [];
  studentId!: number;
  teachers: User[] = [];

  constructor(
    private leaveservice: LeaveService,
    private router: Router,
    private stcoursesService: StucourseService,
    private staffService: UserService
  ) {}

  ngOnInit() {

    let storedId: any = localStorage.getItem('id');

    if (storedId !== null) {
      this.studentId = parseInt(storedId, 10);
    }

    this.getTeachers();
    this.findLeaves();
  }


  async findLeaves() {

    this.Leave = await this.leaveservice.getLeavesByStudent(this.studentId).toPromise()

    console.log(this.Leave)
   }

  getTeachers() {
    this.stcoursesService.getStaffByStudentId(this.studentId).subscribe((res) => {
      this.teachers = res;
      this.teachers = this.teachers.filter((teachers, index, self) =>
      index === self.findIndex((s) => s.staffId === teachers.staffId)
  );

      console.log(res)
      this.leaveservice.setTeachers(this.teachers);

    });
  }

  getTeacherName(id: number) {
    const teacher = this.teachers.find((teacher) => teacher.staffId === id);
    return teacher?.staffName;
  }

  addleave() {
    this.router.navigateByUrl('leave');
  }

  deleteLeave(student: any){
    this.leaveservice.delete(student.id).subscribe((res)=>{

      this.findLeaves();
    })

  }
}
