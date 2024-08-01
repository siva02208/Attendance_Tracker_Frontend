import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { LeaveInfo } from 'src/app/models/leave';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { LeaveService } from 'src/app/services/leave.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  template: `
    <form (ngSubmit)="onSubmit(leaveData)">
      <!-- Your form fields here -->
      <button type="submit">Submit Leave Request</button>
    </form>
    <div *ngIf="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  `,
})
export class LeaveComponent implements OnInit {

  form!: FormGroup;
  errorMessage!: string;

  teachers: User[] = [];


  leaveData: any[] = []


  constructor(
    private router: Router,
    private data: DataService,
    private staffService: UserService,
    private leaveService: LeaveService,
    private toastService: ToastService,
    private fb: FormBuilder // Inject the FormBuilder

  ) { }

  ngOnInit() {
    this.toastService.showToast('Leave request submitted successfully:');


    this.leaveService.teachers$.subscribe((teachers) => {
      this.teachers = teachers;

      });

    console.log(localStorage.getItem('id'))


    this.form = this.fb.group({
      TeacherName: ['', Validators.required],
      FromDate: [new Date(), [Validators.required, this.minDateValidator()]],
      ToDate: ['', [Validators.required]],
      LeaveDescription: ['', Validators.required],
    });

    // Add the toDateValidator dynamically after form creation
    this.form.get('ToDate')?.setValidators([Validators.required, this.toDateValidator()]);
  }

  toDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fromDateValue = this.form.get('FromDate')?.value;
      const toDateValue = control.value;

      if (fromDateValue && toDateValue && new Date(fromDateValue) >= new Date(toDateValue)) {
        return { toDateInvalid: true }; // Return a validation error if "to" date is the same as or earlier than "from" date
      }

      return null; // No validation error
    };
  }



  minDateValidator() {
    return (control: FormControl) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        return { minDate: true }; // Return a validation error if the date is earlier than the current date
      }

      return null; // No validation error
    };
  }


  get f(){
    return this.form.controls;
  }


  submit() {

    console.log("here")

      const leaveData: LeaveInfo = {
        studentId: localStorage.getItem('id') || '',
        fromDate: this.form.value.FromDate,
        toDate: this.form.value.ToDate,
        teacherId: this.form.value.TeacherName,
        leaveDescription: this.form.value.LeaveDescription,
        leaveStatus: 'pending'
      };
      console.log("leaveData")
      // [routerLink]="'/StudentsDashboard/studentleave'"
        this.leaveService.create(leaveData)
        .subscribe(
          (response) => {
            if (response && response.error) {
              this.errorMessage = response.error; // Set the error message from the response
            } else {
              // Success callback - Leave request submitted successfully
              this.errorMessage = ''; // Clear the error message
              this.toastService.showToast('Leave request submitted successfully:');
              console.log(response);
            }
          },
          (error) => {
            this.errorMessage = 'Same leave to the same teacher with same dates is not allowed'; // Set a default error message

            console.error('Error:', error);
          }
        );
        this.return();
      }


      return(){
        console.log(this.errorMessage)
        if(this.errorMessage == undefined){
          this.router.navigate(['/StudentsDashboard/studentleave']);
        }
      }



}



