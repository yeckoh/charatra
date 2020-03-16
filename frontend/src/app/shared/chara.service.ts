import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as wsocket from 'socket.io-client';
import evaluate, { registerFunction } from 'ts-expression-evaluator';


// chara service is responsible for:
// holding all character_ids (revisit storing in localstorage)
// calling socket hooks to push updated information to the back
// giving all components access to character information (solves data sharing between components)

// singleton service which holds user and character data
@Injectable({providedIn: 'root' })
export class CharaService {
  // tslint:disable: member-ordering
  private sock: any;
  UserRoom: string;
  CharaId: string;
  // CharaSelected: Chara;
  // CharaAll: any;


  constructor() {
    // if user is logged in already and just loaded the page
    if (localStorage.getItem('user') != null) { // populates sidebar
      this.UserRoom = JSON.parse(localStorage.getItem('user')).id;
    }
    this.connectToSocket();
}


BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

// tslint:disable: one-line
// tslint:disable: no-conditional-assignment
regularFormula(input) {
  let mutableInput = input;
  this.BRACKET_EXPRESSION.lastIndex = 0;
  try {
    if (this.BRACKET_EXPRESSION.test(input)) {
        let result;
        this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by test, now {0} is what was {1}
        while (result = this.BRACKET_EXPRESSION.exec(mutableInput)) {
          mutableInput = mutableInput.replace(result[0], evaluate(result[1], this));
          this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by replace, now {0} is what was {1}
      }} else {
        if (mutableInput = evaluate(input, this)) { } // simple formula; {} is implied
        else {mutableInput = input; } // evaluation failed but didnt throw an error
      }
    return mutableInput;
  } catch (error) {
    return 'NaN';
  }
}






  // individual components listenfor whatever hooks they specify by calling this
  listenfor(eventName: string) {
    return new Observable((subscriber) => {
      this.sock.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  // individual components sendback whatever emitters they specify by calling this
  sendback(eventName: string, data: any) {
    this.sock.emit(eventName, data);
  }







/// ============================================================================================
// ROOM EMITTERS ===============================================================================
// we can just call direct emits in the service as a special case since they have direct access to sock
/// ============================================================================================
  // filter hook events by user
  joinUserRoom() {
    // call this when signing in
    // this is only for updating the character list in localstorage and the sidebar
    this.sock.emit('Join_user_room', this.UserRoom);
    console.log('joined user room in charaservice');
  }

  // filter hook events by character
  joinCharacterRoom(characterid) {
    // call this when clicking on a specific character
    // this is for ignoring updates of all other characters not currently being viewed
    this.sock.emit('Join_character_room', characterid);
  }

  leaveCharacterRoom(characterid) {
    this.sock.emit('Leave_character_room', characterid);
  }

/// ============================================================================================
// SOCKET STUFF ===============================================================================
/// ============================================================================================

  connectToSocket() {
    this.sock = wsocket('http://localhost:3000');
    if (localStorage.getItem('user') != null) {
      this.joinUserRoom();
      this.getUserCharacters();
    }
  }

  disconnect() {
    this.sock.disconnect();
    sessionStorage.clear();
  }

  getUserCharacters() {
    const userAndCharacter_ids = {
      userid: this.UserRoom, // needed for user room. purpose: update sidebar
      characterids: JSON.parse(localStorage.getItem('user')).charas
    };
    this.sock.emit('Get_all_user_charas', userAndCharacter_ids);
  }

}
