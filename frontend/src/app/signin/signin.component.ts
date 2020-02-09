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


    if (user.password == null || user.password === '') {
      this.flashMsg.show('Invalid login credentials', { timeout: 2000});
      this.router.navigate(['signin']);
      return;
    }
    // take object and submit it through auth service to the backend authenticate router
    // uses authService
    this.authServ.authenticateUser(user).subscribe(data => {
      const returndata = JSON.parse(data);
      if (returndata.success) {
        this.authServ.storeUserData(returndata.token, returndata.user);
        this.flashMsg.show('You are now logged in', {timeout: 2000});
        this.router.navigate(['/']);
      } else {
        this.flashMsg.show('Invalid login credentials', { timeout: 3000});
        this.router.navigate(['signin']);
      }
    });
  }


}
