import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';

@Component({
  selector: 'app-dialog-persona',
  templateUrl: './dialog-persona.component.html',
  styleUrls: ['./dialog-persona.component.scss']
})
export class DialogPersonaComponent implements OnInit {

  title: string;
  chara: Chara;
  public updata; // actual form input data which replaces the stat right before updating
  somethingWasEdited = false; // dont send an update if nothing changed

  constructor( @Inject(MAT_DIALOG_DATA) data,
               private charaservice: CharaService,
               private thisDialog: MatDialogRef<DialogPersonaComponent>) {
    this.chara = data.chara as Chara;
    this.title = data.whichField;
    switch (this.title) {
      case 'Name': this.updata = this.chara.persona.name; break;
      case 'Gender': this.updata = this.chara.persona.gender; break;
      case 'Description': this.updata = this.chara.persona.description; break;
      case 'Personality': this.updata = this.chara.persona.personality; break;
      case 'Ideals': this.updata = this.chara.persona.ideals; break;
      case 'Bonds': this.updata = this.chara.persona.bonds; break;
      case 'Race': this.updata = this.chara.persona.race; break;
      case 'Background': this.updata = this.chara.persona.background; break;
    }
  }

  updateParentPersonaComponent() {
    switch (this.title) {
      case 'Name': this.chara.persona.name = this.updata; break;
      case 'Gender': this.chara.persona.gender = this.updata; break;
      case 'Description': this.chara.persona.description = this.updata; break;
      case 'Personality': this.chara.persona.personality = this.updata; break;
      case 'Ideals': this.chara.persona.ideals = this.updata; break;
      case 'Bonds': this.chara.persona.bonds = this.updata; break;
      case 'Race': this.chara.persona.race = this.updata; break;
      case 'Background': this.chara.persona.background = this.updata; break;
    }
    this.somethingWasEdited = true;
  }

updateBackendChara() {
    if (!this.somethingWasEdited || this.chara._id === 'none') {
      return;
    }
    const userid = this.charaservice.UserRoom;
    const useridAndChara = {
      userid, // needed for user room. purpose: update sidebar for namechange
      chara: this.chara
    };
    this.charaservice.sendback('Update_selected_chara', useridAndChara);
  }

ngOnInit() { }

}
