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

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.inPersonaDataType;
  }

  ngOnInit() {
  }



}
