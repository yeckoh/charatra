import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Features } from 'src/app/shared/features.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Chara } from 'src/app/shared/chara.model';
import { DialogAttackComponent } from 'src/app/dialogs/dialog-attack/dialog-attack.component';
import { Attack } from 'src/app/shared/attack.model';

@Component({
  selector: 'app-dialog-feature',
  templateUrl: './dialog-feature.component.html',
  styleUrls: ['./dialog-feature.component.css']
})
export class DialogFeatureComponent implements OnInit, OnDestroy {
  feature: Features;
  constructor(private charaservice: CharaService,
              @Inject(MAT_DIALOG_DATA) data,
              private thisDialog: MatDialogRef<DialogFeatureComponent>,
              private attackDialog: MatDialog) {
    this.feature = data;
  }

  // do not edit if infocus
  accentFocus = false;
  titleFocus = false;
  descriptFocus = false;

  private subscriptions = [];

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  ngOnInit() {
    this.subscriptions.push(this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
    // really we only need the stats for formula evaluation
      const allfeatures = (data as Chara).listof_charafeatures;
      const featureIndex = allfeatures.findIndex(e => e._id === this.feature._id);
      this.feature = allfeatures[featureIndex];
    }));

    /// TODO: TEST WITH SECOND MASHEEN
    this.subscriptions.push(this.charaservice.listenfor('Updated_one_feature').subscribe(data => {
      // listen for UPDATE_ONE event
      // console.log('only receiving a feature');
      const castedData = data as Features;
      if (this.accentFocus) {
        this.feature.selected_color = castedData.selected_color;
      }
      if (this.titleFocus) {
        this.feature.title = castedData.title;
      }
      if (this.descriptFocus) {
        this.feature.descript = castedData.descript;
      }
    }));

    this.subscriptions.push(this.charaservice.listenfor('Deleted_one_feature').subscribe(data => {
      // data is a featureid
      if (this.feature._id === data) { // the feature you're viewing got deleted
        this.thisDialog.close();
      }
    }));

    this.subscriptions.push(this.charaservice.listenfor('Created_new_attack').subscribe(data => {
      // data is a new attack
      const newattack = data as Attack;
      if (newattack.parentFeature === this.feature._id) {
        this.feature.listof_atks.push(newattack);
        return;
      }
    }));

    this.subscriptions.push(this.charaservice.listenfor('Updated_one_attack').subscribe(data => {
      // data is a new attack
      const newattack = data as Attack;
      if (newattack.parentFeature === this.feature._id) {
        const attackIndex = this.feature.listof_atks.findIndex(e => e._id === newattack.parentFeature);
        this.feature.listof_atks[attackIndex] = newattack;
        return;
      }
    }));
    this.subscriptions.push(this.charaservice.listenfor('Deleted_feature_attack').subscribe(data => {
      // data is the deleted attack
      const deletedattack = data as Attack;

      if (this.feature._id === deletedattack.parentFeature) {
        const attackIndex = this.feature.listof_atks.findIndex(e => e._id === deletedattack._id);
        this.feature.listof_atks.splice(attackIndex, 1);
      }
    }));

  }

  sendFeatureDialogUpdate() {
    const forwardingdata = {
      feature: this.feature,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Update_selected_feature', forwardingdata);
  }

  deleteFeature() {
    const forwardingdata = {
      featureid: this.feature._id,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Delete_selected_feature', forwardingdata);
    this.thisDialog.close();
  }

  newAttack() {
    const forwardingdata = {
      feature_id: this.feature._id,
      chara_id: this.charaservice.CharaId
    };
    this.charaservice.sendback('Make_new_attack', forwardingdata);
  }

  // tslint:disable: variable-name
  openAttackDialog(selected_attack) {
    this.attackDialog.open(DialogAttackComponent, {data: selected_attack});
  }


}
