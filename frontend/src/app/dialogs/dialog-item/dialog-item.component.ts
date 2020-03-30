import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import { Chara } from 'src/app/shared/chara.model';
import { Subscription } from 'rxjs';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { Items } from 'src/app/shared/items.model';
import { Containers } from 'src/app/shared/containers.model';
import { DialogAttackComponent } from '../dialog-attack/dialog-attack.component';
import { DialogSavingthrowComponent } from '../dialog-savingthrow/dialog-savingthrow.component';
import { Attack } from 'src/app/shared/attack.model';
import { Savethrows } from 'src/app/shared/savethrows.model';

@Component({
  selector: 'app-dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.scss']
})
export class DialogItemComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogItemComponent>,
              private subDialog: MatDialog,
              private modPipe: ModifierPipe) {
                this.thisItem = data.item as Items;
                this.chara = data.chara as Chara;
                this.whichContainer = data.container;
                this.inventory = this.chara.equipped_itemcontainer;
                this.carried = this.chara.inventory_container;
                this.extra = this.chara.extra_characontainer;
               }

    thisItem: Items;
    whichContainer: string;
    inventory: Containers;
    carried: Containers;
    extra: Containers;
    // inventoryItems: Items[];
    // carriedItems: Items[];
    // extraItems: Items[];

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

      this.inventory = this.chara.equipped_itemcontainer;
      this.carried = this.chara.inventory_container;
      this.extra = this.chara.extra_characontainer;

    }));
    // updated_one_item gets handled in the inventory-tab
    // deleted_one_item same thing but also if deleted, close this dialog

    /// THESE ARE HANDLED IN INVENTORY-TAB
    // this.subscriptions.add(this.charaservice.listenfor('Created_new_attack').subscribe(data => {
    // this.subscriptions.add(this.charaservice.listenfor('Created_new_save').subscribe(data => {

  }


  // logic for setting up the swap, and asking the backend to swap
  sendItemMoveUpdate() {
    let fromContainer;

    const data = {
      charaid: this.charaservice.CharaId,
      itemid: this.thisItem._id,
      newcontainer: undefined,
      oldcontainer: undefined
    };

    // pre local move to determine origin
    let itemIndex = this.inventory.listof_items.findIndex(e => e._id === this.thisItem._id);
    while (true) { // dangerous!
      if (itemIndex > -1) {
        fromContainer = 'fromInventory';
        data.oldcontainer = this.inventory;
        break;
      }
      itemIndex = this.carried.listof_items.findIndex(e => e._id === this.thisItem._id);
      if (itemIndex > -1) {
        fromContainer = 'fromCarried';
        data.oldcontainer = this.carried;
        break;
      }
      itemIndex = this.extra.listof_items.findIndex(e => e._id === this.thisItem._id);
      if (itemIndex > -1) {
        fromContainer = 'fromExtra';
        data.oldcontainer = this.extra;
        break;
      }
      console.log('all 3 pre-move checks: mission failed! We\'ll get em next time');
      return;
    }
    // console.log('from: ', fromContainer);
    // console.log('to: ', this.whichContainer);
    // console.log('pre swap');
    // console.log(this.chara.equipped_itemcontainer, this.chara.inventory_container, this.chara.extra_characontainer);
    // move
    switch (this.whichContainer) { // move to
      case 'inventory':
        data.newcontainer = this.inventory;
        switch (fromContainer) { // from
          case 'fromCarried':
            this.chara.inventory_container.listof_items.splice(itemIndex, 1);
            this.chara.equipped_itemcontainer.listof_items.push(this.thisItem);
            break;
          case 'fromExtra':
            this.chara.extra_characontainer.listof_items.splice(itemIndex, 1);
            this.chara.equipped_itemcontainer.listof_items.push(this.thisItem);
            break;
            }
        break; // endof.into inventory
      case 'carried':
        data.newcontainer = this.carried;
        switch (fromContainer) { // from
          case 'fromInventory':
            this.chara.equipped_itemcontainer.listof_items.splice(itemIndex, 1);
            this.chara.inventory_container.listof_items.push(this.thisItem);
            break;
          case 'fromExtra':
            this.chara.extra_characontainer.listof_items.splice(itemIndex, 1);
            this.chara.inventory_container.listof_items.push(this.thisItem);
            break;
            }
        break; // endof.into carried
      case 'extra':
        data.newcontainer = this.extra;
        switch (fromContainer) { // from
          case 'fromInventory':
            this.chara.equipped_itemcontainer.listof_items.splice(itemIndex, 1);
            this.chara.extra_characontainer.listof_items.push(this.thisItem);
            break;
          case 'fromCarried':
            this.chara.inventory_container.listof_items.splice(itemIndex, 1);
            this.chara.extra_characontainer.listof_items.push(this.thisItem);
            break;
            }
        break; // endof.into extra
    }
    // console.log('post swap');
    // console.log(this.chara.equipped_itemcontainer, this.chara.inventory_container, this.chara.extra_characontainer);
    // return;
    this.charaservice.sendback('Update_selected_container', data);
  }

  sendItemDialogUpdate() {
    const itemAndUserId = {
      charaid: this.charaservice.CharaId,
      item: this.thisItem
    };
    this.charaservice.sendback('Update_selected_item', itemAndUserId);
  }

  newAttack() {
    const forwardingdata = {
      item_id: this.thisItem._id,
      chara_id: this.charaservice.CharaId
    };
    this.charaservice.sendback('Make_new_attack', forwardingdata);
  }

  newSave() {
    const forwardingdata = {
      item_id: this.thisItem._id,
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
