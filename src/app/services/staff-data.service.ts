import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffDataService {

  constructor() { }

  private staffId: number | undefined;

  setStaffId(staffId: number) {
    this.staffId = staffId;
  }

  getStaffId(): number | undefined {
    return this.staffId;
  }
}
