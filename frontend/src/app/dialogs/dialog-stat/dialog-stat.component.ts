import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';

@Component({
  selector: 'app-dialog-stat',
  templateUrl: './dialog-stat.component.html',
  styleUrls: ['./dialog-stat.component.scss']
})
export class DialogStatComponent implements OnInit, OnDestroy {

  public updata; // actual form input data which replaces the stat right before updating
  stat; // string value for our switch cases, oof!
  chara: Chara; // character
  somethingWasEdited = false; // dont send an update if nothing changed


  constructor(private charaservice: CharaService, @Inject(MAT_DIALOG_DATA) data) {
    this.chara = data.chara;
    this.stat = data.stat;

    switch (this.stat) {
      // 6 base stats
      case 'str': this.updata = this.chara.stats.str; break;
      case 'dex': this.updata = this.chara.stats.dex; break;
      case 'con': this.updata = this.chara.stats.con; break;
      case 'int': this.updata = this.chara.stats.int; break;
      case 'wis': this.updata = this.chara.stats.wis; break;
      case 'cha': this.updata = this.chara.stats.cha; break;

      // speed, init, profbonus
      case 'Speed': this.updata = this.chara.stats.speed; break;
      case 'Initiative Formula': this.updata = this.chara.formuolis.initiative; break;
      case 'Proficiency Formula': this.updata = this.chara.formuolis.proficiency; break;

      // saving throws
      case 'Str save': this.updata = this.chara.saves.str; break;
      case 'Dex save': this.updata = this.chara.saves.dex; break;
      case 'Con save': this.updata = this.chara.saves.con; break;
      case 'Int save': this.updata = this.chara.saves.int; break;
      case 'Wis save': this.updata = this.chara.saves.wis; break;
      case 'Cha save': this.updata = this.chara.saves.cha; break;

      // all the skills
      case 'acrobatics': this.updata = this.chara.skills.acrobatics; break;
      case 'animal_handling': this.updata = this.chara.skills.animal_handling; break;
      case 'arcana': this.updata = this.chara.skills.arcana; break;
      case 'athletics': this.updata = this.chara.skills.athletics; break;
      case 'deception': this.updata = this.chara.skills.deception; break;
      case 'history': this.updata = this.chara.skills.history; break;
      case 'insight': this.updata = this.chara.skills.insight; break;
      case 'intimidation': this.updata = this.chara.skills.intimidation; break;
      case 'investigation': this.updata = this.chara.skills.investigation; break;
      case 'medicine': this.updata = this.chara.skills.medicine; break;
      case 'nature': this.updata = this.chara.skills.nature; break;
      case 'perception': this.updata = this.chara.skills.perception; break;
      case 'performance': this.updata = this.chara.skills.performance; break;
      case 'persuasion': this.updata = this.chara.skills.persuasion; break;
      case 'religion': this.updata = this.chara.skills.religion; break;
      case 'sleight_of_hand': this.updata = this.chara.skills.sleight_of_hand; break;
      case 'stealth': this.updata = this.chara.skills.stealth; break;
      case 'survival': this.updata = this.chara.skills.survival; break;
    }
  }
  private subscriptions = [];

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  sendStatDialogUpdate() {
    this.updateBackendChara();
  }

