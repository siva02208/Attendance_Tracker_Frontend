import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<string>('');

  constructor() {}

  getToastMessage() {
    return this.toastSubject.asObservable();
  }

  showToast(message: string) {
    this.toastSubject.next(message);
  }

  hideToast() {
    this.toastSubject.next('');
  }}
