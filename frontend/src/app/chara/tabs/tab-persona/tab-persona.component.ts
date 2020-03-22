import { Component, OnInit } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';

import { DialogPersonaComponent } from 'src/app/dialog-persona/dialog-persona.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit {

  constructor(private charaservice: CharaService, private personaDialog: MatDialog) { }

  ngOnInit() {
  }

  // The parameter is the "dataType" the communitcates what is being changed in the persona tab
  openPersonaDialog(personaDataType) {
    this.personaDialog.open(DialogPersonaComponent, {data: {inPersonaDataType: personaDataType}});
    console.log(personaDataType + " was clicked on.");
  }
}
