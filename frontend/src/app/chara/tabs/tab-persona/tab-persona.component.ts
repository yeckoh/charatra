import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService) { }

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
  }

}
