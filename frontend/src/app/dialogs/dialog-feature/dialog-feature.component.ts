import { Component, OnInit } from '@angular/core';
import { SecretSocketComponent } from 'src/app/secret-socket/secret-socket.component';

@Component({
  selector: 'app-dialog-feature',
  templateUrl: './dialog-feature.component.html',
  styleUrls: ['./dialog-feature.component.css']
})
export class DialogFeatureComponent implements OnInit {

  constructor() { }

  // tslint:disable: variable-name
  selected_color: string;
  feature_category: number; // user defined feature separation names

  title: string;
  descript: string;
  uses: number;
  uses_left: number;
  toggleable: boolean;
  is_enabled: boolean;
  listof_atks: [string];
  listof_saves: [string];
  listof_featureprofs: [string];

  ngOnInit() {
  }

  onFeatureSubmit() {

    const feature = {
      title: this.title,
      descript: this.descript,
      uses: this.uses,
      uses_left: this.uses_left,
      toggleable: this.toggleable,
      is_enabled: this.is_enabled,
      listof_atks: [this.listof_atks],
      listof_saves: [this.listof_saves],
      listof_featureprofs: [this.listof_featureprofs]
    };

    SecretSocketComponent.featureUpdate(feature);
  }

}
