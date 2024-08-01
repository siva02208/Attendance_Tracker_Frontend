import { Component, OnInit } from '@angular/core';
import { regService } from '../../../services/reg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {


  constructor(private regService: regService,private router: Router) { }
  Student:any;
  user:any;
  studentId:any = localStorage.getItem("id");

  ngOnInit() {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);


    this.regService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Student= data;
    })

}



}
