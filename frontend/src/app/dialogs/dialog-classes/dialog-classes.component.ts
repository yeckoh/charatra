import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';

@Component({
  selector: 'app-dialog-classes',
  templateUrl: './dialog-classes.component.html',
  styleUrls: ['./dialog-classes.component.scss']
})

export class DialogClassesComponent implements OnInit {

  title: string;
  dataToReturn: Chara

  classLevel: number;
  classHitpoints: string;
  casterLevel: string;

  constructor(@Inject(MAT_DIALOG_DATA) data, private charaservice: CharaService) {
    this.title = data.inPersonaDataType;
    this.dataToReturn = data.currentValue;
  }

  ngOnInit() {
  }

  sendPersonaClassUpdate() {
    this.dataToReturn.chara_class.class_level = this.classLevel;
    this.dataToReturn.chara_class.class_hitpoints = this.classHitpoints;
    this.dataToReturn.chara_class.caster_level = this.casterLevel;

    const userid = this.charaservice.UserRoom;
    const useridAndChara = {
      userid, // needed for user room. purpose: update sidebar for namechange
      chara: this.dataToReturn
    };
    this.charaservice.sendback('Update_selected_chara', useridAndChara);
  }


}
