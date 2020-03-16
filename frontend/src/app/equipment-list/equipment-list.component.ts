import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  @Input() equipmentList : String[];

  constructor() { }

  ngOnInit() {
  }

}
