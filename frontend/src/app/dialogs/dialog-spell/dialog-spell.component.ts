import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import { Chara } from 'src/app/shared/chara.model';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { Subscription } from 'rxjs';
import { Spells } from 'src/app/shared/spells.model';
import { Classes } from 'src/app/shared/classes.model';
import { DialogAttackComponent } from '../dialog-attack/dialog-attack.component';
import { DialogSavingthrowComponent } from '../dialog-savingthrow/dialog-savingthrow.component';

@Component({
  selector: 'app-dialog-spell',
  templateUrl: './dialog-spell.component.html',
  styleUrls: ['./dialog-spell.component.scss']
})
export class DialogSpellComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogSpellComponent>,
              private subDialog: MatDialog,
              private modPipe: ModifierPipe) {
      this.chara = data.chara as Chara; // data: {selected_spell, chara: this.chara}});

      this.level = this.chara.chara_class.class_level;
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
      this.spell = data.selected_spell as Spells;
    }

    chara: Chara;
    spell: Spells;
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

    BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
      // really we only need the stats for formula evaluation
      this.chara = data as Chara;
      this.level = this.chara.chara_class.class_level;
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

    this.subscriptions.add(this.charaservice.listenfor('Updated_selected_class').subscribe(data => {
      this.chara.chara_class = data as Classes;
      this.level = this.chara.chara_class.class_level;
      this.updateProf();
    }));
  }


  updateProf() {
    this.profBonus = 1 + Math.ceil(this.level / 4); // evaluate cant use math atm. funcs so rest in rip for now
  }

  // tslint:disable: one-line
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
          mutableInput = input; }
      return mutableInput;
    } catch (error) {
      return 'NaN';
    }
  }

/*
    // UPDATE_ONE
    socket.on('Update_selected_spell', function(sent_in_data) {
        // data is .spell obj .charaid
    socket.on('Delete_selected_spell', function(sent_in_data) {
        // data consists of .spellid .charaid
*/


  sendSpellDialogUpdate() {
    const updateData = {
      spell: this.spell,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Update_selected_spell', updateData);
  }

  sendSpellDelete() {
    const spellAndcharaId = {
      spellid: this.spell._id,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Delete_selected_spell', spellAndcharaId);
    this.thisDialog.close();
  }

/*

  sendItemDelete() {

    const itemAndUserId = {
      charaid: this.charaservice.CharaId,
      itemid: this.thisItem._id,
      parentid: undefined
    };
    switch (this.whichContainer) {
      case 'inventory':
        itemAndUserId.parentid = this.inventory._id;
        break;
      case 'carried':
        itemAndUserId.parentid = this.carried._id;
        break;
      case 'extra':
        itemAndUserId.parentid = this.extra._id;
        break;
    }
    this.charaservice.sendback('Delete_selected_item', itemAndUserId);
    this.thisDialog.close();
  }

*/


  newAttack() {
    const forwardingdata = {
      spell_id: this.spell._id,
      chara_id: this.charaservice.CharaId
    };
    this.charaservice.sendback('Make_new_attack', forwardingdata);
  }

  newSave() {
    const forwardingdata = {
      spell_id: this.spell._id,
      chara_id: this.charaservice.CharaId
    };
    this.charaservice.sendback('Make_new_save', forwardingdata);
  }

  // tslint:disable: variable-name
  openAttackDialog(selected_attack) {
    this.subDialog.open(DialogAttackComponent, {data: selected_attack});
  }

  openSaveDialog(selected_save) {
    this.subDialog.open(DialogSavingthrowComponent, {data: selected_save});
  }

}
