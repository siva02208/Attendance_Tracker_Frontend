import { Component, OnInit } from '@angular/core';


import { TcourseService } from 'src/app/services/tcourse.service';
import { TeacherCourseInfo } from '../../../models/teachercourseinfo';

@Component({
  selector: 'app-tcview',
  templateUrl: './tcview.component.html',
  styleUrls: ['./tcview.component.css']
})
export class TcviewComponent implements OnInit {

  tcourse:any;
  teacherId!: number;

  constructor(
    private tcourseService: TcourseService,
  ) { }
  ngOnInit(): void {

    let storedId: any = localStorage.getItem('id');

    if (storedId !== null) {
      this.teacherId = parseInt(storedId, 10);
    }


    this.tcourseService.getTeacherAssignedCourses(this.teacherId).subscribe((data: any)=>{
      console.log(data);
      this.tcourse= data;
    })
  }




}
