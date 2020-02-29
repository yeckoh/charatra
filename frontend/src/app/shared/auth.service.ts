import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';

// import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }


  signupUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // post req to routes/adduser
    return this.http.post('http://localhost:3000/users/register', user, httpOptions).pipe(map(res => JSON.stringify(res)));
    // .pipe(map(res => JSON.stringify(res))); returns a string, which happens to contain the object
    // if we want object properties, use JSON.parse(res) in wherever that called this func
  }

  // auth a user
  authenticateUser(user) {
    // make a post req to authenticate
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // post req to routes/getuserbyusername, comparepassword
    return this.http.post('http://localhost:3000/users/authenticate', user, httpOptions).pipe(map(res => JSON.stringify(res)));
    // its gnona return: [if success] a token for users to store,
    // and the user info, which we're gonna want to store that
  }


  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  signout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
