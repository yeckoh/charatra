import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogNewcharaComponent } from '../dialogs/dialog-newchara/dialog-newchara.component';
import { SecretSocketComponent } from '../secret-socket/secret-socket.component';
import evaluate, { registerFunction } from 'ts-expression-evaluator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  static reg: RegExp = /\{(.*?)\}/;

  public cardcontent = 'feature desription and stuff goes in here';
  public cardtitle = 'sample_featurecard';
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
    this.updateProf();
    this.atkresult();
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
    // open accepts 2 params
    // component, optional_configuration
    this.dialog.open(DialogNewcharaComponent);
  }

  regularFormula(input, output) {
    try {
      const inside = HomeComponent.reg.exec(input);
      if (inside != null) {
        inside[0] = input.replace(inside[0], '');
        output = inside[0] + evaluate(inside[1], this);
      } else {
        output = evaluate(input, this);
        if (output === undefined) { output = input; }
      }
    } catch (error) {
      output = 'NaN';
    // tslint:disable: no-unsafe-finally
    } finally { return output; }
  }

  atkresult() {
    this.attackBonus = this.regularFormula(this.input1, this.attackBonus);
    this.dmgresult();
  }
  dmgresult() {
    this.dmgformuoli = this.regularFormula(this.input2, this.dmgformuoli);
    if (this.dmgformuoli === 'NaN') { this.dmgformuoli = this.input2; }
  }

  pullallusercharacters() {
    SecretSocketComponent.getUserCharacters();
  }

}


/// TODO:
// use ngOnChanges or (input) or (change) to update view when properties change
// or just stick to two-way binding
