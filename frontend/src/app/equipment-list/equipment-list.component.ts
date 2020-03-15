import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  equipmentList : String[][] = [["GreatSword","10"], ["Health Vial", "3"], ["Recall Potion", "2"]]; 

  constructor() { }

  ngOnInit() {
  }

}
