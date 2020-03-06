import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
// import { DialogNewcharaComponent } from '../dialogs/dialog-newchara/dialog-newchara.component';
import { DialogFeatureComponent } from '../../../dialogs/dialog-feature/dialog-feature.component';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { CharaService } from 'src/app/shared/chara.service';

@Component({
  selector: 'app-tab-feature',
  templateUrl: './tab-feature.component.html',
  styleUrls: ['./tab-feature.component.css']
})
export class TabFeatureComponent implements OnInit {
  constructor(private charaservice: CharaService,
              public dialog: MatDialog) { }

  BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  openFeatureDialog(featurename) {
    // open accepts 2 params (component, optional_configuration)
    this.dialog.open(DialogFeatureComponent, {data: this.charaservice});
    // let selecteddata = {feature1: this.charaservice.feature2, feature1descript: this.charaservice.feature2descript};
    // this.dialog.open(DialogFeatureComponent, {data: selecteddata});
  }

  // tslint:disable: one-line
  // tslint:disable: no-conditional-assignment
  regularFormula(input) {
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
          if (mutableInput = evaluate(input, this)) { } // simple formula; {} is implied

          else {mutableInput = input; } // evaluation failed but didnt throw an error
        }
      return mutableInput;
    } catch (error) {
      return 'NaN';
    }
  }




  /// load all charaservice atks and saves first then use these
  // atkresult() {
  //   this.attackBonus = this.regularFormula(this.input1);
  //   this.dmgresult();
  // }

  // dmgresult() {
  //   this.dmgformuoli = this.regularFormula(this.input2);
  // }











  ngOnInit() {
  }

}
