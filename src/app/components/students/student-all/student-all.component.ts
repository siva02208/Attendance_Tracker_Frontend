import { Component, OnInit } from '@angular/core';
import { regService } from '../../../services/reg.service';

@Component({
  selector: 'app-student-all',
  templateUrl: './student-all.component.html',
  styleUrls: ['./student-all.component.css']
})
export class StudentAllComponent implements OnInit {

  Student:any;

  constructor(private regService: regService) { }

  ngOnInit() {

    this.regService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Student= data;
    })

}
}
