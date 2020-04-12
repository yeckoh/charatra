import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';
import { Features } from 'src/app/shared/features.model';
import { Items } from 'src/app/shared/items.model';
import { Spells } from 'src/app/shared/spells.model';
import { Classes } from 'src/app/shared/classes.model';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import { Attack } from 'src/app/shared/attack.model';
import { Savethrows } from 'src/app/shared/savethrows.model';

@Component({
  selector: 'app-tab-spells',
  templateUrl: './tab-spells.component.html',
  styleUrls: ['./tab-spells.component.css']
})
export class TabSpellsComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService, private modPipe: ModifierPipe) { }


  BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  chara: Chara = new Chara(); // chara is read_only really
  spells = [] as Spells[];

  // spellattacks = [] as Attack[];
  // spellsaves = [] as Savethrows[];

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

  private strSave = 0;
  private dexSave = 0;
  private conSave = 0;
  private intSave = 0;
  private wisSave = 0;
  private chaSave = 0;

  private strDC = 0;
  private dexDC = 0;
  private conDC = 0;
  private intDC = 0;
  private wisDC = 0;
  private chaDC = 0;

  private profBonus = 0;
  private level = 0;

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions.add(this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
      // set up shorthand variables for the user to use in formulas
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
      this.strDC = 8 + this.strMod + this.profBonus;
      this.dexDC = 8 + this.dexMod + this.profBonus;
      this.conDC = 8 + this.conMod + this.profBonus;
      this.intDC = 8 + this.intMod + this.profBonus;
      this.wisDC = 8 + this.wisMod + this.profBonus;
      this.chaDC = 8 + this.chaMod + this.profBonus;

      this.spells = this.chara.chara_spelllist.listof_spells;

      // // load attacks and saves
      // this.spellattacks.length = 0;
      // this.spellsaves.length = 0;
      // spellpopulate
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_selected_class').subscribe(data => {
      this.chara.chara_class = data as Classes;
      this.level = this.chara.chara_class.class_level;
      this.updateProf();
    }));


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
          // if (mutableInput = evaluate(input, this)) { } // simple formula; {} is implied
          mutableInput = input; }
        //   else {mutableInput = input; } // evaluation failed but didnt throw an error
        // }
      return mutableInput;
    } catch (error) {
      return 'NaN';
    }
  }

  // tslint:disable: variable-name
  // tslint:disable: max-line-length
  openSpellDialog(selected_spell) {
    // open accepts 2 params (component, optional_configuration {data: something})
    this.spellDialog.open(DialogSpellComponent, {data: {selected_spell, chara: this.chara}});
  }

//   openAttackDialog(selected_attack) {
//       this.attackDialog.open(DialogAttackComponent, {data: selected_attack});
//   }

//   openSaveDialog(selected_save) {
//     this.attackDialog.open(DialogSavingthrowComponent, {data: selected_save});
// }

  makeNewFeature() {
    // SecretSocketComponent.newFeature(this.charaservice.CharaId);
    this.charaservice.sendback('Make_new_feature', {chara_id: this.charaservice.CharaId});
  }

  updateProf() {
    this.profBonus = 1 + Math.ceil(this.chara.chara_class.class_level / 4); // evaluate cant use math atm. funcs so rest in rip for now
  }


}
