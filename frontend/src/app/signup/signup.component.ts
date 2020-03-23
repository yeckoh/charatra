import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../shared/validate.service';
import { AuthService } from '../shared/auth.service';

import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  email: string;
  password: string;



  constructor(private validateService: ValidateService,
              private alohaSnackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }


  /// TODO: username and email force unique, tell them if entries are invalid

  onSignupSubmit() {
    const user = {
    username: this.username,
    email: this.email,
    password: this.password
    };

    // req fields
    if (!this.validateService.validateSignup(user)) {
      this.alohaSnackBar.open('All fields must be filled in', 'okay',
        {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});
      return false;
    }

    // valid email
    if (!this.validateService.validateEmail(user.email)) {
      console.log('email failed regex');
      this.alohaSnackBar.open('Use a valid email', 'okay',
        {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});
      return false;
    }

  // register user
    this.authService.signupUser(user).subscribe(data => {
      if (data) {
        // this.flashMessage.show('Sign up successful', {timeout: 3000});
        this.alohaSnackBar.open('Sign up successful', 'okay',
          {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});
        // you're now registered and can login
        this.router.navigate(['/signin']);
      } else {
        // this.flashMessage.show('Sign up was unsuccessful', {timeout: 4000});
        // u arent registered
      }
    });

  }

}
