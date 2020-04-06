import { Component, OnInit, OnDestroy } from '@angular/core';

import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { Observable, Subscription, Observer } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogStatComponent } from 'src/app/dialogs/dialog-stat/dialog-stat.component';
import { Classes } from 'src/app/shared/classes.model';
import { ArmorMod } from 'src/app/shared/armor-mod.model';
import { Items } from 'src/app/shared/items.model';
import { TabInventoryComponent } from '../tab-inventory/tab-inventory.component';

@Component({
  selector: 'app-tab-overview',
  templateUrl: './tab-overview.component.html',
  styleUrls: ['./tab-overview.component.scss']
})
export class TabOverviewComponent implements OnInit, OnDestroy {
  private chara: Chara = new Chara();
    // pulled straight
  private str;
  private dex;
  private con;
  private int;
  private wis;
  private cha;

  // calculated
  private strMod;
  private dexMod;
  private conMod;
  private intMod;
  private wisMod;
  private chaMod;

  /// GRAB HIGHEST AC TOTAL FROM ITEMS AND PUT IT HERE OR SOMETHING
  // tslint:disable: variable-name
  private calc_ac;
  private armorMods = [] as ArmorMod[];

  private strSave;
  private dexSave;
  private conSave;
  private intSave;
  private wisSave;
  private chaSave;

  private strSaveIsProficient;
  private dexSaveIsProficient;
  private conSaveIsProficient;
  private intSaveIsProficient;
  private wisSaveIsProficient;
  private chaSaveIsProficient;


  private acrobatics;
  private handling;
  private arcana;
  private athletics;
  private deception;
  private history;
  private insight;
  private intimidation;
  private investigation;
  private medicine;
  private nature;
  private perception;
  private performance;
  private persuasion;
  private religion;
  private sleight;
  private stealth;
  private survival;

  private acrobaticsIsProficient;
  private handlingIsProficient;
  private arcanaIsProficient;
  private athleticsIsProficient;
  private deceptionIsProficient;
  private historyIsProficient;
  private insightIsProficient;
  private intimidationIsProficient;
  private investigationIsProficient;
  private medicineIsProficient;
  private natureIsProficient;
  private perceptionIsProficient;
  private performanceIsProficient;
  private persuasionIsProficient;
  private religionIsProficient;
  private sleightIsProficient;
  private stealthIsProficient;
  private survivalIsProficient;

  private profBonus = 0;
  private totalHitpoints = 1337;
  private currentHitpoints = 256;
  private initiative;
  private level: number; // THIS GETS MODIFIED FROM CLASSES, ITS REALLY READ-ONLY HERE

  public finishswappingitems;

  constructor(private charaservice: CharaService,
              private modpipe: ModifierPipe,
              private statdialog: MatDialog) { }// endof constructor

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // used by hpbar when changing current hitpoints. Potentially do stuff when dropped to 0.
  updateVal(item) {
    this.chara.current_hitpoints = item;
    this.updateBackendChara();
  }
  updateLocalHitpoints(slidervalue) {
    this.currentHitpoints = slidervalue;
  }


  updateBackendChara() {
    const userid = this.charaservice.UserRoom;
    const useridAndChara = {
      userid, // needed for user room. purpose: update sidebar for namechange
      chara: this.chara
    };
    this.charaservice.sendback('Update_selected_chara', useridAndChara);
  }

