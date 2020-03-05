import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router'; // router to redirect
import { FlashMessagesService } from 'angular2-flash-messages';
import { CharaService } from '../shared/chara.service';
import { SecretSocketComponent } from '../secret-socket/secret-socket.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private authServ: AuthService,
              private router: Router,
              private flashMsg: FlashMessagesService,
              private charaservice: CharaService) { }

  ngOnInit() {}


  onSignoutClick() {
    this.authServ.signout(); // dont need an observer so this is good enough
    this.charaservice.selectedChara = null;
    this.charaservice.allCharas = null;
    this.flashMsg.show('You\'ve been logged out', {timeout: 3000});
    this.router.navigate(['/signin']);
    return false;
  }

  loadCharacterIdAndRoom(chara) {
    if (this.charaservice.desiredId != null) { // leave this room
      SecretSocketComponent.leaveCharacterRoom(this.charaservice.desiredId);
    }
    this.charaservice.desiredId = chara._id;
    SecretSocketComponent.joinCharacterRoom(this.charaservice.desiredId);
    SecretSocketComponent.getSelectedCharacter(this.charaservice.desiredId);
  }

}
