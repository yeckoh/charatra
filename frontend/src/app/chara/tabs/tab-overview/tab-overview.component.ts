import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'; // router to redirect
import { FlashMessagesService } from 'angular2-flash-messages';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';


@Component({
  selector: 'app-tab-overview',
  templateUrl: './tab-overview.component.html',
  styleUrls: ['./tab-overview.component.css']
})
export class TabOverviewComponent implements OnInit {
  private chara: Chara = new Chara();
  private totalHitpoints = 1337;
  private str;
  private dex;
  private con;
  private int;
  private wis;
  private cha;
  // we can use the pipe in the interpolation instead of keeping variables
  // but for other pages that need formula evaluation using modifiers, yea we need them
  // private strMod;
  // private dexMod;
  // private conMod;
  // private intMod;
  // private wisMod;
  // private chaMod;


  constructor(private router: Router,
              private flashMsg: FlashMessagesService,
              private charaservice: CharaService,
              private modpipe: ModifierPipe) { }// endof constructor


  updateVal(item) {
    this.chara.current_hitpoints = item;
    const userid = this.charaservice.UserRoom;
    const useridAndChara = {
      userid, // needed for user room. purpose: update sidebar for namechange
      chara: this.chara
    };
    this.charaservice.sendback('Update_selected_chara', useridAndChara);
  }

  ngOnInit() {

    this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      this.chara = data as Chara;
      this.totalHitpoints = this.charaservice.regularFormula(this.chara.stats.hitpoint_formula);
      this.str = this.chara.stats.str;
      this.dex = this.chara.stats.dex;
      this.con = this.chara.stats.con;
      this.int = this.chara.stats.int;
      this.wis = this.chara.stats.wis;
      this.cha = this.chara.stats.cha;
      // this.strMod = this.modpipe.transform(this.str);
    });


  }

}
