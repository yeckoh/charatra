/// defines the forms and stuff for chara
import { Component, OnInit} from '@angular/core';
import { CharaService } from '../shared/chara.service';

@Component({
  selector: 'app-chara',
  templateUrl: './chara.component.html',
  styleUrls: ['./chara.component.css']
})
export class CharaComponent implements OnInit {

  constructor(private charaservice: CharaService) { }

   ngOnInit() { } // end.of ngoninit

}
