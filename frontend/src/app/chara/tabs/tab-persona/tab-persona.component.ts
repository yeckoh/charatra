import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Subscription } from 'rxjs';

import { DialogPersonaComponent } from 'src/app/dialogs/dialog-persona/dialog-persona.component';
import { DialogClassesComponent } from 'src/app/dialogs/dialog-classes/dialog-classes.component';
import { MatDialog } from '@angular/material';

import { Chara } from 'src/app/shared/chara.model';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit, OnDestroy {

  private chara: Chara = new Chara();

  private subscriptions: Subscription;

  constructor(private charaservice: CharaService, private personaDialog: MatDialog, private classesDialog: MatDialog) { }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      console.log(this.chara.persona);
      this.chara = data as Chara;
      console.log("s");
    }));

  }

  // The parameter is the "dataType" the communitcates what is being changed in the persona tab
  openPersonaDialog(personaDataType) {
    let refDialog = this.personaDialog.open(DialogPersonaComponent, {data: {inPersonaDataType: personaDataType, currentValue: this.chara}});
    console.log(personaDataType + " was clicked on.");
  }

  openPersonaClassesDialog(personaDataType) {
    let refDialog = this.classesDialog.open(DialogClassesComponent, {data: {inPersonaDataType: personaDataType, currentValue: this.chara}});
    console.log(personaDataType + " was clicked on.");
  }
}
