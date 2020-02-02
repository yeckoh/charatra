/// defines the forms and stuff for chara
import { Component, OnInit} from '@angular/core';

import { CharaService } from '../shared/chara.service';

@Component({
  selector: 'app-chara',
  templateUrl: './chara.component.html',
  styleUrls: ['./chara.component.css'],

  providers: [CharaService]
})
export class CharaComponent implements OnInit {

  public cardTitleName = 'hello world';
  public counter = 0;

  /**
   * increment
   */
  public increment() {
    this.counter++;
  }


  constructor(private charaService: CharaService ) { }

  ngOnInit() {
  }

}
