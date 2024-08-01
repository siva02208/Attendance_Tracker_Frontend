import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CourseInfo } from '../../../models/courseinfo';

import { TcourseService } from '../../../services/tcourse.service';
import { CourseService } from '../../../services/course.service';



@Component({
  selector: 'app-teachercourse',
  templateUrl: './teachercourse.component.html',
  styleUrls: ['./teachercourse.component.css']
})
export class TeachercourseComponent implements OnInit {

  posts:CourseInfo[]=[];


  form!: FormGroup;


  constructor(
    public service: TcourseService,
    private router: Router,
    private route: ActivatedRoute,public postService: CourseService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      CourseId: new FormControl('', [Validators.required]),
      CourseName: new FormControl('', Validators.required),
      StaffId: new FormControl('', Validators.required),
      StaffName: new FormControl('', Validators.required)
    });

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const name = params['name'];

      // console.log('ID:', id);
      // console.log('Name:', name);

      this.form.controls['StaffId'].setValue(id);
      console.log(this.form.controls['StaffId'].value+"hello");
      this.form.controls['StaffName'].setValue(name);
    });

    this.postService.getAll().subscribe((data: CourseInfo[])=>{
      this.posts = data;
      console.log(this.posts);
    })

  }

  onCourseNameChange(event: Event) {
    const selectedCourseName = (event.target as HTMLSelectElement).value;

    const selectedIndex = this.posts.findIndex(post => post.courseName === selectedCourseName);

    if (selectedIndex !== -1) {
      const selectedCourseId = this.posts[selectedIndex].courseId;
      this.form.controls['CourseId'].setValue(selectedCourseId);
    } else {
    }
  }


  submit(){
    console.log(this.form.value);
    this.service.create(this.form.value).subscribe((res:any) => {
         console.log('Course added to staff successfully!');
         this.router.navigateByUrl('staffmanage');
    })
  }

}
