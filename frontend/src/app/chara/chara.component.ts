/// defines the forms and stuff for chara
import { Component, OnInit, OnDestroy} from '@angular/core';
import { CharaService } from '../shared/chara.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-chara',
  templateUrl: './chara.component.html',
  styleUrls: ['./chara.component.css']
})
export class CharaComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              private router: Router,
              private alohaSnackBar: MatSnackBar) { }

  private subscriptions = [];

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

   ngOnInit() {
     this.charaservice.listenfor('Deleted_this_chara').subscribe(data => {
      this.alohaSnackBar.open('Someone deleted this character', 'okay',
        {duration: 2000, verticalPosition: 'top', panelClass: ['alohasnackbar']});
      this.router.navigate(['/home']);
     });
   } // end.of ngoninit

}
