import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  form!: FormGroup;
  selectedBranch: string = '';



  constructor(
    public service: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      courseName: new FormControl('', [Validators.required]),
      courseBranch: new FormControl(),
      courseDescription: new FormControl('', Validators.required),
  });
}

get f(){
  return this.form.controls;
}

/**
 * Write code on Method
 *
 * @return response()
 */
submit(){
  console.log(this.form.value);
  this.service.create(this.form.value).subscribe((res:any) => {
       console.log('Course created successfully!');
       this.router.navigateByUrl('adminDashboard/coursemanage');
  })
}

}
