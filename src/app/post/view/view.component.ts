import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post';
import { StucourseService } from 'src/app/services/stucourse.service';
import { AttendenceService } from 'src/app/services/attendence.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  studentId!: number;
  post!: Post;
  studentwithcourseDetails!: any[] ;
  showPassword: boolean = false;

  workingDays!: number;
  attendenceDetails!: any;
  holidays = [
    new Date('2023-09-22'), // Add your holidays here as Date objects
  ];

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private attendenceService: AttendenceService,
    private scourseService: StucourseService
   ) { }


  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['postId'];

    this.postService.find(this.studentId).subscribe((data: Post)=>{
      this.post = data;
      this.getAttendenceDetails();
    });

    this.scourseService.getStudentWithCourseDetails(this.studentId).subscribe((res) =>{
      this.studentwithcourseDetails = res;
      console.log(res);
    })

  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  getAttendenceDetails(){
    this.attendenceService.getStatusCounts(this.studentId).subscribe((res) => {
      console.log(res)
      this.workingDays = res.presentCount + res.absentCount
      this.attendenceDetails = {
        workingDays: this.workingDays,
        presentDays: res.presentCount,
        absentDays: res.absentCount,
        percentage: this.workingDays > 0? ((res.presentCount / this.workingDays) * 100): 0
      }
    })
  }


  getWorkingDaysFromDateToDate(fromDate: Date, toDate: Date, holidays: Date[]): number {
    // Validate input dates
    if (fromDate > toDate) {
      throw new Error("Invalid date range. 'fromDate' should be before 'toDate'.");
    }

    // Calculate the total days between fromDate and toDate
    const totalDays = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate the total working days, excluding holidays and Sundays
    let workingDays = 0;
    for (let i = 0; i <= totalDays; i++) {
      const currentDate = new Date(fromDate);
      currentDate.setDate(fromDate.getDate() + i);

      // Check if the current date is a holiday or a Sunday (day of the week 0)
      if (!holidays.includes(currentDate) && currentDate.getDay() !== 0) {
        workingDays++;
      }
    }

    return workingDays;
  }
}
