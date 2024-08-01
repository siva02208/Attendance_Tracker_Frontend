import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Usertype = '';
  onSelected(value: string): void {
    this.Usertype = value;
  }

  loginForm!: FormGroup;
  user: any;
  pass: any;
  Email: string = 'Email';
  Password: string = 'pwd';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      useremail: ['', [Validators.required,Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  Login(Usertype: string, Email: string, PWD: string): any {
    var param = { Usertype: Usertype, email: Email, pwd: PWD };
    //console.log(param);
    if (this.loginForm.valid) {
      if (Usertype != 'Admin') {
        this.http
          .get<any>(
            'https://localhost:44306/api/' + Usertype + '/' + Email + '/' + PWD
          )
          .subscribe((data) => {
            console.log('Staff Details:', JSON.stringify(data));
            if (data == null) {
              //alert("Invalid Credentials");
            } else if (data.Status == 'Error') {
              alert(data.Message);
            } else {
              localStorage.setItem(
                'id',
                JSON.stringify(data.staffId ? data.staffId : data.studentId)
              );

              localStorage.setItem(
                'User',
                JSON.stringify(data.staffname ? data.staffname : data.name)
              );

              localStorage.setItem('role', JSON.stringify(Usertype));

              //console.log(data.userName=='Admin');return;

              this.router.navigateByUrl(Usertype + 'Dashboard');
            }
          });
        return false;
      } else {
        if (Email === 'admin@gmail.com' && PWD === 'password') {
          // Successful login
          //alert('Successful login!');
          // Redirect to admin page
          window.location.href = '/adminDashboard';
          // ...
        } else {
          // Invalid login
          //alert('Invalid login!');
        }
      }
    } else {
      console.log('invalid');
    }
  }
}

function go(arg0: string) {
  throw new Error('Function not implemented.');
}
