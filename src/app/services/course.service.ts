import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CourseInfo } from '../models/courseinfo';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiURL = "https://localhost:44306/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

 
  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/Courses/')

    .pipe(
      catchError(this.errorHandler)
    )
  }


  create(post:CourseInfo): Observable<any> {

    return this.httpClient.post(this.apiURL + '/Courses/', JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/Courses/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  update(id:number, post:CourseInfo): Observable<any> {

    return this.httpClient.put(this.apiURL + '/Courses/' + id, JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/Courses/' + id, this.httpOptions)

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
