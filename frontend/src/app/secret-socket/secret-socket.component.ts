import { Component, OnInit, OnDestroy } from '@angular/core';
import * as wsocket from 'socket.io-client';
import { CharaService } from '../shared/chara.service';

@Component({
  selector: 'app-secret-socket',
  templateUrl: './secret-socket.component.html',
  styleUrls: ['./secret-socket.component.css']
})
export class SecretSocketComponent implements OnInit, OnDestroy {
    // tslint:disable: variable-name
  static mysock: any;
  constructor( private charaservice: CharaService) { }

  // send an event to the hook, 'Make_new_chara'
  static newCharacter(incomingdata) {
    const forwardingdata = {
      userid: JSON.parse(localStorage.getItem('user')).id,
      name: incomingdata.name,
      gender: incomingdata.gender,
      race: incomingdata.race
    };
    this.mysock.emit('Make_new_chara', forwardingdata);
  }

  // send an event to the hook, 'Get_all_user_charas'
  static getUserCharacters() {
    const userAndCharacter_ids = {
      userid: JSON.parse(localStorage.getItem('user')).id,
      characterids: JSON.parse(localStorage.getItem('user')).charas
    };
    this.mysock.emit('Get_all_user_charas', userAndCharacter_ids);
  }

  // name implies getUserCharacters was already called
  static getSelectedCharacter() {
    const userAndCharacter_ids = {
      userid: JSON.parse(localStorage.getItem('user')).id,
      characterid: this.get,
    };
  }

  // filter hook events by user
  static joinUserRoom() {
    // call this when signing in
    // this is only for updating the character list in localstorage and the sidebar
    const room_identifier = JSON.parse(localStorage.getItem('user')).id;
    this.mysock.emit('Join_user_room', room_identifier);
  }

  // filter hook events by character
  static joinCharacterRoom() {
    // call this when clicking on a specific character
    // this is for ignoring updates of all other characters not currently being viewed
    // emit('Join_character_room',
  }


  ngOnDestroy() { // this works for now
    SecretSocketComponent.mysock.disconnect();
    sessionStorage.clear();
  }

  ngOnInit() {
      this.connectToSocket();

    // define a hook to listen for, called 'Made_new_chara'
      SecretSocketComponent.mysock.on('Made_new_chara', (data) => {
        console.log(data);
        // get all characterids in user localstorage obj
        // append this new chara id
        // set localstorage new characterlist
        const userinfo = JSON.parse(localStorage.getItem('user'));
        userinfo.charas.push(data._id);
        localStorage.setItem('user', JSON.stringify(userinfo));
        // probably update the sidebar list here too
      });

      // define hook to listen for, called 'Receive_all_user_charas'
      SecretSocketComponent.mysock.on('Receive_all_user_charas', (data) => {
        // pull all characters belonging to the logged-in user only
        this.charaservice.allCharas = data;
      });

      if (localStorage.getItem('user') != null) {
        SecretSocketComponent.getUserCharacters();
      }
  }




  get getDesiredCharacterId() {
    return this.charaservice.desiredId;
  }





  connectToSocket() {
    SecretSocketComponent.mysock = wsocket('http://localhost:3000');
    if (localStorage.getItem('user') != null) {
      SecretSocketComponent.joinUserRoom();
    }
  }














}
