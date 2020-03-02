import { Component, OnInit, Input } from '@angular/core';
import { SecretSocketComponent } from 'src/app/secret-socket/secret-socket.component';


@Component({
  selector: 'app-dialog-newchara',
  templateUrl: './dialog-newchara.component.html',
  styleUrls: ['./dialog-newchara.component.css']
})
export class DialogNewcharaComponent implements OnInit {

  constructor() { }

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
      name: this.charaname,
      gender: this.gender,
      race: this.race
    };

    SecretSocketComponent.newCharacter(newChara);


  } // end.of onnewcharasubmit

}
