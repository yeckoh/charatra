import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';


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

  }


}
