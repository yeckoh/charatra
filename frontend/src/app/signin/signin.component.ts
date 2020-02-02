import { Component, OnInit, createPlatformFactory } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  onSigninSubmit() {
    // do something
  }


}
