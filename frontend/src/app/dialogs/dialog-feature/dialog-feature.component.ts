import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Features } from 'src/app/shared/features.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Chara } from 'src/app/shared/chara.model';
import { DialogAttackComponent } from 'src/app/dialogs/dialog-attack/dialog-attack.component';
import { Attack } from 'src/app/shared/attack.model';
import { Subscription } from 'rxjs';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import {ModifierPipe} from 'src/app/pipes/modifier.pipe';
import { Savethrows } from 'src/app/shared/savethrows.model';
import { DialogSavingthrowComponent } from '../dialog-savingthrow/dialog-savingthrow.component';

@Component({
  selector: 'app-dialog-feature',
  templateUrl: './dialog-feature.component.html',
  styleUrls: ['./dialog-feature.component.css']
})
export class DialogFeatureComponent implements OnInit, OnDestroy {
  feature: Features;
  chara: Chara;
    // pulled straight
    private str = 0;
    private dex = 0;
    private con = 0;
    private int = 0;
    private wis = 0;
    private cha = 0;

    // calculated
    private strMod = 0;
    private dexMod = 0;
    private conMod = 0;
    private intMod = 0;
    private wisMod = 0;
    private chaMod = 0;

    private strDC = 0;
    private dexDC = 0;
    private conDC = 0;
    private intDC = 0;
    private wisDC = 0;
    private chaDC = 0;

