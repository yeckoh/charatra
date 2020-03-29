import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';
import { Classes } from 'src/app/shared/classes.model';

@Component({
  selector: 'app-dialog-classes',
  templateUrl: './dialog-classes.component.html',
  styleUrls: ['./dialog-classes.component.scss']
})

export class DialogClassesComponent implements OnInit {

  chara: Chara;

  classLevel: number;
  classHitpoints: string;
  casterLevel: string;

  constructor(@Inject(MAT_DIALOG_DATA) data, private charaservice: CharaService) {
    this.chara = data.chara as Chara;
  }

  ngOnInit() {
  }

  // updateParentPersonaComponent() {
  // }

  sendPersonaClassUpdate() {
    const charaid = this.charaservice.CharaId;
    const charaidAndClass = {
      charaid,
      class: this.chara.chara_class
    };
    this.charaservice.sendback('Update_selected_class', charaidAndClass);
  }


}
