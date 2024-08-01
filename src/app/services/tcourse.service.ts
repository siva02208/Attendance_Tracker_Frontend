import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TeacherCourseInfo } from '../models/teachercourseinfo';
import { CourseInfo } from '../models/courseinfo';

@Injectable({
  providedIn: 'root',
})
export class TcourseService {
  private apiURL = 'https://localhost:44306/api';

  private REST_API_SERVER = 'https://localhost:44306/api/teachercourses';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/TeacherCourses/')

      .pipe(catchError(this.errorHandler));
  }

  create(post: TeacherCourseInfo): Observable<any> {
    return this.httpClient
      .post(
        this.apiURL + '/TeacherCourses/',
        JSON.stringify(post),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  getTeacherAssignedCourses(staffId: number): Observable<CourseInfo[]> {
    const url = `${this.apiURL}/TeacherCourses/GetTeacherAssignedCourses/${staffId}`;
    return this.httpClient.get<CourseInfo[]>(url).pipe(catchError(this.errorHandler));
  }

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/TeacherCourses/' + id)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: TeacherCourseInfo): Observable<any> {
    return this.httpClient
      .put(
        this.apiURL + '/TeacherCourses/' + id,
        JSON.stringify(post),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/TeacherCourses/' + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  deleteByStaffId(staffId: number): Observable<any> {
    return this.httpClient
      .delete(
        this.apiURL + '/TeacherCourses/StaffId/' + staffId,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  deleteByStaffIdAndCourseId(
    staffId: number,
    courseId: number
  ): Observable<any> {
    return this.httpClient
      .delete(
        this.apiURL + `/TeacherCourses/StaffIdCourseId/${staffId}/${courseId}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
}
