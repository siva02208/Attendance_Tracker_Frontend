import { Component, OnInit } from '@angular/core';
import { LeaveInfo } from 'src/app/models/leave';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-submissions',
  templateUrl: './leave-submissions.component.html',
  styleUrls: ['./leave-submissions.component.css'],
})
export class LeaveSubmissionsComponent implements OnInit {
  teacherId!: number;
  leaves!: LeaveInfo[];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.getAllLeaveRequests();
  }

  getAllLeaveRequests() {
    const storedId = localStorage.getItem('id');

    if (storedId !== null) {
      this.teacherId = parseInt(storedId, 10);
    }

    this.leaveService.getLeavesByTeacher(this.teacherId).subscribe((res)=>{
      this.leaves = res;
    });
  }


  updateLeaveStatus(leave: any){
    this.leaveService.update(leave.id, leave).subscribe((res)=>{
      this.getAllLeaveRequests();
    })
  }
}
