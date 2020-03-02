import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogNewcharaComponent } from '../dialogs/dialog-newchara/dialog-newchara.component';
import { SecretSocketComponent } from '../secret-socket/secret-socket.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dialog: MatDialog) { }

  public cardcontent = 'feature desription and stuff goes in here';
  public cardtitle = 'sample_featurecard';

  openDialog() {
    // open accepts 2 params
    // component, optional_configuration
    this.dialog.open(DialogNewcharaComponent);
  }


  pullallusercharacters() {
    SecretSocketComponent.getUserCharacters();
  }



}


/// TODO:
// make a button that makes a sample character with at least one of everything in the database
// use ngOnChanges to update view when properties change
// or just stick to two-way binding
