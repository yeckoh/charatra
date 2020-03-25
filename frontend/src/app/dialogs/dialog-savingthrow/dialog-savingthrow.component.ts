import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Savethrows } from 'src/app/shared/savethrows.model';
import { CharaService } from 'src/app/shared/chara.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-savingthrow',
  templateUrl: './dialog-savingthrow.component.html',
  styleUrls: ['./dialog-savingthrow.component.scss']
})
export class DialogSavingthrowComponent implements OnInit, OnDestroy {
  private save: Savethrows;

  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogSavingthrowComponent>) {
                this.save = data;
               }

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {

    this.subscriptions = (this.charaservice.listenfor('Updated_one_save').subscribe(data => {
      // data is the updated attack
    }));

    this.subscriptions.add(this.charaservice.listenfor('Deleted_feature_save').subscribe(data => {
      // data is the deleted attack
      const deletedsave = data as Savethrows;
      if (this.save._id === deletedsave._id) {
        this.thisDialog.close();
      }
    }));
    this.subscriptions.add(this.charaservice.listenfor('Deleted_item_save').subscribe(data => {
      // data is the deleted attack
      const deletedsave = data as Savethrows;
      if (this.save._id === deletedsave._id) {
        this.thisDialog.close();
      }
    }));
    this.subscriptions.add(this.charaservice.listenfor('Deleted_spell_save').subscribe(data => {
      // data is the deleted attack
      const deletedsave = data as Savethrows;
      if (this.save._id === deletedsave._id) {
        this.thisDialog.close();
      }
    }));
  }


  updateSave() {
    const forwardingdata = {
      save: this.save,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Update_selected_save', forwardingdata);
  }

  // we should probably separate the dialogs for each of the 3: feature, item, spell
  deleteSave() {
    console.log('dialog-save-deletion called');
    console.log(this.save);
    const forwardingdata = {
      saveid: this.save._id,
      charaid: this.charaservice.CharaId,
      parentid: undefined
    };
    if (this.save.parentFeature !== undefined) {
      console.log('delfeaturesave');
      forwardingdata.parentid = this.save.parentFeature;
      this.charaservice.sendback('Delete_feature_save', forwardingdata);
      return;
    }
    if (this.save.parentItem !== undefined) {
      console.log('delitemsave');
      forwardingdata.parentid = this.save.parentItem;
      this.charaservice.sendback('Delete_item_save', forwardingdata);
      return;
    }
    if (this.save.parentSpell !== undefined) {
      forwardingdata.parentid = this.save.parentSpell;
      this.charaservice.sendback('Delete_spell_save', forwardingdata);
      return;
    }
  }










}
