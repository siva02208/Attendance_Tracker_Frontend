import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentCourseData, StudentCourseInfo } from '../models/studentcourseinfo';
import { StudentCourseAssignation } from '../models/studentsoursesassignation';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class StucourseService {

  private apiURL = "https://localhost:44306/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }


  getStaffByStudentId(studentId: number): Observable<User[]> {
    const url = `${this.apiURL}/StudentCourses/GetStaffByStudentId/${studentId}`;
    return this.httpClient.get<User[]>(url);
  }

// Function to process the data and create a list of student items
getStudentCourseList(data: any[]): any[] {
  const studentItems: any[] = [];

  for (const entry of data) {
      const existingStudent = studentItems.find(item => item.studentId === entry.studentId);

      if (existingStudent) {
          existingStudent.studentCourses.push(entry.courseName);
      } else {
          const newStudent: any = {
              studentId: entry.studentId,
              studentName: entry.studentName,
              studentCourses: [entry.courseName],
              courseBranch: entry.courseBranch
          };
          studentItems.push(newStudent);
      }
  }

  return studentItems;
}


getStudentsByStaffId(staffId: number): Observable<any[]> {
  const url = `${this.apiURL}/StudentCourses/GetStudentsByStaffId/${staffId}`;
  return this.httpClient.get<any[]>(url);
}


  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/StudentCourses/')

    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteStudentCourses(studentId: number): Observable<any> {
    const url = `${this.apiURL}/DeleteByStudentId/${studentId}`;

    return this.httpClient.delete(url);
  }

  addStudentCoursesByStaff(input: StudentCourseAssignation): Observable<any> {
    const url = `${this.apiURL}/StudentCourses/AddStudentCoursesByStaff`;

    return this.httpClient
      .post(url, input, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }


  getStudentAndCourseData(staffId: number): Observable<any[]> {
    const url = `${this.apiURL}/StudentCourses/GetStudentAndCourseData/${staffId}`;
    return this.httpClient.get<any[]>(url);
  }

  public sendGetRequest(){
    return this.httpClient.get("https://localhost:44306/api/StudentCourses/");
  }

  getStudentWithCourseDetails(studentId: number): Observable<any[]> {
    const url = `${this.apiURL}/StudentCourses/StudentWithCourseDetails/${studentId}`;
    return this.httpClient.get<any[]>(url);
  }

  getAllStudentWithCourseDetails(): Observable<any[]> {
    const url = `${this.apiURL}/StudentCourses/StudentWithCourseDetails`; // Adjust the URL to fetch all students
    return this.httpClient.get<any[]>(url);
  }


  create(post:StudentCourseInfo): Observable<any> {

    return this.httpClient
    .post(this.apiURL + '/StudentCourses/',
     JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }



  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/StudentCourses/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  update(id:number, post:StudentCourseInfo): Observable<any> {

    return this.httpClient.put(this.apiURL + '/StudentCourses/' + id, JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/StudentCourses/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }


}
