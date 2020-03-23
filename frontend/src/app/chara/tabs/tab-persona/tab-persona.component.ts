import { Component, OnInit } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';

import { DialogPersonaComponent } from 'src/app/dialog-persona/dialog-persona.component';
import { MatDialog } from '@angular/material';

import { Chara } from 'src/app/shared/chara.model';
import { CharaService } from 'src/app/shared/chara.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit {

  constructor(private charaservice: CharaService, private personaDialog: MatDialog) { }

  private name: string = this.charaservice.CharaSelected.persona.name;
  private gender: string = this.charaservice.CharaSelected.persona.gender;
  private description: string = this.charaservice.CharaSelected.persona.description;
  private personality: string = this.charaservice.CharaSelected.persona.personality;
  private ideals: string = this.charaservice.CharaSelected.persona.ideals;
  private bonds: string = this.charaservice.CharaSelected.persona.bonds;
  private race: string = this.charaservice.CharaSelected.persona.race;
  private background: string = this.charaservice.CharaSelected.persona.background;

  private subscriptions: Subscription;

  ngOnInit() {
  }

  // The parameter is the "dataType" the communitcates what is being changed in the persona tab
  openPersonaDialog(personaDataType) {
    this.personaDialog.open(DialogPersonaComponent, {data: {inPersonaDataType: personaDataType}});
    console.log(personaDataType + " was clicked on.");
  }
}
