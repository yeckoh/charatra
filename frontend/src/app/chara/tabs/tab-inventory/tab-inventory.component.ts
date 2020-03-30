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

@Component({
  selector: 'app-tab-inventory',
  templateUrl: './tab-inventory.component.html',
  styleUrls: ['./tab-inventory.component.css']
})
export class TabInventoryComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              private matDialog: MatDialog) { }

  private equipment: Containers = new Containers(); // UNNEEDED
  private inventory: Containers = new Containers();
  private extra: Containers = new Containers();
  // private listofcontainers = [] as Container[];

  private chara: Chara = new Chara();
  // tslint:disable: variable-name
  // tslint:disable: max-line-length
  private listof_equipmentitems = [] as Items[];
  private listof_inventoryitems = [] as Items[];
  private listof_extraitems = [] as Items[];

  private netWorth = 0;
  private totalWeight = 0;

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
      this.chara = data as Chara;
      this.equipment = this.chara.equipped_itemcontainer as Containers;
      this.inventory = this.chara.inventory_container as Containers;
      this.extra = this.chara.extra_characontainer as Containers;
      this.listof_equipmentitems = this.equipment.listof_items as Items[];
      this.listof_inventoryitems = this.inventory.listof_items as Items[];
      this.listof_extraitems = this.extra.listof_items as Items[];

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
      this.listof_inventoryitems.push(newitem);
      this.inventory.listof_items.push(newitem);
    }));

    // the item wasn't moved, we just updated it's properties
    this.subscriptions.add(this.charaservice.listenfor('Updated_one_item').subscribe(data => {
      const updateditem = data as Items; // gotta cast to use it
      let itemIndex = this.listof_equipmentitems.findIndex(e => e._id === updateditem._id); // EQUIPMENT LIST
      if (itemIndex !== -1) {
        this.netWorth -= this.listof_equipmentitems[itemIndex].value * this.listof_equipmentitems[itemIndex].count; // subtract old from networth
        this.netWorth += updateditem.value * updateditem.count; // add new to networth
        this.totalWeight -= this.listof_equipmentitems[itemIndex].weight * this.listof_equipmentitems[itemIndex].count; // subtract old from weight
        this.totalWeight += updateditem.weight * updateditem.count; // add new to weight
        this.listof_equipmentitems[itemIndex] = updateditem; // replace old item with new item
        return;
      }
      itemIndex = this.listof_inventoryitems.findIndex(e => e._id === updateditem._id); // INVENTORY LIST
      if (itemIndex !== -1) {
        this.netWorth -= this.listof_inventoryitems[itemIndex].value * this.listof_inventoryitems[itemIndex].count; // subtract old from networth
        this.netWorth += updateditem.value * updateditem.count; // add new to networth
        this.totalWeight -= this.listof_inventoryitems[itemIndex].weight * this.listof_inventoryitems[itemIndex].count; // subtract old from weight
        this.totalWeight += updateditem.weight * updateditem.count; // add new to weight
        this.listof_inventoryitems[itemIndex] = updateditem; // replace old item with new item
        return;
      }
      itemIndex = this.listof_extraitems.findIndex(e => e._id === updateditem._id); // EXTRA LIST
      this.listof_extraitems[itemIndex] = updateditem;
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
        // this.equipment = this.chara.equipped_itemcontainer;
        return;
      }
      // check find parent item in inventory
      itemIndex = this.chara.inventory_container.listof_items.findIndex(e => e._id === parent);
      if (itemIndex !== -1) {
        this.chara.inventory_container.listof_items[itemIndex].listof_attacks.push(newattack);
        // this.inventory = this.chara.inventory_container;
        return;
      }
      // check find parent item in inventory
      itemIndex = this.chara.extra_characontainer.listof_items.findIndex(e => e._id === parent);
      if (itemIndex !== -1) {
        this.chara.extra_characontainer.listof_items[itemIndex].listof_attacks.push(newattack);
        // this.extra = this.chara.extra_characontainer;
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
      // tslint:disable: no-conditional-assignment
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
      // check find parent item in inventory
      itemIndex = this.chara.extra_characontainer.listof_items.findIndex(e => e._id === parent);
      if (itemIndex !== -1) {
        this.chara.extra_characontainer.listof_items[itemIndex].listof_savingthrows.push(newsave);
      }
    }));

    // DELETED ITEM
    // DELETED ITEM ATTACK
    // DELETED ITEM SAVE



  } // endof.ngoninit


  openItemDialog(selected_item, container_name) {
    this.matDialog.open(DialogItemComponent, {data: {item: selected_item, container: container_name, chara: this.chara}});
  }


  drop(event: CdkDragDrop<Items[]>) {
    moveItemInArray(this.listof_equipmentitems, event.previousIndex, event.currentIndex);
  }



}



// openFeatureDialog(selected_feature) {
//   // this.features = selected_feature;
//   // open accepts 2 params (component, optional_configuration {data: something})
//   this.featureDialog.open(DialogFeatureComponent, {data: {selected_feature, chara: this.chara}});
// }
