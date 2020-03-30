import { Component, OnInit } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-dialog-newchara',
  templateUrl: './dialog-newchara.component.html',
  styleUrls: ['./dialog-newchara.component.css']
})
export class DialogNewcharaComponent implements OnInit {

  constructor(private charaservice: CharaService,
              private thisDialog: MatDialogRef<DialogNewcharaComponent>,
              private alohaSnackBar: MatSnackBar) { }

  public cardtitle = 'nothing';
  public cardcontent = 'card content';


  charaname: string;
  gender: string;
  race: string;



  ngOnInit() {
  }

  onNewCharaSubmit() {
    if (this.charaname === undefined) {
      this.charaname = '';
    }
    if (this.gender === undefined) {
      this.gender = '';
    }
    if (this.race === undefined) {
      this.race = '';
    }

    const newChara = {
      userid: this.charaservice.UserRoom,
      name: this.charaname,
      gender: this.gender,
      race: this.race
    };

    this.charaservice.sendback('Make_new_chara', newChara);

    this.alohaSnackBar.open(this.charaname + ' has been created!', 'okay',
      {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});
    this.thisDialog.close();
  } // end.of onnewcharasubmit

}
