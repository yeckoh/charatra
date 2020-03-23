import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogNewcharaComponent } from '../dialogs/dialog-newchara/dialog-newchara.component';
// import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { CharaService } from '../shared/chara.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private charaservice: CharaService,
              public dialog: MatDialog) { }

  // tslint:disable: member-ordering
  // tslint:disable: one-line
  // tslint:disable: no-conditional-assignment

  ngOnInit() {
  }

  openDialog() {
    // open accepts 2 params (component, optional_configuration)
    this.dialog.open(DialogNewcharaComponent);
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
    // this.router.navigate(['/home']);
  }

}
