import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Containers } from 'src/app/shared/containers.model';
import { Items } from 'src/app/shared/items.model';
import { Chara } from 'src/app/shared/chara.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tab-inventory',
  templateUrl: './tab-inventory.component.html',
  styleUrls: ['./tab-inventory.component.css']
})
export class TabInventoryComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              private matDialog: MatDialog) { }

  private equipment: Containers = new Containers();
  private inventory: Containers = new Containers();
  private extra: Containers = new Containers();
  // private listofcontainers = [] as Container[];

  // tslint:disable: variable-name
  // tslint:disable: max-line-length
  private listof_equipmentitems = [] as Items[];
  private listof_inventoryitems = [] as Items[];
  private listof_extraitems = [] as Items[];

  private netWorth = 0;
  private totalWeight = 0;

  private subscriptions = [];

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  ngOnInit() {
    this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
      const chara = data as Chara;
      this.equipment = chara.equipped_itemcontainer as Containers;
      this.inventory = chara.inventory_container as Containers;
      this.extra = chara.extra_characontainer as Containers;
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
    }); // endof listenfor updatedonechara


    /// TODO: figure out if we want 1 set of hooks for all 3 containers
    // these 3 pretty much only handle item moves
    // 2 should always get fired on-move. one to remove from their list, the other to add to their list
    this.charaservice.listenfor('Updated_equipment_container').subscribe(updatedcontainer => {

    });

    this.charaservice.listenfor('Updated_inventory_container').subscribe(updatedcontainer => {

    });

    this.charaservice.listenfor('Updated_extra_container').subscribe(updatedcontainer => {
      // if something was moved or taken from here, recalc value
    });

    this.charaservice.listenfor('Made_new_item').subscribe(data => {
      // always go into inventory
      const newitem = data as Items;
      this.listof_inventoryitems.push(newitem);
      this.inventory.listof_items.push(newitem);
    });


    // the item wasn't moved, we just updated it's properties
    this.charaservice.listenfor('Updated_one_item').subscribe(data => {
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
    });


  } // endof.ngoninit

}
