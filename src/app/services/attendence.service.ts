import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Attendence } from './attendence';
@Injectable({
  providedIn: 'root'
})
export class AttendenceService {


  private apiURL = "https://localhost:44306/api";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/Attendences')

    .pipe(
      catchError(this.errorHandler)
    )
  }





  create(attendanceData: any): Observable<any> {
    const url = `${this.apiURL}/Attendences`;
    return this.httpClient.post<any>(url, attendanceData).pipe(
      catchError(this.errorHandler)
    );
  }

  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/Attendences/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, attendence:Attendence): Observable<any> {

    return this.httpClient.put(this.apiURL + '/Attendences/' + id, JSON.stringify(attendence), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/Attendences/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    console.log(error)
    console.log("error")

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }



 getStatusCounts(studentId: number): Observable<any> {
  const url = `${this.apiURL}/Attendences/count/${studentId}`;
  return this.httpClient.get<any>(url);
}

 sendEmail(attendenceData: any): Observable<any> {

  return this.httpClient.post(this.apiURL + '/Customer/SendMail',attendenceData ).pipe(
    catchError((error) => {
      console.error('Error sending email:', error);
      return throwError('Failed to send email notification');
    })
  );
}
}
