import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TcourseService } from 'src/app/services/tcourse.service';
import { TeacherCourseInfo } from '../../../models/teachercourseinfo';

import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CourseInfo } from 'src/app/models/courseinfo';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.css'],
})
export class StaffManageComponent implements OnInit {
  Staff: any;
  flag: boolean = true;
  posts: TeacherCourseInfo[] = [];

  courseData: CourseInfo[] = [];
  dropdownList!: any;
  selectedItems!: any[];
  dropdownSettings!: any;
  isDataAvailable: boolean = false;

  staffForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private courseService: CourseService,
    private tcourseservice: TcourseService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getCourseData().then(() => {
      this.getTeacherCourse().then(() => {
        this.setIntialData();
      });
    });

    this.dataService.sendGetRequest().subscribe((data: any) => {
      this.Staff = data;
    });

    this.staffForm = new FormGroup({
      courseId: new FormControl(''),
    });
  }

  async setIntialData() {
    console.log(this.posts);
    console.log(this.courseData);

    this.selectedItems = this.courseData.filter((itemA) => {
      return this.posts.some((itemB) => itemA.courseId === itemB.courseId);
    });
  }

  async getTeacherCourse() {
    this.posts = await this.tcourseservice.getAll().toPromise();
    console.log(this.posts);
  }

  async getCourseData() {
    this.courseData = await this.courseService.getAll().toPromise();
    this.dropdownList = this.courseData;
    this.isDataAvailable = true;
    console.log(this.courseData);

    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'courseId',
      textField: 'courseName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  deleteStaff(id: number) {
    this.dataService.deleteRequest(id).subscribe((res) => {
      this.Staff = this.Staff.filter((item: any) => item.staffId !== id);
      console.log('User deleted successfully!');
    });
  }

  async deleteStaffCourse(teachercourse: User) {
    this.tcourseservice
      .deleteByStaffId(teachercourse.staffId)
      .subscribe((_res) => {
        console.log('data empty');
      });
  }

  addStaffCourse($event:any, teachercourse: User){
    console.log($event)
    console.log(teachercourse)
    const assignCourse = {
      courseId: $event.courseId,
      staffId: teachercourse.staffId,
    };

    this.tcourseservice.create(assignCourse).subscribe((res) => {
      console.log('courses assigned');
    });
  }

  deleteCourseFromTeacher($event:any, teachercourse: User){
    this.tcourseservice
      .deleteByStaffIdAndCourseId(teachercourse.staffId, $event.courseId)
      .subscribe((_res) => {
        console.log('data empty');
      });
  }


  assignCoursestoTeachers($event:any[], teachercourse: User) {
    console.log($event)
    $event.forEach((course) => {
      const assignCourse = {
        courseId: course.courseId,
        staffId: teachercourse.staffId,
      };

      this.tcourseservice.create(assignCourse).subscribe((res) => {
        console.log('courses assigned ');
      });

    });

    this.posts = this.selectedItems;
  }

  shouldDisableButton() {
    if (this.posts.length == 0) {
      this.flag = false;
    }else{
      const courseIdsFromA = this.selectedItems.map((item) => item.courseId);
      const courseIdsFromB = this.posts.map((item) => item.courseId);

      console.log(courseIdsFromA);
      console.log(courseIdsFromB);

      this.flag = this.arraysAreEqual(courseIdsFromA, courseIdsFromB);
    }

  }

  isStaffInPosts(staffId: number): boolean {
    return this.posts.some((post) => post.staffId === staffId);
  }

  arraysAreEqual<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }
}
