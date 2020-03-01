/// defines the forms and stuff for chara
import { Component, OnInit, OnDestroy} from '@angular/core';

import { CharaService } from '../shared/chara.service';

import * as wsocket from 'socket.io-client';

@Component({
  selector: 'app-chara',
  templateUrl: './chara.component.html',
  styleUrls: ['./chara.component.css'],

  providers: [CharaService]
})
export class CharaComponent implements OnInit, OnDestroy {

  constructor(private charaService: CharaService) {
    // establish a socket connection
    CharaComponent.mysock = wsocket('http://localhost:3000');
  }

  static mysock;


  static callmemaybe() {
    // send an event to the hook, 'testevent'
    CharaComponent.mysock.emit('testevent', {data_sent_AngularToNode: 'lets goooooo'});
  }







  ngOnDestroy() { // this works for now
    CharaComponent.mysock.disconnect();
  }

  ngOnInit() {
    console.log('characomponent oninit called');
    // effectively, if a user is logged in
    if (localStorage.getItem('id_token') == null) {
      // this.flashMsg.show('You gotta be signed in to view chara123', { timeout: 3000});
      // this.router.navigate(['signin']);
      return;
    }

    // define a hook to listen for, called 'testevent'
    CharaComponent.mysock.on('testevent', (data) => console.log(data));
  } // end.of ngoninit

}
