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
  public presses = 0;
  protected id: string;

  constructor(private charaService: CharaService ) { }


  /// TODO: clean up logic?
  ngOnInit() {
    this.charaService.getCounter().subscribe(data => {
      let returndata = JSON.parse(data);
      console.log(returndata);
      if (returndata == null) {
          console.log('the collection is empty; charaService.getCounter; no data');
          const newdata = {
            presses: 0,
            other_presses: 123
          };
          this.charaService.postadoc(newdata).subscribe((moredata) => {
            returndata = JSON.parse(moredata);
            this.id = returndata._id;
            this.presses = returndata.presses;
          });
      } else {
      this.id = returndata._id;
      this.presses = returndata.presses;
    }
    });
}

  /**
   * increment
   */
  public increment() {
    // this.presses++;

    const obj = {
      _id: this.id,
      presses: ++this.presses,
      other_presses: this.presses + 10
    };

    this.charaService.pullPresses(obj).subscribe();
    // this.charaService.getCounter();

  }







}
