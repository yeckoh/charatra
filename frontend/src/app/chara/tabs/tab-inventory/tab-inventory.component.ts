import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Containers } from 'src/app/shared/containers.model';
import { Items } from 'src/app/shared/items.model';
import { Chara } from 'src/app/shared/chara.model';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { DialogItemComponent } from 'src/app/dialogs/dialog-item/dialog-item.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Attack } from 'src/app/shared/attack.model';
import { Savethrows } from 'src/app/shared/savethrows.model';
import { ArmorMod } from 'src/app/shared/armor-mod.model';

@Component({
  selector: 'app-tab-inventory',
  templateUrl: './tab-inventory.component.html',
  styleUrls: ['./tab-inventory.component.css']
})

export class TabInventoryComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              private matDialog: MatDialog) { }

  private chara: Chara = new Chara();
  // tslint:disable: variable-name
  // tslint:disable: max-line-length
  private listof_equipmentitems = [] as Items[];
  private listof_inventoryitems = [] as Items[];
  private listof_extraitems = [] as Items[];

  private netWorth = 0;
  private totalWeight = 0;

  private subscriptions: Subscription;

  private updateWeightAndNetWorth = function() {
      this.totalWeight = 0;
      this.netWorth = 0;
      this.listof_equipmentitems.forEach(item => {
        this.netWorth += item.value * item.count;
        this.totalWeight += item.weight * item.count;
      });
      this.listof_inventoryitems.forEach(item => {
        this.netWorth += item.value * item.count;
        this.totalWeight += item.weight * item.count;
      });
    };

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
      this.chara = data as Chara;
      this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items as Items[];
      this.listof_inventoryitems = this.chara.inventory_container.listof_items as Items[];
      this.listof_extraitems = this.chara.extra_characontainer.listof_items as Items[];

      this.totalWeight = 0;
      this.netWorth = 0;

      if (this.listof_equipmentitems === undefined) {
        this.listof_equipmentitems = [] as Items[];
      }
      if (this.listof_inventoryitems === undefined) {
        this.listof_inventoryitems = [] as Items[];
      }
      if (this.listof_extraitems === undefined) {
        this.listof_extraitems = [] as Items[];
      }

      this.listof_equipmentitems.forEach(element => { // tally equipment values
        this.totalWeight += element.weight * element.count;
        this.netWorth += element.value * element.count;
      });
      this.listof_inventoryitems.forEach(element => { // tally inventory values
        this.totalWeight += element.weight * element.count;
        this.netWorth += element.value * element.count;
      });
      console.log(data);
    })); // endof listenfor updatedonechara


    this.subscriptions.add(this.charaservice.listenfor('Created_new_item').subscribe(data => {
      // always go into inventory
      const newitem = data as Items;
      this.chara.inventory_container.listof_items.push(newitem);
      // TODO
      // add newitemid to container.ids?
      this.updateWeightAndNetWorth();
    }));

    // the item wasn't moved, we just updated it's properties
    this.subscriptions.add(this.charaservice.listenfor('Updated_one_item').subscribe(data => {
      const updateditem = data as Items;
      let itemIndex = this.listof_equipmentitems.findIndex(e => e._id === updateditem._id); // EQUIPMENT LIST
      if (itemIndex !== -1) {
        this.netWorth -= this.listof_equipmentitems[itemIndex].value * this.listof_equipmentitems[itemIndex].count;
        this.totalWeight -= this.listof_equipmentitems[itemIndex].weight * this.listof_equipmentitems[itemIndex].count; // subtract old from weight
        this.chara.equipped_itemcontainer.listof_items[itemIndex].applyarmor = updateditem.applyarmor;
        this.chara.equipped_itemcontainer.listof_items[itemIndex].attunement = updateditem.attunement;
        this.chara.equipped_itemcontainer.listof_items[itemIndex].count = updateditem.count;
        this.chara.equipped_itemcontainer.listof_items[itemIndex].descript = updateditem.descript;
        this.chara.equipped_itemcontainer.listof_items[itemIndex].name = updateditem.name;
        this.chara.equipped_itemcontainer.listof_items[itemIndex].value = updateditem.value;
        this.chara.equipped_itemcontainer.listof_items[itemIndex].weight = updateditem.weight;
        this.netWorth += updateditem.value * updateditem.count; // add new to networth
        this.totalWeight += updateditem.weight * updateditem.count; // add new to weight
        this.listof_equipmentitems[itemIndex] = this.chara.equipped_itemcontainer.listof_items[itemIndex]; // replace old item with new item

        this.updateWeightAndNetWorth();

        return;
      }
      itemIndex = this.listof_inventoryitems.findIndex(e => e._id === updateditem._id); // INVENTORY LIST
      if (itemIndex !== -1) {
        this.netWorth -= this.listof_inventoryitems[itemIndex].value * this.listof_inventoryitems[itemIndex].count; // subtract old from networth
        this.totalWeight -= this.listof_inventoryitems[itemIndex].weight * this.listof_inventoryitems[itemIndex].count; // subtract old from weight
        this.netWorth -= this.listof_inventoryitems[itemIndex].value * this.listof_inventoryitems[itemIndex].count;
        this.totalWeight -= this.listof_inventoryitems[itemIndex].weight * this.listof_inventoryitems[itemIndex].count; // subtract old from weight
        this.chara.inventory_container.listof_items[itemIndex].applyarmor = updateditem.applyarmor;
        this.chara.inventory_container.listof_items[itemIndex].attunement = updateditem.attunement;
        this.chara.inventory_container.listof_items[itemIndex].count = updateditem.count;
        this.chara.inventory_container.listof_items[itemIndex].descript = updateditem.descript;
        this.chara.inventory_container.listof_items[itemIndex].name = updateditem.name;
        this.chara.inventory_container.listof_items[itemIndex].value = updateditem.value;
        this.chara.inventory_container.listof_items[itemIndex].weight = updateditem.weight;
        this.netWorth += updateditem.value * updateditem.count; // add new to networth
        this.totalWeight += updateditem.weight * updateditem.count; // add new to weight
        this.listof_inventoryitems[itemIndex] = this.chara.inventory_container.listof_items[itemIndex]; // replace old item with new item

        this.updateWeightAndNetWorth();

        return;
      }
      itemIndex = this.listof_extraitems.findIndex(e => e._id === updateditem._id); // EXTRA LIST
      this.chara.extra_characontainer.listof_items[itemIndex].applyarmor = updateditem.applyarmor;
      this.chara.extra_characontainer.listof_items[itemIndex].attunement = updateditem.attunement;
      this.chara.extra_characontainer.listof_items[itemIndex].count = updateditem.count;
      this.chara.extra_characontainer.listof_items[itemIndex].descript = updateditem.descript;
      this.chara.extra_characontainer.listof_items[itemIndex].name = updateditem.name;
      this.chara.extra_characontainer.listof_items[itemIndex].value = updateditem.value;
      this.chara.extra_characontainer.listof_items[itemIndex].weight = updateditem.weight;
      this.listof_extraitems[itemIndex] = this.chara.extra_characontainer.listof_items[itemIndex];

      this.updateWeightAndNetWorth();

    }));


    this.subscriptions.add(this.charaservice.listenfor('Created_new_attack').subscribe(data => {
      const newattack = data as Attack;
      const parent = newattack.parentItem;
      if (parent === undefined) {
        return;
      }
      let itemIndex = this.chara.equipped_itemcontainer.listof_items.findIndex(e => e._id === parent);
      // check find parent item in equipped
      // tslint:disable: no-conditional-assignment
      if (itemIndex !== -1) {
        this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_attacks.push(newattack);
        return;
      }
      // check find parent item in inventory
      itemIndex = this.chara.inventory_container.listof_items.findIndex(e => e._id === parent);
      if (itemIndex !== -1) {
        this.chara.inventory_container.listof_items[itemIndex].listof_attacks.push(newattack);
        return;
      }
      // check find parent item in extra
      itemIndex = this.chara.extra_characontainer.listof_items.findIndex(e => e._id === parent);
      if (itemIndex !== -1) {
        this.chara.extra_characontainer.listof_items[itemIndex].listof_attacks.push(newattack);
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Created_new_save').subscribe(data => {
      const newsave = data as Savethrows;
      const parent = newsave.parentItem;
      if (parent === undefined) {
        return;
      }
      let itemIndex = this.chara.equipped_itemcontainer.listof_items.findIndex(e => e._id === parent);
      // check find parent item in equipped
      if (itemIndex !== -1) {
        this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_savingthrows.push(newsave);
        return;
      }
      // check find parent item in inventory
      itemIndex = this.chara.inventory_container.listof_items.findIndex(e => e._id === parent);
      if (itemIndex !== -1) {
        this.chara.inventory_container.listof_items[itemIndex].listof_savingthrows.push(newsave);
        return;
      }
      // check find parent item in extra
      itemIndex = this.chara.extra_characontainer.listof_items.findIndex(e => e._id === parent);
      if (itemIndex !== -1) {
        this.chara.extra_characontainer.listof_items[itemIndex].listof_savingthrows.push(newsave);
      }
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_attack').subscribe(data => {
      const newattack = data as Attack;
      if (newattack.parentItem === undefined) {
        return;
      }
      let itemIndex = this.listof_equipmentitems.findIndex(e => e._id === newattack.parentItem);
      let attackIndex;
      if (itemIndex !== -1) { // if in equipment container, replace the attack in the correct item
        attackIndex = this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_attacks.findIndex(e => e._id === newattack._id);
        this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_attacks[attackIndex] = newattack;
        this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items;
        return;
      }
      itemIndex = this.listof_inventoryitems.findIndex(e => e._id === newattack.parentItem);
      if (itemIndex !== -1) {
        attackIndex = this.chara.inventory_container.listof_items[itemIndex].listof_attacks.findIndex(e => e._id === newattack._id);
        this.chara.inventory_container.listof_items[itemIndex].listof_attacks[attackIndex] = newattack;
        this.listof_inventoryitems = this.chara.inventory_container.listof_items;
        return;
      }
      itemIndex = this.listof_extraitems.findIndex(e => e._id === newattack.parentItem);
      attackIndex = this.chara.extra_characontainer.listof_items[itemIndex].listof_attacks.findIndex(e => e._id === newattack._id);
      this.chara.extra_characontainer.listof_items[itemIndex].listof_attacks[attackIndex] = newattack;
      this.listof_extraitems = this.chara.extra_characontainer.listof_items;
      return;
    }));

    this.subscriptions.add(this.charaservice.listenfor('Updated_one_save').subscribe(data => {
      const newsave = data as Savethrows;
      if (newsave.parentItem === undefined) {
        return;
      }
      let itemIndex = this.listof_equipmentitems.findIndex(e => e._id === newsave.parentItem);
      let saveIndex;
      if (itemIndex !== -1) { // if in equipment container, replace the save in the correct item
        saveIndex = this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_savingthrows.findIndex(e => e._id === newsave._id);
        this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_savingthrows[saveIndex] = newsave;
        this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items;
        return;
      }
      itemIndex = this.listof_inventoryitems.findIndex(e => e._id === newsave.parentItem);
      if (itemIndex !== -1) {
        saveIndex = this.chara.inventory_container.listof_items[itemIndex].listof_savingthrows.findIndex(e => e._id === newsave._id);
        this.chara.inventory_container.listof_items[itemIndex].listof_savingthrows[saveIndex] = newsave;
        this.listof_inventoryitems = this.chara.inventory_container.listof_items;
        return;
      }
      itemIndex = this.listof_extraitems.findIndex(e => e._id === newsave.parentItem);
      saveIndex = this.chara.extra_characontainer.listof_items[itemIndex].listof_savingthrows.findIndex(e => e._id === newsave._id);
      this.chara.extra_characontainer.listof_items[itemIndex].listof_savingthrows[saveIndex] = newsave;
      this.listof_extraitems = this.chara.extra_characontainer.listof_items;
      return;
    }));

    // DELETED ITEM
    this.subscriptions.add(this.charaservice.listenfor('Deleted_one_item').subscribe(data => {
      // data is the itemid
      // do magic stuff here. Remove from local lists

      // features-tab will remove from this.chara for us, or will it?
      this.chara.equipped_itemcontainer.listof_items = this.chara.equipped_itemcontainer.listof_items.filter(i => i._id !== data) as [Items];
      this.chara.inventory_container.listof_items = this.chara.inventory_container.listof_items.filter(i => i._id !== data) as [Items];
      this.chara.extra_characontainer.listof_items = this.chara.extra_characontainer.listof_items.filter(i => i._id !== data) as [Items];

      this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items as Items[];
      this.listof_inventoryitems = this.chara.inventory_container.listof_items as Items[];
      this.listof_extraitems = this.chara.extra_characontainer.listof_items as Items[];

    }));

    // DELETED ITEM ATTACK
    this.subscriptions.add(this.charaservice.listenfor('Deleted_item_attack').subscribe(data => {
      const delattack = data as Attack;
      let itemIndex = this.chara.equipped_itemcontainer.listof_items.findIndex(e => e._id === delattack.parentItem);
      let attackIndex;
      if (itemIndex !== -1) {
        attackIndex = this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_attacks.findIndex(e => e._id === delattack._id);
        this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_attacks.splice(attackIndex, 1);
        this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items;
        return;
      }
      itemIndex = this.chara.inventory_container.listof_items.findIndex(e => e._id === delattack.parentItem);
      if (itemIndex !== -1) {
        attackIndex = this.chara.inventory_container.listof_items[itemIndex].listof_attacks.findIndex(e => e._id === delattack._id);
        this.chara.inventory_container.listof_items[itemIndex].listof_attacks.splice(attackIndex, 1);
        this.listof_inventoryitems = this.chara.inventory_container.listof_items;
        return;
      }
      itemIndex = this.chara.extra_characontainer.listof_items.findIndex(e => e._id === delattack.parentItem);
      attackIndex = this.chara.inventory_container.listof_items[itemIndex].listof_attacks.findIndex(e => e._id === delattack._id);
      this.chara.inventory_container.listof_items[itemIndex].listof_attacks.splice(attackIndex, 1);
      this.listof_extraitems = this.chara.extra_characontainer.listof_items;
      return;
    }));

    // DELETED ITEM SAVE
    this.subscriptions.add(this.charaservice.listenfor('Deleted_item_save').subscribe(data => {
      const delsave = data as Savethrows;
      let itemIndex = this.chara.equipped_itemcontainer.listof_items.findIndex(e => e._id === delsave.parentItem);
      let saveIndex;
      if (itemIndex !== -1) {
        saveIndex = this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_savingthrows.findIndex(e => e._id === delsave._id);
        this.chara.equipped_itemcontainer.listof_items[itemIndex].listof_savingthrows.splice(saveIndex, 1);
        this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items;
        return;
      }
      itemIndex = this.chara.inventory_container.listof_items.findIndex(e => e._id === delsave.parentItem);
      if (itemIndex !== -1) {
        saveIndex = this.chara.inventory_container.listof_items[itemIndex].listof_savingthrows.findIndex(e => e._id === delsave._id);
        this.chara.inventory_container.listof_items[itemIndex].listof_savingthrows.splice(saveIndex, 1);
        this.listof_inventoryitems = this.chara.inventory_container.listof_items;
        return;
      }
      itemIndex = this.chara.extra_characontainer.listof_items.findIndex(e => e._id === delsave.parentItem);
      saveIndex = this.chara.inventory_container.listof_items[itemIndex].listof_savingthrows.findIndex(e => e._id === delsave._id);
      this.chara.inventory_container.listof_items[itemIndex].listof_savingthrows.splice(saveIndex, 1);
      this.listof_extraitems = this.chara.extra_characontainer.listof_items;
      return;
    }));

    // MOVED ITEM BETWEEN CONTAINER
    this.subscriptions.add(this.charaservice.listenfor('Updated_one_container').subscribe(data => {
      // update local list only, chara.* gets updated in features-tab
      this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items;
      this.listof_inventoryitems = this.chara.inventory_container.listof_items;
      this.listof_extraitems = this.chara.extra_characontainer.listof_items;
      this.updateWeightAndNetWorth();
    }));

    // UPDATED ITEM ARMOR_MODIFIER
    this.subscriptions.add(this.charaservice.listenfor('Updated_selected_armormod').subscribe(data => {
      // data is armormod
      // update this.chara and local list
      const armormod = data as ArmorMod;
      let itemIndex = this.chara.equipped_itemcontainer.listof_items.findIndex(e => e._id === armormod.parentItem);
      if (itemIndex !== -1) {
        this.chara.equipped_itemcontainer.listof_items[itemIndex].armormod = armormod;
        this.listof_equipmentitems = this.chara.equipped_itemcontainer.listof_items;
        return;
      }
      itemIndex = this.chara.inventory_container.listof_items.findIndex(e => e._id === armormod.parentItem);
      if (itemIndex !== -1) {
        this.chara.inventory_container.listof_items[itemIndex].armormod = armormod;
        this.listof_inventoryitems = this.chara.inventory_container.listof_items;
        return;
      }
      itemIndex = this.chara.extra_characontainer.listof_items.findIndex(e => e._id === armormod.parentItem);
      this.chara.inventory_container.listof_items[itemIndex].armormod = armormod;
      this.listof_extraitems = this.chara.extra_characontainer.listof_items;
      return;
    }));

  } // endof.ngoninit

  openItemDialog(selected_item, container_name) {
    this.matDialog.open(DialogItemComponent, {data: {item: selected_item, container: container_name, chara: this.chara}});
  }

  makeNewItem() {
    // sendback
    const containerAndCharaid = {
      charaid: this.charaservice.CharaId,
      containerid: this.chara.inventory_container._id
    };
    this.charaservice.sendback('Make_new_item', containerAndCharaid);
  }



  // drop(event: CdkDragDrop<Items[]>) {
  //   moveItemInArray(this.listof_equipmentitems, event.previousIndex, event.currentIndex);
  // }



}
