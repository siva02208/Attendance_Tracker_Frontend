import { Component, OnInit } from '@angular/core';
import { regService } from '../../../services/reg.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-reg',
  templateUrl: './student-reg.component.html',
  styleUrls: ['./student-reg.component.css']
})
export class StudentRegComponent implements OnInit {

  Student:any;

  constructor(private regService: regService,private router: Router) { }

  ngOnInit() {

    this.regService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Student= data;
    })

}



}
