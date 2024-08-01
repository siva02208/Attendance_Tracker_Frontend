import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';

import { CourseInfo } from '../../../models/courseinfo';

@Component({
  selector: 'app-coursemanage',
  templateUrl: './coursemanage.component.html',
  styleUrls: ['./coursemanage.component.css'],
})
export class CoursemanageComponent implements OnInit {
  posts: CourseInfo[] = [];

  isStaffAssigned: boolean = false; // Property to control button state

  constructor(public postService: CourseService, public router: Router) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.postService.getAll().subscribe((data: CourseInfo[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  // checkIfStaffAssigned(staffId: number): boolean {
  //   const isAssigned = this.posts.some((post) => post.StaffId === staffId);
  //   return isAssigned;
  // }

  deletePost(course: any) {
    this.postService.delete(course.courseId).subscribe((res) => {
      this.posts = this.posts.filter(
        (item) => item.courseId !== course.courseId
      );
      console.log('Course deleted successfully!');
    });
  }

  editcourse(course: any) {
    this.router.navigate(['/editcourse'], {
      queryParams: { id: course.courseId },
    });
  }
}
