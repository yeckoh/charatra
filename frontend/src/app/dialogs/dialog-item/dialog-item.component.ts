import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import { Chara } from 'src/app/shared/chara.model';
import { Subscription } from 'rxjs';
import evaluate, { registerFunction } from 'ts-expression-evaluator';

@Component({
  selector: 'app-dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.scss']
})
export class DialogItemComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogItemComponent>,
              private subDialog: MatDialog,
              private modPipe: ModifierPipe) { }

    // chara: Chara;
    // pulled straight
    private str = 0;
    private dex = 0;
    private con = 0;
    private int = 0;
    private wis = 0;
    private cha = 0;

    // calculated
    private strMod = 0;
    private dexMod = 0;
    private conMod = 0;
    private intMod = 0;
    private wisMod = 0;
    private chaMod = 0;

    private strDC = 0;
    private dexDC = 0;
    private conDC = 0;
    private intDC = 0;
    private wisDC = 0;
    private chaDC = 0;

    private profBonus = 0;
    private level = 0;

    BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateProf() {
    this.profBonus = 1 + Math.ceil(this.level / 4); // evaluate cant use math atm. funcs so rest in rip for now
  }  // tslint:disable: one-line
  // tslint:disable: no-conditional-assignment
  nonRegularFormula(input) {
    let mutableInput = input;
    this.BRACKET_EXPRESSION.lastIndex = 0;
    try {
      if (this.BRACKET_EXPRESSION.test(input)) {
          let result;
          this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by replace, now {0} is what was {1}
          while (result = this.BRACKET_EXPRESSION.exec(mutableInput)) {
            mutableInput = mutableInput.replace(result[0], evaluate(result[1], this));
            this.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by replace, now {0} is what was {1}
        }} else {
          // if (mutableInput = evaluate(input, this)) { } // simple formula; {} is implied
          mutableInput = input; }
        //   else {mutableInput = input; } // evaluation failed but didnt throw an error
        // }
      return mutableInput;
    } catch (error) {
      return 'NaN';
    }
  }

  ngOnInit() {

  }

}
