import { Component, OnInit, Inject } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Features } from 'src/app/shared/features.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Chara } from 'src/app/shared/chara.model';

@Component({
  selector: 'app-dialog-feature',
  templateUrl: './dialog-feature.component.html',
  styleUrls: ['./dialog-feature.component.css']
})
export class DialogFeatureComponent implements OnInit {
  feature: Features;
  constructor(private charaservice: CharaService, @Inject(MAT_DIALOG_DATA) data) {
    this.feature = data;
  }

  // do not edit if infocus
  accentFocus = false;
  titleFocus = false;
  descriptFocus = false;

  ngOnInit() {
    this.charaservice.listenfor('Updated_one_chara').subscribe(data => {
    // really we only need the stats for formula evaluation
      const allfeatures = (data as Chara).listof_charafeatures;
      const featureIndex = allfeatures.findIndex(e => e._id === this.feature._id);
      this.feature = allfeatures[featureIndex];
    });

    /// TODO: TEST WITH SECOND MASHEEN
    this.charaservice.listenfor('Updated_one_feature').subscribe(data => {
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
    });
  }

  sendFeatureDialogUpdate() {
    const forwardingdata = {
      feature: this.feature,
      charaid: this.charaservice.CharaId
    };
    this.charaservice.sendback('Update_selected_feature', forwardingdata);
  }




}
