import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Subscription } from 'rxjs';

import { DialogPersonaComponent } from 'src/app/dialogs/dialog-persona/dialog-persona.component';
import { DialogClassesComponent } from 'src/app/dialogs/dialog-classes/dialog-classes.component';
import { MatDialog } from '@angular/material';

import { Chara } from 'src/app/shared/chara.model';
import { Classes } from 'src/app/shared/classes.model';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit, OnDestroy {

  private chara: Chara = new Chara();

  private subscriptions: Subscription;

  constructor(private charaservice: CharaService,
              private personaDialog: MatDialog,
              private classesDialog: MatDialog) { }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      this.chara = data as Chara;
    }));

    // this.subscriptions.add(this.charaservice.listenfor('Updated_selected_class').subscribe(data => {
    //   this.chara.chara_class = data as Classes;
    // }));
  }

  openPersonaDialog(datafield) {
    this.personaDialog.open(DialogPersonaComponent, {data: {chara: this.chara, whichField: datafield}});
  }

  openPersonaClassesDialog() {
    this.classesDialog.open(DialogClassesComponent, {data: {chara: this.chara}});
  }
}
