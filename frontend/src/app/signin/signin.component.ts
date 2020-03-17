import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router'; // router to redirect
import { MatSnackBar } from '@angular/material';
import { CharaService } from '../shared/chara.service';

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
              private alohaSnackBar: MatSnackBar,
              private charaservice: CharaService) { }

  ngOnInit() {
  }

  onSigninSubmit() {
    const user = { // make a new object
      username: this.username,
      password: this.password
    };


    if (user.password == null || user.password === '') {
      // this.flashMsg.show('Invalid login credentials', { timeout: 2000});
      this.alohaSnackBar.open('Invalid login credentials', 'okay',
        {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});
      // this.router.navigate(['signin']);
      return;
    }
    // take object and submit it through auth service to the backend authenticate router
    // uses authService
    this.authServ.authenticateUser(user).subscribe(data => {
      const returndata = JSON.parse(data);
      if (returndata.success) {
        this.authServ.storeUserData(returndata.token, returndata.user);
        this.charaservice.joinUserRoom();
        this.charaservice.getUserCharacters();

        this.alohaSnackBar.open('You are now logged in', 'okay',
          {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});

        this.router.navigate(['/home']);
      } else {
        this.alohaSnackBar.open('Invalid login credentials', 'okay',
          {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});

        // this.router.navigate(['signin']);
      }
    });
  }


}
