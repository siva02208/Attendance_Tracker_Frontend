import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  
  ngOnInit(): void {
  }

  showToast = false;
  toastMessage = '';

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.hideToast();
    }, 5000); // Close the toast after 5 seconds (adjust as needed)
  }

  hideToast() {
    this.showToast = false;
    this.toastMessage = '';
  }

}
