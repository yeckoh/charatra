import { Component, OnInit, OnDestroy } from '@angular/core';
import * as wsocket from 'socket.io-client';

@Component({
  selector: 'app-secret-socket',
  templateUrl: './secret-socket.component.html',
  styleUrls: ['./secret-socket.component.css']
})
export class SecretSocketComponent implements OnInit, OnDestroy {

  static mysock: any;
  constructor() { }

  static newCharacter(incomingdata) {
    // send an event to the hook, 'newchara'

    // tslint:disable-next-line: prefer-const
    let forwardingdata = {
      userid: JSON.parse(localStorage.getItem('user')).id,
      name: incomingdata.name,
      gender: incomingdata.gender,
      race: incomingdata.race
    };
    this.mysock.emit('makenewchara', forwardingdata);
   // .mysock.emit('testevent', {data_sent_AngularToNode: 'lets goooooo'});
  }

  ngOnDestroy() { // this works for now
    SecretSocketComponent.mysock.disconnect();
    sessionStorage.clear();
  }

  ngOnInit() {
    // if (localStorage.getItem('id_token') == null) {
    //   return;
    // }
    // if (sessionStorage.getItem('active_socket') == null) {
      this.connectToSocket();
    // }

    // define a hook to listen for, called 'testevent'
      SecretSocketComponent.mysock.on('madenewchara', (data) => console.log(data));
  }










  connectToSocket() {
    SecretSocketComponent.mysock = wsocket('http://localhost:3000');
    const keypair = {is_active: true};
    sessionStorage.setItem('active_socket', JSON.stringify(keypair)); // dont need this already
  }














}
