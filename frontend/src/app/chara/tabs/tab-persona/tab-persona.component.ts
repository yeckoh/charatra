import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService) { }

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