  ngOnInit() {

    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      this.chara = data as Chara;
      this.updateProf();
      this.str = this.chara.stats.str;
      this.dex = this.chara.stats.dex;
      this.con = this.chara.stats.con;
      this.int = this.chara.stats.int;
      this.wis = this.chara.stats.wis;
      this.cha = this.chara.stats.cha;

      this.strMod = this.modpipe.transform(this.str);
      this.dexMod = this.modpipe.transform(this.dex);
      this.conMod = this.modpipe.transform(this.con);
      this.intMod = this.modpipe.transform(this.int);
      this.wisMod = this.modpipe.transform(this.wis);
      this.chaMod = this.modpipe.transform(this.cha);

      this.strSave = this.regularFormula(this.chara.saves.str);
      this.dexSave = this.regularFormula(this.chara.saves.dex);
      this.conSave = this.regularFormula(this.chara.saves.con);
      this.intSave = this.regularFormula(this.chara.saves.int);
      this.wisSave = this.regularFormula(this.chara.saves.wis);
      this.chaSave = this.regularFormula(this.chara.saves.cha);

      this.strSaveIsProficient = this.chara.saves.str.includes('profBonus');
      this.dexSaveIsProficient = this.chara.saves.dex.includes('profBonus');
      this.conSaveIsProficient = this.chara.saves.con.includes('profBonus');
      this.intSaveIsProficient = this.chara.saves.int.includes('profBonus');
      this.wisSaveIsProficient = this.chara.saves.wis.includes('profBonus');
      this.chaSaveIsProficient = this.chara.saves.cha.includes('profBonus');

      this.acrobatics = this.regularFormula(this.chara.skills.acrobatics);
      this.handling = this.regularFormula(this.chara.skills.animal_handling);
      this.arcana = this.regularFormula(this.chara.skills.arcana);
      this.athletics = this.regularFormula(this.chara.skills.athletics);
      this.deception = this.regularFormula(this.chara.skills.deception);
      this.history = this.regularFormula(this.chara.skills.history);
      this.insight = this.regularFormula(this.chara.skills.insight);
      this.intimidation = this.regularFormula(this.chara.skills.intimidation);
      this.investigation = this.regularFormula(this.chara.skills.investigation);
      this.medicine = this.regularFormula(this.chara.skills.medicine);
      this.nature = this.regularFormula(this.chara.skills.nature);
      this.perception = this.regularFormula(this.chara.skills.perception);
      this.performance = this.regularFormula(this.chara.skills.performance);
      this.persuasion = this.regularFormula(this.chara.skills.persuasion);
      this.religion = this.regularFormula(this.chara.skills.religion);
      this.sleight = this.regularFormula(this.chara.skills.sleight_of_hand);
      this.stealth = this.regularFormula(this.chara.skills.stealth);
      this.survival = this.regularFormula(this.chara.skills.survival);

      this.acrobaticsIsProficient = this.chara.skills.acrobatics.includes('profBonus');
      this.handlingIsProficient = this.chara.skills.animal_handling.includes('profBonus');
      this.arcanaIsProficient = this.chara.skills.arcana.includes('profBonus');
      this.athleticsIsProficient = this.chara.skills.athletics.includes('profBonus');
      this.deceptionIsProficient = this.chara.skills.deception.includes('profBonus');
      this.historyIsProficient = this.chara.skills.history.includes('profBonus');
      this.insightIsProficient = this.chara.skills.insight.includes('profBonus');
      this.intimidationIsProficient = this.chara.skills.intimidation.includes('profBonus');
      this.investigationIsProficient = this.chara.skills.investigation.includes('profBonus');
      this.medicineIsProficient = this.chara.skills.medicine.includes('profBonus');
      this.natureIsProficient = this.chara.skills.nature.includes('profBonus');
      this.perceptionIsProficient = this.chara.skills.perception.includes('profBonus');
      this.performanceIsProficient = this.chara.skills.performance.includes('profBonus');
      this.persuasionIsProficient = this.chara.skills.persuasion.includes('profBonus');
      this.religionIsProficient = this.chara.skills.religion.includes('profBonus');
      this.sleightIsProficient = this.chara.skills.sleight_of_hand.includes('profBonus');
      this.stealthIsProficient = this.chara.skills.stealth.includes('profBonus');
      this.survivalIsProficient = this.chara.skills.survival.includes('profBonus');

      // this.totalHitpoints = this.regularFormula(this.chara.formuolis.hitpoints);
      this.totalHitpoints = this.regularFormula(this.chara.chara_class.class_hitpoints);
      if (this.totalHitpoints < this.chara.current_hitpoints) {
        this.chara.current_hitpoints = this.totalHitpoints;
      }
      this.currentHitpoints = this.chara.current_hitpoints;

      this.initiative = this.regularFormula(this.chara.formuolis.initiative);
      this.pullAllInventoryArmorMods();
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_selected_class').subscribe(data => {
      this.chara.chara_class = data as Classes;
      this.updateProf();
      this.totalHitpoints = this.regularFormula(this.chara.chara_class.class_hitpoints);
      if (this.totalHitpoints < this.chara.current_hitpoints) {
        this.chara.current_hitpoints = this.totalHitpoints;
      }
      this.currentHitpoints = this.chara.current_hitpoints;
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_container').subscribe(data => {
      this.pullAllInventoryArmorMods();
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_item').subscribe(data => {
      const inventorychecker = data as Items;
      if (!inventorychecker.applyarmor) {
        return;
      }
      // otherwise check if its in the inventory container, then check if the armormod is already in the local armormods list
      const itemIndex = this.chara.equipped_itemcontainer.listof_items.findIndex(e => e._id === inventorychecker._id);
      if (itemIndex !== -1) {
        const localArmorIndex = this.armorMods.findIndex(e => e._id === inventorychecker.armormod._id);
        if (localArmorIndex !== -1) {
          this.armorMods[localArmorIndex] = inventorychecker.armormod;
          this.updateArmorClass();
          return;
        }
        // in inventory container and isnt in our local list for some reason
        this.armorMods.push(inventorychecker.armormod);
        this.updateArmorClass();
      }
      // otherwise its not in the inventory container
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_selected_armormod').subscribe(data => {
      const updatedarmor = data as ArmorMod;
      const armorIndex = this.armorMods.findIndex(e => e._id === updatedarmor._id);
      if (armorIndex !== -1) {
        this.armorMods[armorIndex] = updatedarmor;
      }
      this.updateArmorClass();
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_one_item').subscribe(data => {
      // data is an itemid
      // might as well just do the same thing as the updated_one_container
      this.pullAllInventoryArmorMods();
    }));
  }

  // modify a stat and update the character onclose
  openEditingDialog(stat) {
    const dialogRef = this.statdialog.open(DialogStatComponent, {data: {chara: this.chara, stat}});
  }

  updateProf() {
    this.level = this.chara.chara_class.class_level;
    this.profBonus = 1 + Math.ceil(this.level / 4); // evaluate cant use math atm. funcs so rest in rip for now
  }


  pullAllInventoryArmorMods() {
    this.armorMods.length = 0;
    this.chara.equipped_itemcontainer.listof_items.forEach(e => {
      this.armorMods.push(e.armormod);
    });
    this.updateArmorClass();
  }

  updateArmorClass() {
    this.calc_ac = this.chara.stats.baseAC;
    let baseac: number = Number.MIN_SAFE_INTEGER;
    let additionalac = 0;
    let maxac: number = Number.MAX_SAFE_INTEGER;
    this.armorMods.forEach(element => {
      if (element.usebase && element.baseac > baseac) {
        baseac = element.baseac;
      }
      if (element.usemax && element.maxac < maxac) {
        maxac = element.maxac;
      }
      if (element.useadd) {
        additionalac += element.addac as number;
      }
  });
    this.calc_ac += this.dexMod as number;
    if (this.calc_ac > maxac) {
      this.calc_ac = maxac;
    }
    if (this.calc_ac < baseac) {
      this.calc_ac = baseac as number;
    }
    this.calc_ac += additionalac as number;
}




  // tslint:disable: member-ordering
  BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

// tslint:disable: one-line
// tslint:disable: no-conditional-assignment
regularFormula(input) {
  let mutableInput = input;
  this.BRACKET_EXPRESSION.lastIndex = 0;
  try {
    if (this.BRACKET_EXPRESSION.test(input)) {
        let result;
        this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by test, now {0} is what was {1}
        while (result = this.BRACKET_EXPRESSION.exec(mutableInput)) {
          mutableInput = mutableInput.replace(result[0], evaluate(result[1], this));
          this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by replace, now {0} is what was {1}
      }} else {
        if (mutableInput = evaluate(input, this)) { } // simple formula; {} is implied
        else {mutableInput = 0; } // evaluation failed but didnt throw an error
      }
    return mutableInput;
  } catch (error) {
    return 'NaN';
  }
}

}
