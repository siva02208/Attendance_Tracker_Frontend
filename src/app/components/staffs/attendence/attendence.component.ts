import { Component, OnInit } from '@angular/core';
import { TcourseService } from 'src/app/services/tcourse.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { Attendence } from '../../../services/attendence';
import { AttendenceService } from '../../../services/attendence.service';
import { UserService } from 'src/app/services/user.service';
import { StucourseService } from 'src/app/services/stucourse.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css'],
})
export class AttendenceComponent implements OnInit {
  students: Post[] = [];
  tcourse:any;
  teacherId!: number;


  selectedBranch: string = '';

  teacher: any;

  studentId!: number;
  attendence!: Attendence;
  id!: number;
  form!: FormGroup;
  posts: Post[] = [];
  dropdownList!: any;
  selectedItems!: any;
  dropdownSettings!: any;
  isDataAvailable: boolean = false;
  errorMessage!: string;
  constructor(
    public attendenceService: AttendenceService,
    private router: Router,
    public postService: PostService,
    private tcourseService: TcourseService,
    private userService: UserService,
    private stcoursesService: StucourseService,
  ) {}

  ngOnInit(): void {
    let storedId: any = localStorage.getItem('id');

    if (storedId !== null) {
      this.teacherId = parseInt(storedId, 10);
    }
    this.getTeacher();


    this.tcourseService.getTeacherAssignedCourses(this.teacherId).subscribe((data: any)=>{
      console.log(data);
      this.tcourse= data;
    })

    this.form = new FormGroup({
      temp: new FormControl(),
      studentId: new FormControl('', Validators.required),
      // date: new FormControl(new Date(), [Validators.required]),
      date: new FormControl(new Date(), [Validators.required, this.DateValidator()]),
      presentStatus: new FormControl('', Validators.required),
    });
  }

  DateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);

      if (selectedDate.toDateString() != currentDate.toDateString()) {
        return { invalidDate: true };
      }

      return null;
    };
  }
  get f() {
    return this.form.controls;
  }

  getTeacher() {
    this.userService.find(this.teacherId).subscribe((res) => {
      this.teacher = res;
      this.getData();

    });
  }

  submit() {
    this.selectedItems.map((data: any) => {
      const temp = this.form.value;
      temp['studentId'] = data.studentId;
      temp['staffId'] = this.teacherId;

      this.attendenceService.create(temp).subscribe(
        (res) => {
          console.log('attendence updated successfully!');
          this.errorMessage = '';

          if (temp['presentStatus'] == 'absent') {
            const attendence = {
              student: this.getStudent(data.studentId),
              teacher: this.teacher,
              onDate: temp['date'],
            };

            console.log(attendence);

            this.attendenceService.sendEmail(attendence).subscribe((res) => {
              console.log('Mail sent to successfully!' + data);
            });
          }
          this.router.navigateByUrl('StaffsDashboard');
        },
        (error) => {
          console.log('error updated successfully!');

          this.errorMessage = 'The Attendence is already given.';
          console.error('Error:', error);
        }
      );
    });
  }

  getStudent(id: number): any {
    return this.students.find((student) => student.studentId === id);
  }

  onItemSelect($event: any) {
    this.selectedItems = [...$event];
    console.log($event);
  }

  getData() {
    this.stcoursesService.getStudentsByStaffId(this.teacherId).subscribe((data: Post[]) => {
      console.log(data);
      this.students = data;
      console.log(this.students)
      this.students = this.students.filter((student, index, self) =>
      index === self.findIndex((s) => s.studentId === student.studentId)
  );
      this.dropdownList = this.students;
      console.log(this.posts);
      this.isDataAvailable = true;
    });

    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'studentId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }




  filterStudents(val: any) {
    this.selectedBranch = val.target.value;
    console.log(this.selectedBranch);
    console.log(this.students);
    if (this.selectedBranch) {
      this.dropdownList = this.students.filter(
        (student) => student.branch === this.selectedBranch
      );
    }
  }
}
