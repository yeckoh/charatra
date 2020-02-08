import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }


  validateSignup(user) {
    console.log(user);
    if (user.username == null || user.email == null || user.password == null) { // they never entered anything in
      console.log('something was undefined');
      return false;
    }
    if (user.username === '' || user.email === '' || user.password === '') { // something was put in and then made blank
      console.log('something was blank');
      return false;
    }
    return true;
  }

  validateEmail(email) {
    // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

//  uniqueSignup(user) {} if we have nothing else to do, do this



}
