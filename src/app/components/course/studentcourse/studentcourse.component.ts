import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { StudentCourseInfo } from '../../../models/studentcourseinfo';
import { StucourseService } from '../../../services/stucourse.service';

import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { TcourseService } from 'src/app/services/tcourse.service';
import { TeacherCourseInfo } from 'src/app/models/teachercourseinfo';
import { StudentCourseAssignation } from 'src/app/models/studentsoursesassignation';

@Component({
  selector: 'app-studentcourse',
  templateUrl: './studentcourse.component.html',
  styleUrls: ['./studentcourse.component.css'],
})
export class StudentcourseComponent implements OnInit {
  students: Post[] = [];
  teacherId: any;

  studentcourses: any;
  teacherCourses!: any[];

  selectedBranch: string = '';

  studentId!: number;
  id!: number;
  form!: FormGroup;
  posts: Post[] = [];
  post!: Post;

  dropdownList!: any;
  dropdownListForCourses!: any;

  selectedItems!: any[];
  selectedCourseItems!: any[];

  dropdownSettings!: any;
  dropdownSettingsForTeacher!: any;

  isDataAvailable: boolean = false;
  isCourseDataAvailable: boolean = false;
    studentwithcourseDetails!: any[] ;
    courseList: any[]= []

  constructor(
    public postService: PostService,
    private service: StucourseService,
    private tcourseService: TcourseService,
    private scourseService: StucourseService
  ) {}

  ngOnInit(): void {

    let storedId: any = localStorage.getItem('id');

    if (storedId !== null) {
      storedId = parseInt(storedId, 10);
      this.teacherId = storedId;
    }


    console.log(this.teacherId);

    this.service.sendGetRequest().subscribe((data: any) => {
      console.log(data);
      this.studentcourses = data;

    });




    this.scourseService.getStudentAndCourseData(this.teacherId).subscribe((data) => {
      this.courseList =this.scourseService.getStudentCourseList(data)
      console.log(this.courseList);

    })

    this.getTeacherCoursesData();

    this.getData();

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

    this.form = new FormGroup({
      temp: new FormControl(),
      studentId: new FormControl('', Validators.required),
      courseId: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.selectedCourseItems);
    console.log(this.selectedItems);

    // Get a list of courseIds from the coursesArray
    const courseIds = this.selectedCourseItems.map((course) => course.courseId);

    // Get a list of studentIds from the studentsArray
    const studentIds = this.selectedItems.map((student) => student.studentId);

    const assignCourse: StudentCourseAssignation = {
      staffId: this.teacherId,
      courseIds: courseIds,
      studentIds: studentIds
    };

    console.log(assignCourse)
    this.scourseService.addStudentCoursesByStaff(assignCourse).subscribe((res) =>{
      console.log("done finally");
    })

    //   console.log(this.form.value);
    //   this.form.value.studentId.map((data:any)=>{
    //     const temp=this.form.value;
    //     temp['studentId'] = data.studentId;
    //     temp['studentName'] = data.name;
    //     console.log(temp);
    //     this.service.create(this.form.value).subscribe((res:any) => {
    //       console.log('Course added to staff successfully!');
    //       this.router.navigateByUrl('StaffsDashboard');
    //  })

    // })
  }

  findStudentsNotEnrolledInCourse(
    students: any[],
    courseRecords: any[],
    courseIdToCheck: number
  ): any[] {
    // Get an array of studentIds who are enrolled in the specific courseId
    const enrolledStudentIds = courseRecords
      .filter(record => record.courseId === courseIdToCheck)
      .map(record => record.studentId);

    // Filter students who are not enrolled in the specific courseId
    const studentsNotEnrolled = students.filter(student => !enrolledStudentIds.includes(student.studentId));

    return studentsNotEnrolled;
  }



  handleButtonClick() {
    console.log('reactive form value ', this.form.value);
  }

  onItemSelect($event: any) {
    this.selectedCourseItems.push($event);
    this.dropdownList = this.findStudentsNotEnrolledInCourse(this.dropdownList, this.studentcourses,$event.courseId)

    console.log($event);
    console.log(this.selectedCourseItems);
  }

  OnItemDeSelect($event: any) {
    this.dropdownList = this.students;
    this.selectedCourseItems = this.selectedCourseItems.filter((item) => {
      return item.courseId !== $event.courseId;
    });
  }

  deleteStudentCourses(course: any){
    this.scourseService.deleteStudentCourses(course.studentId).subscribe(() =>{
      this.courseList = this.courseList.filter((data) => data.studentId != course.studentId)
    });

  }
  OnAllItemsSelected($event: any) {
    this.OnAllItemsDeSelected();
    $event.forEach((item: any) => {
      this.selectedCourseItems.push(item);
      this.dropdownList = this.findStudentsNotEnrolledInCourse(this.dropdownList, this.studentcourses,item.courseId)
    });
    console.log($event);
    console.log(this.selectedCourseItems);
  }

  checkIfCourseIsAdded(courseIdToCheck: number): boolean {
    this.dropdownList = this.studentcourses;
    const courseExists = this.selectedCourseItems.find(
      (course) => course.courseId === courseIdToCheck
    );
    return courseExists !== undefined;
  }

  OnAllItemsDeSelected() {
    this.selectedCourseItems = [];
  }

  getData() {
    this.postService.getAll().subscribe((data: Post[]) => {
      console.log(data);
      this.students = data;
      this.dropdownList = this.students;
      this.isDataAvailable = true;
    });
  }

  getTeacherCoursesData() {


    this.tcourseService.getTeacherAssignedCourses(this.teacherId).subscribe((res) => {
      this.teacherCourses = res;
      console.log(res);
      this.dropdownListForCourses = this.teacherCourses;
      this.isCourseDataAvailable = true;
    });

    this.selectedCourseItems = [];
    this.dropdownSettingsForTeacher = {
      singleSelection: false,
      idField: 'courseId',
      textField: 'courseName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  filterStudents(val: any) {
    this.selectedBranch = val.target.value;
    console.log(this.selectedBranch);
    if (this.selectedBranch == '') {
      this.dropdownList = this.students;
      this.dropdownListForCourses = this.teacherCourses;
    }

    if (this.selectedBranch) {
      this.dropdownList = this.students.filter(
        (student) => student.branch === this.selectedBranch
      );
    }

    if (this.selectedBranch) {
      this.dropdownListForCourses = this.teacherCourses.filter(
        (teacher) => teacher.courseBranch === this.selectedBranch
      );
    }
  }
}
