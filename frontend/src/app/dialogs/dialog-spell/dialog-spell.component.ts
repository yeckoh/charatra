import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CharaService } from 'src/app/shared/chara.service';
import { ModifierPipe } from 'src/app/pipes/modifier.pipe';
import { Chara } from 'src/app/shared/chara.model';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-spell',
  templateUrl: './dialog-spell.component.html',
  styleUrls: ['./dialog-spell.component.scss']
})
export class DialogSpellComponent implements OnInit, OnDestroy {

  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogSpellComponent>,
              private subDialog: MatDialog,
              private modPipe: ModifierPipe) {
      this.chara = data.chara as Chara;

      this.level = this.chara.chara_class.class_level;
      this.updateProf();
      this.str = this.chara.stats.str;
      this.dex = this.chara.stats.dex;
      this.con = this.chara.stats.con;
      this.int = this.chara.stats.int;
      this.wis = this.chara.stats.wis;
      this.cha = this.chara.stats.cha;
      this.strMod = this.modPipe.transform(this.str);
      this.dexMod = this.modPipe.transform(this.dex);
      this.conMod = this.modPipe.transform(this.con);
      this.intMod = this.modPipe.transform(this.int);
      this.wisMod = this.modPipe.transform(this.wis);
      this.chaMod = this.modPipe.transform(this.cha);
    }

    chara: Chara;
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
  }

  // tslint:disable: one-line
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
          mutableInput = input; }
      return mutableInput;
    } catch (error) {
      return 'NaN';
    }
  }

  ngOnInit() {
    this.subscriptions = (this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
      // really we only need the stats for formula evaluation
      this.chara = data as Chara;
      this.level = this.chara.chara_class.class_level;
      this.updateProf();
      this.str = this.chara.stats.str;
      this.dex = this.chara.stats.dex;
      this.con = this.chara.stats.con;
      this.int = this.chara.stats.int;
      this.wis = this.chara.stats.wis;
      this.cha = this.chara.stats.cha;
      this.strMod = this.modPipe.transform(this.str);
      this.dexMod = this.modPipe.transform(this.dex);
      this.conMod = this.modPipe.transform(this.con);
      this.intMod = this.modPipe.transform(this.int);
      this.wisMod = this.modPipe.transform(this.wis);
      this.chaMod = this.modPipe.transform(this.cha);
    }));
  }

}
