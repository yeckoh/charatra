import { Component, OnInit } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';

@Component({
  selector: 'app-tab-persona',
  templateUrl: './tab-persona.component.html',
  styleUrls: ['./tab-persona.component.css']
})
export class TabPersonaComponent implements OnInit {

  constructor(private charaservice: CharaService) { }

  ngOnInit() {
  }

}
