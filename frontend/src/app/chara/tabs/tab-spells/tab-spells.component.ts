import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tab-spells',
  templateUrl: './tab-spells.component.html',
  styleUrls: ['./tab-spells.component.css']
})
export class TabSpellsComponent implements OnInit, OnDestroy {

  constructor() { }

  private subscriptions = [];

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  ngOnInit() {
  }

}
