import { Injectable } from '@angular/core';

// do we need these
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Chara } from './chara.model';
import { MatButtonToggle } from '@angular/material';
import { stringify } from 'querystring';


/// all http. requests are in the routes/




@Injectable()
export class CharaService {

  // selectedChara: Chara;
  // allCharas: Chara[];

  constructor(private http: HttpClient) { }


// make a put req to update
pullPresses(btnobj) {
    const userdata = JSON.parse(localStorage.getItem('user'));

    const IdentifierUrl = 'http://localhost:3000/buttonroute/'.concat(btnobj._id);
    const objToModel = { // this is kinda ugly but btnobj is an Object: object ?
      _id: btnobj._id,
      presses: btnobj.presses,
      other_presses: btnobj.other_presses
    };
    console.log('going to: ' + IdentifierUrl);
    console.log(objToModel);

    return this.http.put(IdentifierUrl, objToModel).pipe(map(res => JSON.stringify(res)));

  } // end.of pullPresses


getCounter() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  const alltestbtns = JSON.parse(localStorage.getItem('user'));
  const buildurl = 'http://localhost:3000/' + 'users/profile/' + alltestbtns.id + '/getbtn';
  const strtobtnid = {
    buttontest_id: alltestbtns.charas[0]
  };
  // console.log(strtobtnid);
  return this.http.post(buildurl, strtobtnid, httpOptions ).pipe(map(res => JSON.stringify(res)));




  // return this.http.get('http://localhost:3000/mybutton').pipe(map(res => JSON.stringify(res)));
      // its gonna return: [if success] the first button object
      // /routes/btn currently uses .findOne
}

postadoc(newobj) { // if a button doesnt exist, make one pls
  console.log(newobj);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  return this.http.post('http://localhost:3000/mybutton', newobj, httpOptions).pipe(map(res => JSON.stringify(res)));

}


}
