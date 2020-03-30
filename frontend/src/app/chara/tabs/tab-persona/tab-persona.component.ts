import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Subscription } from 'rxjs';

import { DialogPersonaComponent } from 'src/app/dialogs/dialog-persona/dialog-persona.component';
import { DialogClassesComponent } from 'src/app/dialogs/dialog-classes/dialog-classes.component';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Chara } from 'src/app/shared/chara.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit, OnDestroy {

  chara: Chara = new Chara();

  deleteConfirm = false;
  deleteConfirmName = '';

  constructor(private charaservice: CharaService,
              private personaDialog: MatDialog,
              private classesDialog: MatDialog,
              private router: Router,
              private alohaSnackBar: MatSnackBar) { }


  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe((data) => {
      this.chara = data as Chara;
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_one_chara').subscribe(data => {
      this.alohaSnackBar.open(this.chara.persona.name + ' has been deleted!', 'okay',
      {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});
      this.router.navigate(['/home']);
    }));
  }

  openPersonaDialog(datafield) {
    this.personaDialog.open(DialogPersonaComponent, {data: {chara: this.chara, whichField: datafield}});
  }

  openPersonaClassesDialog() {
    this.classesDialog.open(DialogClassesComponent, {data: {chara: this.chara}});
  }

  deleteCharacter() {
    // open dialog to make sure they absolutely want to delete
    // then move this logic into the dialog
    const userandcharaids = {
      userid: this.charaservice.UserRoom,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Delete_selected_chara', userandcharaids);

    // add listenfor into everywhere for 'deleted_chara'
  }
}
