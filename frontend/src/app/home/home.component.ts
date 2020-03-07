import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogNewcharaComponent } from '../dialogs/dialog-newchara/dialog-newchara.component';
import evaluate, { registerFunction } from 'ts-expression-evaluator';
import { CharaService } from '../shared/chara.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private charaservice: CharaService, public dialog: MatDialog) { }

  static BRACKET_EXPRESSION: RegExp = /\{(.*?)\}/g; // capture {*}    g is for global

  /// TODO: move this to singleton and update all functions which rely on accessing localStorage
  static loggedInUser; // currently unused
  // tslint:disable: member-ordering
  static getUser() { // currently unused
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
  }


  stranth = 16;
  stranthMod: number;
  charalevel = 1;
  proficiencyBonus: number;
  input1 = 'stranthMod+proficiencyBonus';
  input2 = 'd10 + {stranthMod}';

  attackBonus: string;
  dmgformuoli: string;

  ngOnInit() {
    this.updateStranth();
    this.updateProf(); // dupe dmgformula eval but w/e
    //// this.atkresult();
  }

  updateStranth() {
    this.stranthMod = Math.floor((this.stranth - 10) / 2);
    this.atkresult();
  }

  updateProf() {
    this.proficiencyBonus = 1 + Math.ceil(this.charalevel / 4);
    this.atkresult();
  }


  openDialog() {
    // open accepts 2 params (component, optional_configuration)
    this.dialog.open(DialogNewcharaComponent);
  }
  // tslint:disable: one-line
  // tslint:disable: no-conditional-assignment
  regularFormula(input) {
    let mutableInput = input;
    HomeComponent.BRACKET_EXPRESSION.lastIndex = 0;
    try {
      if (HomeComponent.BRACKET_EXPRESSION.test(input)) {
          let result;
          HomeComponent.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by test, now {0} is what was {1}
          while (result = HomeComponent.BRACKET_EXPRESSION.exec(mutableInput)) {
            mutableInput = mutableInput.replace(result[0], evaluate(result[1], this));
            HomeComponent.BRACKET_EXPRESSION.lastIndex = 0; // {0} is consumed by replace, now {0} is what was {1}
        }} else {
          if (mutableInput = evaluate(input, this)) { } // simple formula; {} is implied
          else {mutableInput = input; } // evaluation failed but didnt throw an error
        }
      return mutableInput;
    } catch (error) {
      return 'NaN';
    }
  }

  atkresult() {
    this.attackBonus = this.regularFormula(this.input1);
    this.dmgresult();
  }

  dmgresult() {
    this.dmgformuoli = this.regularFormula(this.input2);
  }


}