  ngOnInit() {
    this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      this.chara = data as Chara;
      // switch (this.stat) { <-- I KINDA LIKE NOT UPDATING THE STAT IF SOMEONE ELSE ALREADY SUBMITTED SOMETHING
      //   case 'str': this.updata = this.chara.stats.str; break;
      //   case 'acrobatics': this.updata = this.chara.skills.acrobatics; break;
      //   case 'animal_handling': this.updata = this.chara.skills.animal_handling; break;
      //   case 'arcana': this.updata = this.chara.skills.arcana; break;
      //   case 'athletics': this.updata = this.chara.skills.athletics; break;
      //   case 'deception': this.updata = this.chara.skills.deception; break;
      //   case 'history': this.updata = this.chara.skills.history; break;
      //   case 'insight': this.updata = this.chara.skills.insight; break;
      //   case 'intimidation': this.updata = this.chara.skills.intimidation; break;
      //   case 'investigation': this.updata = this.chara.skills.investigation; break;
      //   case 'medicine': this.updata = this.chara.skills.medicine; break;
      //   case 'nature': this.updata = this.chara.skills.nature; break;
      //   case 'perception': this.updata = this.chara.skills.perception; break;
      //   case 'performance': this.updata = this.chara.skills.performance; break;
      //   case 'persuasion': this.updata = this.chara.skills.persuasion; break;
      //   case 'religion': this.updata = this.chara.skills.religion; break;
      //   case 'sleight_of_hand': this.updata = this.chara.skills.sleight_of_hand; break;
      //   case 'stealth': this.updata = this.chara.skills.stealth; break;
      //   case 'survival': this.updata = this.chara.skills.survival; break;
      // }

    });

  }


  // assign the form input to the character data
  updateParentComponentInput() {
    this.somethingWasEdited = true;
    switch (this.stat) {
      // 6 stats
      case 'str': this.chara.stats.str = this.updata; break;
      case 'dex': this.chara.stats.dex = this.updata; break;
      case 'con': this.chara.stats.con = this.updata; break;
      case 'int': this.chara.stats.int = this.updata; break;
      case 'wis': this.chara.stats.wis = this.updata; break;
      case 'cha': this.chara.stats.cha = this.updata; break;

      // misc stuff
      case 'Speed': this.chara.stats.speed = this.updata; break;
      case 'Initiative Formula': this.chara.formuolis.initiative = this.updata; break;
      case 'Proficiency Formula': this.chara.formuolis.proficiency = this.updata; break;

      // saving throws
      case 'Str save': this.chara.saves.str = this.updata; break;
      case 'Dex save': this.chara.saves.dex = this.updata; break;
      case 'Con save': this.chara.saves.con = this.updata; break;
      case 'Int save': this.chara.saves.int = this.updata; break;
      case 'Wis save': this.chara.saves.wis = this.updata; break;
      case 'Cha save': this.chara.saves.cha = this.updata; break;

      // skills
      case 'acrobatics': this.chara.skills.acrobatics = this.updata; break;
      case 'animal_handling': this.chara.skills.animal_handling = this.updata; break;
      case 'arcana': this.chara.skills.arcana = this.updata; break;
      case 'athletics': this.chara.skills.athletics = this.updata; break;
      case 'deception': this.chara.skills.deception = this.updata; break;
      case 'history': this.chara.skills.history = this.updata; break;
      case 'insight': this.chara.skills.insight = this.updata; break;
      case 'intimidation': this.chara.skills.intimidation = this.updata; break;
      case 'investigation': this.chara.skills.investigation = this.updata; break;
      case 'medicine': this.chara.skills.medicine = this.updata; break;
      case 'nature': this.chara.skills.nature = this.updata; break;
      case 'perception': this.chara.skills.perception = this.updata; break;
      case 'performance': this.chara.skills.performance = this.updata; break;
      case 'persuasion': this.chara.skills.persuasion = this.updata; break;
      case 'religion': this.chara.skills.religion = this.updata; break;
      case 'sleight_of_hand': this.chara.skills.sleight_of_hand = this.updata; break;
      case 'stealth': this.chara.skills.stealth = this.updata; break;
      case 'survival': this.chara.skills.survival = this.updata; break;

    }
  }

  updateBackendChara() {
    if (!this.somethingWasEdited || this.chara._id === 'none') {
      return;
    }
    const userid = this.charaservice.UserRoom;
    const useridAndChara = {
      userid, // needed for user room. purpose: update sidebar for namechange
      chara: this.chara
    };
    this.charaservice.sendback('Update_selected_chara', useridAndChara);
  }


}
