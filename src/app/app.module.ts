import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginComponent } from './components/forms/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SindexComponent } from './components/layout/sindex/sindex.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { aboutComponent } from './components/pages/about/about.component';
import { ContactUsComponent } from './components/pages/contactus/ContactUs.component';
import { CustomerDashboardComponent } from './components/dashboard/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { codeComponent } from './components/pages/code/code.component';
import { AttendenceComponent } from './components/staffs/attendence/attendence.component';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { CalendarViewComponent } from './components/calendar/calendar-view/calendar-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentRegComponent } from './components/students/student-reg/student-reg.component';
import { StaffRegComponent } from './components/staffs/staff-reg/staff-reg.component';
import { StaffManageComponent } from './components/staffs/staff-manage/staff-manage.component';
import { StudentDashboardComponent } from './components/dashboard/student-dashboard/student-dashboard.component';
import { StudentAllComponent } from './components/students/student-all/student-all.component';
import { AddcourseComponent } from './components/course/addcourse/addcourse.component';
import { TeachercourseComponent } from './components/course/teachercourse/teachercourse.component';
import { CoursemanageComponent } from './components/course/coursemanage/coursemanage.component';
import { TcviewComponent } from './components/course/tcview/tcview.component';
import { EditeachercourseComponent } from './components/course/editeachercourse/editeachercourse.component';
import { StudentcourseComponent } from './components/course/studentcourse/studentcourse.component';
import { EditcourseComponent } from './components/course/editcourse/editcourse.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';
import { MenuStaffComponent } from './components/menu/menu-staff/menu-staff.component';
import { MenuStudentComponent } from './components/menu/menu-student/menu-student.component';
import { LeaveComponent } from './components/leave/leave.component';
import { StudentleaveComponent } from './components/leave/studentleave/studentleave.component';
import { ViewComponent } from './post/view/view.component';

import { EditComponent } from './post/edit/edit.component';
import { CreateComponent } from './post/create/create.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { LeaveSubmissionsComponent } from './components/staffs/leave-submissions/leave-submissions.component';
import { IndexComponent } from './post/index/index.component';
import { StudentLayoutComponent } from './components/layout/student-layout/student-layout.component';
import { StaffLayoutComponent } from './components/layout/staff-layout/staff-layout.component';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    EditComponent,
    AppComponent,
    IndexComponent,
    CreateComponent,
    LoginComponent,
    SindexComponent,
    NavbarComponent,
    codeComponent,
    ContactUsComponent,
    AdminDashboardComponent,
    aboutComponent,
    ViewComponent,
    ProfileComponent,
    CustomerDashboardComponent,
    SignupComponent,

    AttendenceComponent,
     CalendarViewComponent,
     StudentRegComponent,
     StaffRegComponent,
     StaffManageComponent,
     StudentDashboardComponent,
     StudentAllComponent,
     AddcourseComponent,
     TeachercourseComponent,
     CoursemanageComponent,
     TcviewComponent,
     EditeachercourseComponent,
     StudentcourseComponent,
     EditcourseComponent,
     MenuComponent,
     MenuAdminComponent,
     MenuStaffComponent,
     MenuStudentComponent,
     LeaveComponent,
     StudentleaveComponent,
     ToastComponent,
     LeaveSubmissionsComponent,
     SindexComponent,
     StudentLayoutComponent,
     StaffLayoutComponent,
     AdminLayoutComponent,

  ],
  imports: [

    BrowserModule,
    FormsModule,
    NgbToastModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
