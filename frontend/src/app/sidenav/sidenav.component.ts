import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router'; // router to redirect
import { FlashMessagesService } from 'angular2-flash-messages';
import { CharaService } from '../shared/chara.service';
import { Chara } from '../shared/chara.model';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private allcharas = [];

  constructor(private authServ: AuthService,
              private router: Router,
              private flashMsg: FlashMessagesService,
              private charaservice: CharaService) { }

  ngOnInit() {
    this.charaservice.listenfor('Read_all_user_charas').subscribe((data) => {
        this.allcharas = data as Chara[];
    });

    this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      const replacementIndex = this.allcharas.findIndex(e => e._id === (data as Chara)._id);
      this.allcharas[replacementIndex] = data as Chara;
    });

    this.charaservice.listenfor('Created_new_chara').subscribe((data) => {
      // get all characterids in user localstorage obj
      // append this new chara id
      // set localstorage new characterlist
      const userinfo = JSON.parse(localStorage.getItem('user'));
      userinfo.charas.push((data as Chara)._id); // add id to list of charas
      localStorage.setItem('user', JSON.stringify(userinfo));
      this.allcharas.push(data);
    });
  }

  onSignoutClick() {
    this.authServ.signout(); // dont need an observer so this is good enough
    this.charaservice.leaveCharacterRoom(this.charaservice.CharaId);
    this.allcharas.length = 0;
    // TODO: leave user room too here
    this.flashMsg.show('You\'ve been logged out', {timeout: 3000});
    this.router.navigate(['/signin']);
    return false;
  }

  loadCharacterIdAndRoom(chara) {
    if (this.charaservice.CharaId != null) { // leave this room
      this.charaservice.leaveCharacterRoom(this.charaservice.CharaId);
    }
    this.charaservice.CharaId = chara._id;
    this.charaservice.joinCharacterRoom(chara._id);
    this.charaservice.sendback('Get_selected_chara', {characterid: chara._id});
  }

}
