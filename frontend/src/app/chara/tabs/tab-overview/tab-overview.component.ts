import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'; // router to redirect
import { FlashMessagesService } from 'angular2-flash-messages';
import { CharaService } from 'src/app/shared/chara.service';
import { SecretSocketComponent } from 'src/app/secret-socket/secret-socket.component';


@Component({
  selector: 'app-tab-overview',
  templateUrl: './tab-overview.component.html',
  styleUrls: ['./tab-overview.component.css']
})
export class TabOverviewComponent implements OnInit {
  public cardTitleName = 'hello world';
  protected id: string;
  public color: 'p500';
  public classformat: 'mat-display-1 p500 boxshadow-4';

  constructor(private router: Router,
              private flashMsg: FlashMessagesService,
              private charaserv: CharaService) { }

  ngOnInit() { }

  callmemaybe() {
    SecretSocketComponent.getUserCharacters();
  }

  showloadeddata() {
    console.log(this.charaserv.CharaAll);
  }
}
