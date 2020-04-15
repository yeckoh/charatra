import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';
import { Spells } from 'src/app/shared/spells.model';
import { Classes } from 'src/app/shared/classes.model';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { DialogSpellComponent } from 'src/app/dialogs/dialog-spell/dialog-spell.component';
import { MatDialog } from '@angular/material';
import { Attack } from 'src/app/shared/attack.model';
import { Savethrows } from 'src/app/shared/savethrows.model';

@Component({
  selector: 'app-tab-spells',
  templateUrl: './tab-spells.component.html',
  styleUrls: ['./tab-spells.component.css']
})
export class TabSpellsComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService, private modPipe: ModifierPipe,
              private spellDialog: MatDialog) { }


  BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  chara: Chara = new Chara(); // chara is read_only really
  // spells = [] as Spells[];

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
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
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

      // this.spells = this.chara.chara_spelllist.listof_spells;

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

    this.subscriptions.add(this.charaservice.listenfor('Created_new_spell').subscribe(data => {
      const newspell = data as Spells;
      this.chara.chara_spelllist.listof_spells.push(newspell);
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_one_spell').subscribe(data => {
      this.chara.chara_spelllist.listof_spells = this.chara.chara_spelllist.listof_spells.filter(s => s._id !== data) as [Spells];
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_spell').subscribe(data => {
      const newspell = data as Spells;
      const spellIndex = this.chara.chara_spelllist.listof_spells.findIndex(s => s._id === newspell._id);
      // this.chara.chara_spelllist.listof_spells[spellIndex] = newspell;
      this.chara.chara_spelllist.listof_spells[spellIndex].cast_time = newspell.cast_time;
      this.chara.chara_spelllist.listof_spells[spellIndex].descript = newspell.descript;
      this.chara.chara_spelllist.listof_spells[spellIndex].duration = newspell.duration;
      this.chara.chara_spelllist.listof_spells[spellIndex].is_concentration = newspell.is_concentration;
      this.chara.chara_spelllist.listof_spells[spellIndex].is_ritual = newspell.is_ritual;
      this.chara.chara_spelllist.listof_spells[spellIndex].is_somatic_component = newspell.is_somatic_component;
      this.chara.chara_spelllist.listof_spells[spellIndex].is_verbal_component = newspell.is_verbal_component;
      this.chara.chara_spelllist.listof_spells[spellIndex].lvl = newspell.lvl;
      this.chara.chara_spelllist.listof_spells[spellIndex].range = newspell.range;
      this.chara.chara_spelllist.listof_spells[spellIndex].selected_color = newspell.selected_color;
      this.chara.chara_spelllist.listof_spells[spellIndex].spellname = newspell.spellname;
    }));



    this.subscriptions.add(this.charaservice.listenfor('Created_new_attack').subscribe(data => {
      // data is a new attack
      const newattack = data as Attack;
      if (newattack.parentSpell === undefined) {
        return;
      }
      // const filteredSpells = this.chara.chara_spelllist.listof_spells.filter(e => e._id === newattack.parentSpell);
      this.chara.chara_spelllist.listof_spells.find(e => e._id === newattack.parentSpell).listof_spellattacks.push(newattack);
    }));

    this.subscriptions.add(this.charaservice.listenfor('Created_new_save').subscribe(data => {
      // data is a new save
      // look for save parent, oof.
      const newsave = data as Savethrows;
      if (newsave.parentSpell === undefined) {
        return;
      }
      // const filteredSpells = this.chara.chara_spelllist.listof_spells.filter(e => e._id === newsave.parentSpell);
      this.chara.chara_spelllist.listof_spells.find(e => e._id === newsave.parentSpell).listof_spellsaves.push(newsave);

    }));


    this.subscriptions.add(this.charaservice.listenfor('Updated_one_attack').subscribe(data => {
      const newattack = data as Attack;
      if (newattack.parentSpell === undefined) {
        return;
      }
      const spellIndex = this.chara.chara_spelllist.listof_spells.findIndex(e => e._id === newattack.parentSpell);
      const attackIndex = this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellattacks.findIndex(e => e._id === newattack._id);
      this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellattacks[attackIndex] = newattack;
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_save').subscribe(data => {
      const newsave = data as Savethrows;
      if (newsave.parentSpell === undefined) {
        return;
      }
      const spellIndex = this.chara.chara_spelllist.listof_spells.findIndex(e => e._id === newsave.parentSpell);
      const saveIndex = this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellsaves.findIndex(e => e._id === newsave._id);
      this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellsaves[saveIndex] = newsave;
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_spell_attack').subscribe(data => {
      // data is the deleted attack
      const deletedattack = data as Attack;
      const spellIndex = this.chara.chara_spelllist.listof_spells.findIndex(e => e._id === deletedattack.parentSpell);
      if (spellIndex !== -1) { // was it a prepared spell? <-- UNIMPLEMENTED RIGHT NOW, ALWAYS TRUE
        const attackIndex = this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellattacks.findIndex(a => a._id === deletedattack._id);
        this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellattacks.splice(attackIndex, 1);
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_spell_save').subscribe(data => {
      // data is the deleted save
      const deletedsave = data as Savethrows;
      const spellIndex = this.chara.chara_spelllist.listof_spells.findIndex(e => e._id === deletedsave.parentSpell);
      if (spellIndex !== -1) { // was it a prepared spell? <-- UNIMPLEMENTED RIGHT NOW, ALWAYS TRUE
        const saveIndex = this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellsaves.findIndex(s => s._id === deletedsave._id);
        this.chara.chara_spelllist.listof_spells[spellIndex].listof_spellsaves.splice(saveIndex, 1);
      }
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
          mutableInput = input; }
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

  makeNewSpell() {
    const data = {
      charaid: this.charaservice.CharaId,
      spelllistid: this.chara.chara_spelllist._id
    };
    this.charaservice.sendback('Make_new_spell', data);
  }

  updateProf() {
    this.profBonus = 1 + Math.ceil(this.chara.chara_class.class_level / 4); // evaluate cant use math atm. funcs so rest in rip for now
  }


}
