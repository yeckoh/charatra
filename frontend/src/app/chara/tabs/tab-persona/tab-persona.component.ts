import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Subscription } from 'rxjs';

import { DialogPersonaComponent } from 'src/app/dialogs/dialog-persona/dialog-persona.component';
import { MatDialog } from '@angular/material';

import { Chara } from 'src/app/shared/chara.model';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit, OnDestroy {

  private chara: Chara = new Chara();

  private name;
  private gender;
  private description;
  private personality;
  private ideals;
  private bonds;
  private race;
  private background;

  private subscriptions: Subscription;

  constructor(private charaservice: CharaService, private personaDialog: MatDialog) { }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      this.chara = data as Chara;
      this.name = this.chara.persona.name;
      this.gender = this.chara.persona.gender;
      this.description = this.chara.persona.description;
      this.personality = this.chara.persona.personality;
      this.ideals = this.chara.persona.ideals;
      this.bonds = this.chara.persona.bonds;
      this.race = this.chara.persona.race;
      this.background = this.chara.persona.background;

      console.log('did a thing')
    }));
  }

  // The parameter is the "dataType" the communitcates what is being changed in the persona tab
  openPersonaDialog(personaDataType) {
    this.personaDialog.open(DialogPersonaComponent, {data: {inPersonaDataType: personaDataType}});
    console.log(personaDataType + " was clicked on.");
  }
}
