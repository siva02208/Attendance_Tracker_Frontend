import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SindexComponent } from './components/layout/sindex/sindex.component';
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { aboutComponent } from './components/pages/about/about.component';
import { CustomerDashboardComponent } from './components/dashboard/customer-dashboard/customer-dashboard.component';
import { StudentDashboardComponent } from './components/dashboard/student-dashboard/student-dashboard.component';
import { StudentRegComponent } from './components/students/student-reg/student-reg.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { codeComponent } from './components/pages/code/code.component';
import { ContactUsComponent } from './components/pages/contactus/ContactUs.component';
import { AttendenceComponent } from './components/staffs/attendence/attendence.component';
import { CalendarViewComponent } from './components/calendar/calendar-view/calendar-view.component';
import { StaffRegComponent } from './components/staffs/staff-reg/staff-reg.component';
import { StaffManageComponent } from './components/staffs/staff-manage/staff-manage.component';
import { StudentAllComponent } from './components/students/student-all/student-all.component';
import { AddcourseComponent } from './components/course/addcourse/addcourse.component';
import { TeachercourseComponent } from './components/course/teachercourse/teachercourse.component';
import { CoursemanageComponent } from './components/course/coursemanage/coursemanage.component';
import { TcviewComponent } from './components/course/tcview/tcview.component';
import { StudentcourseComponent } from './components/course/studentcourse/studentcourse.component';
import { EditcourseComponent } from './components/course/editcourse/editcourse.component';
import { EditeachercourseComponent } from './components/course/editeachercourse/editeachercourse.component';
import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';
import { LeaveComponent } from './components/leave/leave.component';
import { StudentleaveComponent } from './components/leave/studentleave/studentleave.component';
import { LeaveSubmissionsComponent } from './components/staffs/leave-submissions/leave-submissions.component';
import { ViewComponent } from './post/view/view.component';
import { EditComponent } from './post/edit/edit.component';
import { CreateComponent } from './post/create/create.component';
import { IndexComponent } from './post/index/index.component';
import { StudentLayoutComponent } from './components/layout/student-layout/student-layout.component';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import { StaffLayoutComponent } from './components/layout/staff-layout/staff-layout.component';

const routes: Routes = [
  { path: '', component: SindexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'regstaff', component: StaffRegComponent },
  { path: 'studentall', component: StudentAllComponent },

  { path: 'addcourse', component: AddcourseComponent },

  { path: 'teachercourse', component: TeachercourseComponent },

  { path: 'editcourse', component: EditcourseComponent },
  { path: 'editeachercourse', component: EditeachercourseComponent },
  { path: 'menuadmin', component: MenuAdminComponent },
  { path: 'leave', component: LeaveComponent },


  { path: 'post/index', component: IndexComponent },
  { path: 'post/create', component: CreateComponent },


  { path: 'profile', component: ProfileComponent },

  {
    path: 'StudentsDashboard',
    component: StudentLayoutComponent,
    children: [
      { path: '', component: StudentDashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'studentleave', component: StudentleaveComponent },
      { path: 'post/:postId/edit', component: EditComponent },
      { path: 'post/:postId/view', component: ViewComponent },

  ],
  },


  {
    path: 'StaffsDashboard',
    component: StaffLayoutComponent,
    children: [
      { path: '', component: CustomerDashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'tcview', component: TcviewComponent },
      { path: 'regstudent', component: StudentRegComponent },
      { path: 'studentcourse', component: StudentcourseComponent },
      { path: 'attendence', component: AttendenceComponent },
      { path: 'leave-submission', component: LeaveSubmissionsComponent },

      ],
  },


  {
    path: 'adminDashboard',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'code', component: codeComponent },
      { path: 'post' ,component: IndexComponent  },
      { path: 'staffmanage', component: StaffManageComponent },
      { path: 'coursemanage', component: CoursemanageComponent },
      { path: 'regstudent', component: StudentRegComponent },
      { path: 'post/:postId/edit', component: EditComponent },
      { path: 'post/:postId/view', component: ViewComponent },

        ],
  },


  { path: 'about', component: aboutComponent },

  { path: 'calendar/:studentId/view', component: CalendarViewComponent },

  { path: 'ContactUs', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
