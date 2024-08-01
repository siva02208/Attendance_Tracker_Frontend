import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';


function onlyDigits(control: AbstractControl): { [key: string]: boolean } | null {
  const valid = /^\d+$/.test(control.value);
  return valid ? null : { 'onlyDigits': true };
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  emailExists = false; // Flag to track if the email already exists
  errorMessage = ''; // Variable to store error message



  constructor(
    public userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      staffname: new FormControl('', [Validators.required]),
      mobilenumber: new FormControl('', [Validators.required, onlyDigits, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      gender: new FormControl('', [Validators.required])
    });
  }


  get f(){
    return this.form.controls;
  }


  submit(){
    console.log(this.form);


    this.userService.create(this.form.value).subscribe((res:any) => {
         console.log('Account signed successfully!');
         this.router.navigateByUrl('login');
    },
    (error) => {
        // Email already exists, set error message
        this.emailExists = true;
        this.errorMessage = 'Email already exists.';
        console.error('Error:', error);

    }
    )
  }
}
