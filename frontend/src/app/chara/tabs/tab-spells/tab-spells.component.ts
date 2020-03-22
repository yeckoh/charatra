import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-spells',
  templateUrl: './tab-spells.component.html',
  styleUrls: ['./tab-spells.component.css']
})
export class TabSpellsComponent implements OnInit, OnDestroy {

  constructor() { }

  private subscriptions: Subscription;

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }

  ngOnInit() {
  }

}
