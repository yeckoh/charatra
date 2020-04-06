import { Component, OnInit, OnDestroy } from '@angular/core';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { CharaService } from 'src/app/shared/chara.service';
import { DialogFeatureComponent } from 'src/app/dialogs/dialog-feature/dialog-feature.component';
import { MatDialog } from '@angular/material';
import { Features } from 'src/app/shared/features.model';
import { Chara } from 'src/app/shared/chara.model';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import { Attack } from 'src/app/shared/attack.model';
import { Savethrows } from 'src/app/shared/savethrows.model';
import { Items } from 'src/app/shared/items.model';
import { DialogAttackComponent } from 'src/app/dialogs/dialog-attack/dialog-attack.component';
import { Spells } from 'src/app/shared/spells.model';
import { Subscription } from 'rxjs';
import { DialogSavingthrowComponent } from 'src/app/dialogs/dialog-savingthrow/dialog-savingthrow.component';
import { Classes } from 'src/app/shared/classes.model';

@Component({
  selector: 'app-tab-feature',
  templateUrl: './tab-feature.component.html',
  styleUrls: ['./tab-feature.component.css']
})
export class TabFeatureComponent implements OnInit, OnDestroy {
  constructor(private charaservice: CharaService,
              private featureDialog: MatDialog,
              private attackDialog: MatDialog,
              private modPipe: ModifierPipe) { }

  BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  chara: Chara = new Chara(); // chara is read_only really
  features = [] as Features[];
  items = [] as Items[];
  spells = [] as Spells[];

  featureattacks = [] as Attack[];
  itemattacks = [] as Attack[];
  spellattacks = [] as Attack[];

  featuresaves = [] as Savethrows[];
  itemsaves = [] as Savethrows[];
  spellsaves = [] as Savethrows[];

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

  // we need this to filter instead of foreach->findIndex-> if != -1 : splice
  public varForIdToFilter: any;

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
  openFeatureDialog(selected_feature) {
    // this.features = selected_feature;
    // open accepts 2 params (component, optional_configuration {data: something})
    this.featureDialog.open(DialogFeatureComponent, {data: {selected_feature, chara: this.chara}});
  }

  openAttackDialog(selected_attack) {
      this.attackDialog.open(DialogAttackComponent, {data: selected_attack});
  }

  openSaveDialog(selected_save) {
    this.attackDialog.open(DialogSavingthrowComponent, {data: selected_save});
}

  makeNewFeature() {
    // SecretSocketComponent.newFeature(this.charaservice.CharaId);
    this.charaservice.sendback('Make_new_feature', {chara_id: this.charaservice.CharaId});
  }

