import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  IsLoggedIn: boolean = false;
  IsAdmin: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log("here");
    const user = localStorage.getItem('User');
    if (user) {
      this.IsLoggedIn = true;
      this.IsAdmin = user === 'admin@gmail.com';
    }
  }

  Logout() {
    // Clear user data from localStorage and redirect to the login page
    localStorage.removeItem('User');
    localStorage.removeItem('id');
    location.href = '/login';
  }

  goBack(){
    window.history.back();
  }
}
