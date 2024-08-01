import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CourseInfo } from 'src/app/models/courseinfo';



@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.css']
})
export class EditcourseComponent implements OnInit {

  form!: FormGroup;
  selectedBranch!: string;
  courseId!: number;
  courseData!: CourseInfo


  constructor(public service: CourseService,
        private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      courseId: new FormControl('', [Validators.required]),
      courseBranch: new FormControl('', [Validators.required]),
      courseName: new FormControl('', [Validators.required]),
      courseDescription: new FormControl('', Validators.required),
  });


  this.route.queryParams.subscribe((params) => {
    this.courseId = params['id'];
  });


  this.service.find(this.courseId).subscribe((data)=>{
    console.log(data);
    this.courseData = data;
    this.selectedBranch = this.courseData.courseBranch
  });


  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      console.log("courseid:"+id)

    this.service.update(id, this.form.value).subscribe((res:any) => {
         console.log('Post updated successfully!');

    })
  });
  this.router.navigateByUrl('adminDashboard/coursemanage');
  }

}
