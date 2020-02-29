import { Component, OnInit } from '@angular/core';

import { CharaService } from '../../../shared/chara.service';


import { Router } from '@angular/router'; // router to redirect
import { FlashMessagesService } from 'angular2-flash-messages';
import { mixinColor } from '@angular/material';


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
  public color: 'p500';
  public classformat: 'mat-display-1 p500 boxshadow-4';

  constructor(private charaService: CharaService,
              private router: Router,
              private flashMsg: FlashMessagesService) { }


  /// TODO: clean up logic?
  ngOnInit() {
    // if (localStorage.getItem('id_token') == null) {
    //   this.flashMsg.show('You gotta be signed in to view chara123', { timeout: 3000});
    //   this.router.navigate(['signin']);
    //   return;
    // }

    // this.charaService.getCounter().subscribe(data => {
    //   let returndata = JSON.parse(data);
    //   console.log('returndata:');
    //   console.log(returndata);
    //   if (returndata == null) {
    //       console.log('getCounter returned nothing!; charaService.getCounter; no data');
    //       const newdata = {
    //         presses: 0,
    //         other_presses: 123
    //       };
    //       this.charaService.postadoc(newdata).subscribe((moredata) => {
    //         returndata = JSON.parse(moredata);
    //         this.id = returndata.button._id;
    //         this.presses = returndata.button.presses;
    //       }); // end.of if-null-returndata
    //   } else {
    //   this.id = returndata.button._id;
    //   this.presses = returndata.button.presses;
    // }
    // }); // end.of getcounter.subscribe
  } // end.of ngoninit


// /* increment */
//   public increment() {
//     const obj = {
//       _id: this.id,
//       presses: ++this.presses,
//       other_presses: this.presses + 10
//     };
//     this.charaService.pullPresses(obj).subscribe();
//   } // end.of increment


}
