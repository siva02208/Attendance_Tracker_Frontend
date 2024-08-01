import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LeaveInfo } from '../models/leave';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private apiURL = 'https://localhost:44306/api';
  private teachersSubject = new BehaviorSubject<User[]>([]);
  teachers$ = this.teachersSubject.asObservable();


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}



  setTeachers(teachers: User[]) {
    this.teachersSubject.next(teachers);
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/Leave/')

      .pipe(catchError(this.errorHandler));
  }

  create(post: LeaveInfo): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/Leave/', JSON.stringify(post), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/Leave/' + id)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: LeaveInfo): Observable<any> {
    return this.httpClient
      .put(this.apiURL + '/Leave/' + id, JSON.stringify(post), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/Leave/' + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

   // Get leaves by student and teacher IDs
   getLeavesByStudentAndTeacher(studentId: number, teacherId: number): Observable<LeaveInfo[]> {
    return this.httpClient
      .get<LeaveInfo[]>(`${this.apiURL}/Leave/bystudentandteacher/${studentId}/${teacherId}`)
      .pipe(catchError(this.errorHandler));
  }

  // Get leaves by student ID
  getLeavesByStudent(studentId: number): Observable<LeaveInfo[]> {
    return this.httpClient
      .get<LeaveInfo[]>(`${this.apiURL}/Leave/bystudent/${studentId}`)
      .pipe(catchError(this.errorHandler));
  }

  // Get leaves by teacher ID
  getLeavesByTeacher(teacherId: number): Observable<LeaveInfo[]> {
    return this.httpClient
      .get<LeaveInfo[]>(`${this.apiURL}/Leave/byteacher/${teacherId}`)
      .pipe(catchError(this.errorHandler));
  }



  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.statusText || 'Unknown Error'}`;
    }
    return throwError(errorMessage);
  }
}
