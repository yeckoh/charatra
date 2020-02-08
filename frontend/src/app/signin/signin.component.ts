import { Component, OnInit, createPlatformFactory } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router'; // router to redirect
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username: string;
  password: string;

  // inject authservice as a dependency via constructor
  // router and flashservice too
  constructor(private authServ: AuthService,
              private router: Router,
              private flashMsg: FlashMessagesService) { }

  ngOnInit() {
  }

  onSigninSubmit() {
    const user = { // make a new object
      username: this.username,
      password: this.password
    };

    // take object and submit it through auth service to the backend authenticate router
    // uses authService
    this.authServ.authenticateUser(user).subscribe(data => {
      console.log(data); // should be no user found, wrong password, or token + user:_id
      if (data) { // how do we 'blindly' check for a json object's property? we know success: exists but its just an object here
        console.log('success goes here');
      } else {
        this.flashMsg.show('Invalid login credentials', {timeout: 3500});
        this.router.navigate(['signin']);
      }
    });
  }


}