    private profBonus = 0;
    private level = 0;

  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogFeatureComponent>,
              private attackDialog: MatDialog,
              private modPipe: ModifierPipe) {
    this.feature = data.selected_feature;
    this.chara = data.chara;
    this.level = this.chara.stats.level;
    this.updateProf();
    this.str = this.chara.stats.str;
    this.dex = this.chara.stats.dex;
    this.con = this.chara.stats.con;
    this.int = this.chara.stats.int;
    this.wis = this.chara.stats.wis;
    this.cha = this.chara.stats.cha;
    this.strMod = this.modPipe.transform(this.str);
    this.dexMod = this.modPipe.transform(this.dex);
    this.conMod = this.modPipe.transform(this.con);
    this.intMod = this.modPipe.transform(this.int);
    this.wisMod = this.modPipe.transform(this.wis);
    this.chaMod = this.modPipe.transform(this.cha);
    this.strDC = 8 + this.strMod + this.profBonus;
    this.dexDC = 8 + this.dexMod + this.profBonus;
    this.conDC = 8 + this.conMod + this.profBonus;
    this.intDC = 8 + this.intMod + this.profBonus;
    this.wisDC = 8 + this.wisMod + this.profBonus;
    this.chaDC = 8 + this.chaMod + this.profBonus;
  }

  // do not edit if infocus
  accentFocus = false;
  titleFocus = false;
  descriptFocus = false;

  BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateProf() {
    this.profBonus = 1 + Math.ceil(this.level / 4); // evaluate cant use math atm. funcs so rest in rip for now
  }  // tslint:disable: one-line
  // tslint:disable: no-conditional-assignment
  nonRegularFormula(input) {
    let mutableInput = input;
    this.BRACKET_EXPRESSION.lastIndex = 0;
    try {
      if (this.BRACKET_EXPRESSION.test(input)) {
          let result;
          this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by replace, now {0} is what was {1}
          while (result = this.BRACKET_EXPRESSION.exec(mutableInput)) {
            mutableInput = mutableInput.replace(result[0], evaluate(result[1], this));
            this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by replace, now {0} is what was {1}
        }} else {
          // if (mutableInput = evaluate(input, this)) { } // simple formula; {} is implied
          mutableInput = input; }
        //   else {mutableInput = input; } // evaluation failed but didnt throw an error
        // }
      return mutableInput;
    } catch (error) {
      return 'NaN';
    }
  }

  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
    // really we only need the stats for formula evaluation
      const allfeatures = (data as Chara).listof_charafeatures;
      const featureIndex = allfeatures.findIndex(e => e._id === this.feature._id);
      this.feature = allfeatures[featureIndex];

      this.chara = data as Chara;
      this.level = this.chara.stats.level;
      this.updateProf();
      this.str = this.chara.stats.str;
      this.dex = this.chara.stats.dex;
      this.con = this.chara.stats.con;
      this.int = this.chara.stats.int;
      this.wis = this.chara.stats.wis;
      this.cha = this.chara.stats.cha;
      this.strMod = this.modPipe.transform(this.str);
      this.dexMod = this.modPipe.transform(this.dex);
      this.conMod = this.modPipe.transform(this.con);
      this.intMod = this.modPipe.transform(this.int);
      this.wisMod = this.modPipe.transform(this.wis);
      this.chaMod = this.modPipe.transform(this.cha);
    }));

    /// TODO: TEST WITH SECOND MASHEEN
    this.subscriptions.add(this.charaservice.listenfor('Updated_one_feature').subscribe(data => {
      // listen for UPDATE_ONE event
      // console.log('only receiving a feature');
      const castedData = data as Features;
      if (this.accentFocus) {
        this.feature.selected_color = castedData.selected_color;
      }
      if (this.titleFocus) {
        this.feature.title = castedData.title;
      }
      if (this.descriptFocus) {
        this.feature.descript = castedData.descript;
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_one_feature').subscribe(data => {
      // data is a featureid
      if (this.feature._id === data) { // the feature you're viewing got deleted
        this.thisDialog.close();
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Created_new_attack').subscribe(data => {
      // data is a new attack
      const newattack = data as Attack;
      if (newattack.parentFeature === this.feature._id) {
        this.feature.listof_atks.push(newattack);
        return;
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_attack').subscribe(data => {
      // data is a new attack
      const newattack = data as Attack;
      if (newattack.parentFeature === this.feature._id) {
        const attackIndex = this.feature.listof_atks.findIndex(e => e._id === newattack._id);
        this.feature.listof_atks[attackIndex] = newattack;
        return;
      }
    }));

    // THIS TAB-FEATURE WILL DELETE IT INSTEAD. dialog-feature will always be viewed in the features-tab

    // this.subscriptions.add(this.charaservice.listenfor('Deleted_feature_attack').subscribe(data => {
    //   // data is the deleted attack
    //   const deletedattack = data as Attack;

    //   if (this.feature._id === deletedattack.parentFeature) {
    //     const attackIndex = this.feature.listof_atks.findIndex(e => e._id === deletedattack._id);
    //     console.log('pre filter: ', this.feature.listof_atks);
    //     this.feature.listof_atks.splice(attackIndex, 1);
    //     console.log('post filter: ', this.feature.listof_atks);
    //   }
    // }));

    this.subscriptions.add(this.charaservice.listenfor('Created_new_save').subscribe(data => {
      // data is a new attack
      const newsave = data as Savethrows;
      if (newsave.parentFeature === this.feature._id) {
        this.feature.listof_saves.push(newsave);
        return;
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_save').subscribe(data => {
      // data is a new attack
      const newsave = data as Savethrows;
      if (newsave.parentFeature === this.feature._id) {
        const saveIndex = this.feature.listof_saves.findIndex(e => e._id === newsave._id);
        this.feature.listof_saves[saveIndex] = newsave;
        return;
      }
    }));

  }

  sendFeatureDialogUpdate() {
    const forwardingdata = {
      feature: this.feature,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Update_selected_feature', forwardingdata);
  }

  deleteFeature() {
    const forwardingdata = {
      featureid: this.feature._id,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Delete_selected_feature', forwardingdata);
    this.thisDialog.close();
  }

  newAttack() {
    const forwardingdata = {
      feature_id: this.feature._id,
      chara_id: this.charaservice.CharaId
    };
    this.charaservice.sendback('Make_new_attack', forwardingdata);
  }

  newSave() {
    const forwardingdata = {
      feature_id: this.feature._id,
      chara_id: this.charaservice.CharaId
    };
    this.charaservice.sendback('Make_new_save', forwardingdata);
  }

  // tslint:disable: variable-name
  openAttackDialog(selected_attack) {
    this.attackDialog.open(DialogAttackComponent, {data: selected_attack});
  }

  openSaveDialog(selected_save) {
    this.attackDialog.open(DialogSavingthrowComponent, {data: selected_save});
  }


}
