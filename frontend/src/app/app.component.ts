import { Component } from '@angular/core';
import { CharaService } from './shared/chara.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CharaService]
})
export class AppComponent {
  title = 'material';
  constructor(private charaData: CharaService) { }
}
