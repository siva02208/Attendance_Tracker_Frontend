import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-staff-reg',
  templateUrl: './staff-reg.component.html',
  styleUrls: ['./staff-reg.component.css']
})
export class StaffRegComponent implements OnInit {

  Staff:any;

  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Staff= data;
    })

}
viewDetails() {
  // Navigate to the "post/tcview" route
  this.router.navigateByUrl('tcview');
}

}
