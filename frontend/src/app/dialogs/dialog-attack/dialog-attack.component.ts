import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Attack } from 'src/app/shared/attack.model';

@Component({
  selector: 'app-dialog-attack',
  templateUrl: './dialog-attack.component.html',
  styleUrls: ['./dialog-attack.component.scss']
})
export class DialogAttackComponent implements OnInit {
  private attack: Attack;

  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogAttackComponent>) {
                this.attack = data;
               }

  ngOnInit() {

    this.charaservice.listenfor('Updated_one_attack').subscribe(data => {
      // data is the updated attack
    });



    this.charaservice.listenfor('Deleted_feature_attack').subscribe(data => {
      // data is the deleted attack
      const deletedattack = data as Attack;
      if (this.attack._id === deletedattack._id) {
        this.thisDialog.close();
      }
    });
    this.charaservice.listenfor('Deleted_item_attack').subscribe(data => {
      // data is the deleted attack
      const deletedattack = data as Attack;
      if (this.attack._id === deletedattack._id) {
        this.thisDialog.close();
      }
    });
    this.charaservice.listenfor('Deleted_spell_attack').subscribe(data => {
      // data is the deleted attack
      const deletedattack = data as Attack;
      if (this.attack._id === deletedattack._id) {
        this.thisDialog.close();
      }
    });





  }



  updateAttack() {
    const forwardingdata = {
      attack: this.attack,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Update_selected_attack', forwardingdata);
  }

  // we should probably separate the dialogs for each of the 3: feature, item, spell
  deleteAttack() {
    console.log('dialog-attack-deletion called');
    const forwardingdata = {
      attackid: this.attack._id,
      charaid: this.charaservice.CharaId,
      parentid: undefined
    }
    if (this.attack.parentFeature !== undefined) {
      forwardingdata.parentid = this.attack.parentFeature;
      this.charaservice.sendback('Delete_feature_attack', forwardingdata);
      return;
    }
    if (this.attack.parentItem !== undefined) {
      forwardingdata.parentid = this.attack.parentItem;
      this.charaservice.sendback('Delete_item_attack', forwardingdata);
      return;
    }
    if (this.attack.parentSpell !== undefined) {
      forwardingdata.parentid = this.attack.parentSpell;
      this.charaservice.sendback('Delete_spell_attack', forwardingdata);
      return;
    }
  }








}
