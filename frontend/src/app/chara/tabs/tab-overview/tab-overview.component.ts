import { Component, OnInit } from '@angular/core';

import { CharaService } from '../../../shared/chara.service';


@Component({
  selector: 'app-tab-overview',
  templateUrl: './tab-overview.component.html',
  styleUrls: ['./tab-overview.component.css'],

  providers: [CharaService]
})
export class TabOverviewComponent implements OnInit {

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
          }); // end.of if-returndata
      } else {
      this.id = returndata._id;
      this.presses = returndata.presses;
    }
    }); // end.of getcounter.subscribe
  } // end.of ngoninit


/* increment */
  public increment() {
    const obj = {
      _id: this.id,
      presses: ++this.presses,
      other_presses: this.presses + 10
    };
    this.charaService.pullPresses(obj).subscribe();
  } // end.of increment


}
