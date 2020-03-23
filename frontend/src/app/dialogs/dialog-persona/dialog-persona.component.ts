import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { SecretSocketComponent } from 'src/app/secret-socket/secret-socket.component';

@Component({
  selector: 'app-dialog-persona',
  templateUrl: './dialog-persona.component.html',
  styleUrls: ['./dialog-persona.component.css']
})
export class DialogPersonaComponent implements OnInit {

  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.inPersonaDataType;
  }

  ngOnInit() {
  }

}
