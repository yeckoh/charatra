import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../shared/validate.service';
import { AuthService } from '../shared/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import {Router} from '@angular/router';

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
              private flashMessage: FlashMessagesService,
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
      // tell them to fill in everything
      console.log('some fields are blank');
      this.flashMessage.show('All fields must be filled in', {timeout: 3500});
      return false;
    }

    // valid email
    if (!this.validateService.validateEmail(user.email)) {
      // tell them to use a valid email
      console.log('email failed regex');
      this.flashMessage.show('Use a valid email', {timeout: 3000});
      return false;
    }

  // register user
    this.authService.signupUser(user).subscribe(data => {
      if (data) {
        this.flashMessage.show('Sign up successful', {timeout: 3000});
        // you re now registered and can login
        this.router.navigate(['/signin']);
      }
      else {
        this.flashMessage.show('Sign up was unsuccessful', {timeout: 4000});
        this.router.navigate(['/signup']);
        // u arent registered
      }
    });

  }

}
