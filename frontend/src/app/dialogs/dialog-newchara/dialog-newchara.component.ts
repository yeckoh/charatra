import { Component, OnInit, Input } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';


@Component({
  selector: 'app-dialog-newchara',
  templateUrl: './dialog-newchara.component.html',
  styleUrls: ['./dialog-newchara.component.css']
})
export class DialogNewcharaComponent implements OnInit {

  constructor(private charaservice: CharaService) { }

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


  } // end.of onnewcharasubmit

}
