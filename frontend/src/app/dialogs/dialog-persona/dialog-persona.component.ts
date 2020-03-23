import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { Chara } from 'src/app/shared/chara.model';

@Component({
  selector: 'app-dialog-persona',
  templateUrl: './dialog-persona.component.html',
  styleUrls: ['./dialog-persona.component.css']
})
export class DialogPersonaComponent implements OnInit {

  title: string;
  textboxData: string;

  type: string;

  dataTemp: string;
  dataToReturn: Chara;

  constructor(@Inject(MAT_DIALOG_DATA) data, private charaservice: CharaService) {
    console.log(data.inPersonaDataType)
    this.title = data.inPersonaDataType;
    this.dataToReturn = data.currentValue;
    this.type = data.inPersonaDataType;
    if (data.inPersonaDataType == "Name") {this.textboxData = data.currentValue.persona.name;}
    else if(data.inPersonaDataType == "Gender") {this.textboxData = data.currentValue.persona.gender;}
    else if (data.inPersonaDataType == "Description") {this.textboxData = data.currentValue.persona.description;}
    else if (data.inPersonaDataType == "Personality") {this.textboxData = data.currentValue.persona.personality;}
    else if (data.inPersonaDataType == "Ideals") {this.textboxData = data.currentValue.persona.ideals;}
    else if (data.inPersonaDataType == "Bonds") {this.textboxData = data.currentValue.persona.bonds;}
    else if (data.inPersonaDataType == "Race") {this.textboxData = data.currentValue.persona.race;}
    else if (data.inPersonaDataType == "Backgrounds") {this.textboxData = data.currentValue.persona.background;}
  }

  sendPersonaUpdate() {

    if (this.type == "Name") {this.dataToReturn.persona.name = this.dataTemp;}
    else if(this.type == "Gender") {this.dataToReturn.persona.gender = this.dataTemp;}
    else if (this.type == "Description") {this.dataToReturn.persona.description = this.dataTemp;}
    else if (this.type == "Personality") {this.dataToReturn.persona.personality = this.dataTemp;}
    else if (this.type == "Ideals") {this.dataToReturn.persona.ideals = this.dataTemp;}
    else if (this.type == "Bonds") {this.dataToReturn.persona.bonds = this.dataTemp;}
    else if (this.type == "Race") {this.dataToReturn.persona.race = this.dataTemp;}
    else if (this.type == "Backgrounds") {this.dataToReturn.persona.background = this.dataTemp;}

    const userid = this.charaservice.UserRoom;
    const useridAndChara = {
      userid, // needed for user room. purpose: update sidebar for namechange
      chara: this.dataToReturn
    };
    this.charaservice.sendback('Update_selected_chara', useridAndChara);
  }

  ngOnInit() {
  }

}