  updateProf() {
    this.profBonus = 1 + Math.ceil(this.chara.chara_class.class_level / 4); // evaluate cant use math atm. funcs so rest in rip for now
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

      // big money items
      this.features = this.chara.listof_charafeatures;
      this.items = this.chara.equipped_itemcontainer.listof_items;
      // this.spells = this.chara.listof_spelllists.listof_spells;

      // load attacks and saves
      this.featureattacks.length = 0;
      this.featuresaves.length = 0;
      this.itemattacks.length = 0;
      this.itemsaves.length = 0;
      this.spellattacks.length = 0;
      this.spellsaves.length = 0;
      this.features.forEach(element => {
        // if feature_isactive
        this.featureattacks.push(...element.listof_atks); // use iterator notation to keep a single array
        this.featuresaves.push(...element.listof_saves);
      });
      this.items.forEach(element => {
        this.itemattacks.push(...element.listof_attacks); // use iterator notation to keep a single array
        this.itemsaves.push(...element.listof_savingthrows);
      });
      // spellpopulate
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_selected_class').subscribe(data => {
      this.chara.chara_class = data as Classes;
      this.level = this.chara.chara_class.class_level;
      this.updateProf();
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_container').subscribe(data => {
      // console.log(data);
      class SwapData {
        oldcontainer: string;
        newcontainer: string;
        itemid: string;
      }
      const swapdata = data as SwapData;
      // find which oldcontainer
      switch (swapdata.oldcontainer) {
        case this.chara.equipped_itemcontainer._id:
          switch (swapdata.newcontainer) { // from inventory into...
            case this.chara.inventory_container._id: // ...into carried
              this.chara.inventory_container.listof_items.push(...this.chara.equipped_itemcontainer.listof_items.filter(e => e._id === swapdata.itemid));
              this.chara.equipped_itemcontainer.listof_items = this.chara.equipped_itemcontainer.listof_items.filter(e => e._id !== swapdata.itemid) as [Items];
              break;
            case this.chara.extra_characontainer._id: // into extra
              this.chara.extra_characontainer.listof_items.push(...this.chara.equipped_itemcontainer.listof_items.filter(e => e._id === swapdata.itemid));
              this.chara.equipped_itemcontainer.listof_items = this.chara.equipped_itemcontainer.listof_items.filter(e => e._id !== swapdata.itemid) as [Items];
              break;
          }

          break;
        case this.chara.inventory_container._id:
          switch (swapdata.newcontainer) { // from carried into...
            case this.chara.equipped_itemcontainer._id: // ...into inventory
              this.chara.equipped_itemcontainer.listof_items.push(...this.chara.inventory_container.listof_items.filter(e => e._id === swapdata.itemid));
              this.chara.inventory_container.listof_items = this.chara.inventory_container.listof_items.filter(e => e._id !== swapdata.itemid) as [Items];
              break;
            case this.chara.extra_characontainer._id: // ...into extra
              this.chara.extra_characontainer.listof_items.push(...this.chara.inventory_container.listof_items.filter(e => e._id === swapdata.itemid));
              this.chara.inventory_container.listof_items = this.chara.inventory_container.listof_items.filter(e => e._id !== swapdata.itemid) as [Items];
              break;
          }

          break;
        case this.chara.extra_characontainer._id:
          switch (swapdata.newcontainer) { // from extra into...
            case this.chara.equipped_itemcontainer._id: // ...into inventory
              this.chara.equipped_itemcontainer.listof_items.push(...this.chara.extra_characontainer.listof_items.filter(e => e._id === swapdata.itemid));
              this.chara.extra_characontainer.listof_items = this.chara.extra_characontainer.listof_items.filter(e => e._id !== swapdata.itemid) as [Items];
              break;
            case this.chara.inventory_container._id: // ...into carried
              this.chara.inventory_container.listof_items.push(...this.chara.extra_characontainer.listof_items.filter(e => e._id === swapdata.itemid));
              this.chara.extra_characontainer.listof_items = this.chara.extra_characontainer.listof_items.filter(e => e._id !== swapdata.itemid) as [Items];
              break;
          }
          break;
      }
      // update item attack and save lists
      this.items = this.chara.equipped_itemcontainer.listof_items;
      // this.spells = this.chara.listof_spelllists.listof_spells;

      // load attacks and saves
      this.itemattacks.length = 0;
      this.itemsaves.length = 0;
      this.items.forEach(element => {
        this.itemattacks.push(...element.listof_attacks); // use iterator notation to keep a single array
        this.itemsaves.push(...element.listof_savingthrows);
      });

    }));

    this.subscriptions.add(this.charaservice.listenfor('Created_new_feature').subscribe(data => {
      this.features.push(data as Features);
      console.log('heard creatednewfeature');
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_feature').subscribe(data => {
      const newdata = data as Features;
      const featureIndex = this.features.findIndex(e => e._id === newdata._id);
      // this.features[featureIndex] = data as Features; <-- does not return listof_ subdocs
      // either filter and substitute new, replace and substitute old, or make more calls to populate and replace
      // this.charaservice.sendback('Get_all_attacks', newdata.listof_attacks);
      // this.charaservice.sendback('Get_all_saves', newdata.listof_saves);
      this.features[featureIndex].descript = newdata.descript;
      this.features[featureIndex].selected_color = newdata.selected_color;
      this.features[featureIndex].title = newdata.title;
      this.features[featureIndex].toggleable = newdata.toggleable;
      this.features[featureIndex].uses = newdata.uses;
      this.features[featureIndex].uses_left = newdata.uses_left;
    }));
    // listenfor('Read_all_attacks') and replace
    // listenfor('Read_all_saves') and replace

    this.subscriptions.add(this.charaservice.listenfor('Deleted_one_feature').subscribe(data => {
      // data is a featureid
      const delIndex = this.features.findIndex(e => e._id === data);

      // remove all attacks and saves belonging to that feature
      this.features[delIndex].listof_atks.forEach(element => {
        this.varForIdToFilter = element._id; // catch this id in the filter
        this.featureattacks = this.featureattacks.filter(attack => attack._id !== this.varForIdToFilter);
      });
      this.features[delIndex].listof_saves.forEach(element => {
        this.varForIdToFilter = element._id; // catch this id in the filter
        this.featuresaves = this.featuresaves.filter(save => save._id !== this.varForIdToFilter); // filter lets anything that returns true go through
      });
      // remove from local list
      this.features.splice(delIndex, 1);
    }));
    this.subscriptions.add(this.charaservice.listenfor('Deleted_one_item').subscribe(data => {
      // data is an itemid
      const delIndex = this.items.findIndex(e => e._id === data);

      // remove all attacks and saves belonging to that feature
      this.items[delIndex].listof_attacks.forEach(element => {
        this.varForIdToFilter = element._id; // catch this id in the filter
        this.itemattacks = this.itemattacks.filter(attack => attack._id !== this.varForIdToFilter);
      });
      this.items[delIndex].listof_savingthrows.forEach(element => {
        this.varForIdToFilter = element._id; // catch this id in the filter
        this.itemsaves = this.itemsaves.filter(save => save._id !== this.varForIdToFilter); // filter lets anything that returns true go through
      });
      // remove from local list
      this.items.splice(delIndex, 1);
    }));

    // deleted one spell

    this.subscriptions.add(this.charaservice.listenfor('Created_new_attack').subscribe(data => {
      // data is a new attack
      // look for item parent, oof.
      const newattack = data as Attack;
      if (newattack.parentFeature !== undefined) {
        this.featureattacks.push(newattack);
        return;
      }
      console.log('itemattackfilter...'); // UNTESTED
      // modify logic to account for new spell attacks
      const filteredattacks = this.items.filter(e => e._id === newattack.parentItem);
      if (filteredattacks.length === 1) {
        console.log('itemattackfilter success');
        this.itemattacks.push(newattack);
      }
      // look through spellattacks list or do we separate all 3
    }));
    this.subscriptions.add(this.charaservice.listenfor('Created_new_save').subscribe(data => {
      // data is a new save
      // look for item parent, oof.
      const newsave = data as Savethrows;
      if (newsave.parentFeature !== undefined) {
        this.featuresaves.push(newsave);
        return;
      }
      console.log('itemsavefilter...'); // UNTESTED
      // modify logic to account for new spell saves
      const filteredsaves = this.items.filter(e => e._id === newsave.parentItem);
      if (filteredsaves.length === 1) {
        console.log('itemsavefilter success');
        this.itemsaves.push(newsave);
      }
      // look through spellattacks list or do we separate all 3
    }));
    // made new item attack ?
    // made new item save ?
    // made new spell attack ?
    // made new spell save ?


    // look for the id in both item and features, rip. if its an item it may not even be in the equipped container (ie: we dont care anyways)
    this.subscriptions.add(this.charaservice.listenfor('Updated_one_attack').subscribe(data => {
      // data is an attack
      const newattack = data as Attack;
      let attackIndex = this.itemattacks.findIndex(e => e._id === newattack._id);
      if (attackIndex !== -1) {
        // its in the itemattacks, wohoo!
        this.itemattacks[attackIndex] = newattack;
        return;
      }
      attackIndex = this.featureattacks.findIndex(e => e._id === newattack._id);
      if (attackIndex !== -1) {
        this.featureattacks[attackIndex] = newattack;
        return;
      }
      // spellattacks
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_save').subscribe(data => {
      // data is an attack
      const newsave = data as Savethrows;
      let saveIndex = this.itemsaves.findIndex(e => e._id === newsave._id);
      if (saveIndex !== -1) {
        // its in the itemattacks, wohoo!
        this.itemsaves[saveIndex] = newsave;
        return;
      }
      saveIndex = this.featuresaves.findIndex(e => e._id === newsave._id);
      if (saveIndex !== -1) {
        this.featuresaves[saveIndex] = newsave;
        return;
      }
      // spellsaves
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_item_attack').subscribe(data => {
      // data is the deleted attack
      // this.chara gets updated in tab-inventory. Remove from local lists only
      const deletedattack = data as Attack;
      const attackIndex = this.itemattacks.findIndex(e => e._id === deletedattack._id);
      if (attackIndex !== -1) { // was it in the inventory container?
        this.itemattacks.splice(attackIndex, 1);
        this.items = this.items.filter(item => item.listof_attacks.findIndex(attack => attack._id === deletedattack._id) !== -1);
      }
    }));
    this.subscriptions.add(this.charaservice.listenfor('Deleted_feature_attack').subscribe(data => {
      // data is the deleted attack
      const deletedattack = data as Attack;
      const attackIndex = this.featureattacks.findIndex(e => e._id === deletedattack._id);
      if (attackIndex !== -1) { // was it from an active feature? <-- UNIMPLEMENTED RIGHT NOW, ALWAYS TRUE
        this.featureattacks.splice(attackIndex, 1); // remove from sidebarattack list
        const featureIndex = this.features.findIndex(e => e._id === deletedattack.parentFeature); // remove child from the feature in featurelist
        // console.log('pre filter: ', this.features[featureIndex].listof_atks);
        this.features[featureIndex].listof_atks = this.features[featureIndex].listof_atks.filter(e => e._id !== deletedattack._id) as [Attack];
        // console.log('post filter: ', this.features[featureIndex].listof_atks);
      }
    }));
    this.subscriptions.add(this.charaservice.listenfor('Deleted_spell_attack').subscribe(data => {
      // data is the deleted attack
      const deletedattack = data as Attack;
      const attackIndex = this.spellattacks.findIndex(e => e._id === deletedattack._id);
      if (attackIndex !== -1) { // was it a prepared spell? <-- UNIMPLEMENTED RIGHT NOW, ALWAYS TRUE
        this.spellattacks.splice(attackIndex, 1);
        // update the relevant parentspell to remove the attackid since it no longer exists
      }
    }));


    this.subscriptions.add(this.charaservice.listenfor('Deleted_item_save').subscribe(data => {
      // data is the deleted save
      const deletedsave = data as Savethrows;
      const saveIndex = this.itemsaves.findIndex(e => e._id === deletedsave._id);
      if (saveIndex !== -1) { // was it in the inventory container?
        this.itemsaves.splice(saveIndex, 1);
        this.items = this.items.filter(item => item.listof_savingthrows.findIndex(save => save._id === deletedsave._id) !== -1);
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_feature_save').subscribe(data => {
      // data is the deleted save
      const deletedsave = data as Savethrows;
      const saveIndex = this.featuresaves.findIndex(e => e._id === deletedsave._id);
      if (saveIndex !== -1) { // was it from an active feature? <-- UNIMPLEMENTED RIGHT NOW, ALWAYS TRUE
        this.featuresaves.splice(saveIndex, 1); // remove from sidebarattack list
        const featureIndex = this.features.findIndex(e => e._id === deletedsave.parentFeature); // remove child from the feature in featurelist
        this.features[featureIndex].listof_saves = this.features[featureIndex].listof_saves.filter(e => e._id !== deletedsave._id) as [Savethrows];
      }
    }));
    // this.subscriptions.add(this.charaservice.listenfor('Deleted_spell_save').subscribe(data => {
    //   // data is the deleted attack
    //   const deletedsave = data as Savethrows;
    //   const attackIndex = this.spellattacks.findIndex(e => e._id === deletedsave._id);
    //   if (attackIndex !== -1) { // was it a prepared spell? <-- UNIMPLEMENTED RIGHT NOW, ALWAYS TRUE
    //     this.spellattacks.splice(attackIndex, 1);
    //     // update the relevant parentspell to remove the attackid since it no longer exists
    //   }
    // }));
    // deleted feature save
    // deleted item save
    // deleted spell save



  }
}
