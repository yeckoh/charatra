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

  atkresult() {
    try {
      const inside = HomeComponent.reg.exec(this.input1);

      if (inside != null) {
        // console.log(inside);
        inside[0] = this.input1.replace(inside[0], '');
        this.attackBonus = inside[0] + evaluate(inside[1], this);
      } else {
        this.attackBonus = evaluate(this.input1, this);
        if (this.attackBonus === undefined) {
          this.attackBonus = this.input1;
        }
      }
    } catch (error) {
      this.attackBonus = 'NaN';
    } finally {
      this.dmgresult();
    }
  }

  dmgresult() {
    try {
      const inside = HomeComponent.reg.exec(this.input2);
      if (inside != null) {
        // console.log(inside);
        inside[0] = this.input2.replace(inside[0], '');
        this.dmgformuoli = inside[0] + evaluate(inside[1], this);
      } else {
        this.dmgformuoli = evaluate(this.input2, this);
        if (this.dmgformuoli === undefined) {
          this.dmgformuoli = this.input2;
        }
      }
    } catch (error) {
      this.dmgformuoli = this.input2;
    }
  }

  pullallusercharacters() {
    SecretSocketComponent.getUserCharacters();
  }



}


/// TODO:
// make a button that makes a sample character with at least one of everything in the database
// use ngOnChanges to update view when properties change
// or just stick to two-way binding



/*
// this is the same as dmgformuoli. the intent is to provide users with a sense of satisfaction
// if they want to include something like: d4+{5d6}, they MUST use {}
  atkresult() {
    try {
      const inside = HomeComponent.reg.exec(this.input1);

      if (inside != null) {
        // console.log(inside);
        inside[0] = this.input1.replace(inside[0], '');
        this.attackBonus = inside[0] + evaluate(inside[1], this);
      } else {
        this.attackBonus = evaluate(this.input1, this);
        if (this.attackBonus === undefined) {
          this.attackBonus = this.input1;
        }
      }
    } catch (error) {
      this.attackBonus = 'NaN';
    } finally {
      this.dmgresult();
    }
  }
*/
