import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: String;
  email: String;
  password: String;



  constructor() { }

  ngOnInit() {
  }


  onSignupSubmit() {
    const user = {
    username: this.username,
    email: this.email,
    password: this.password
    };

  }


}
