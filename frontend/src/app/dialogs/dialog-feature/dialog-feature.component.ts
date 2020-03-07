import { Component, OnInit, Inject } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { Features } from 'src/app/shared/features.model';

@Component({
  selector: 'app-dialog-feature',
  templateUrl: './dialog-feature.component.html',
  styleUrls: ['./dialog-feature.component.css']
})
export class DialogFeatureComponent implements OnInit {

  constructor(private charaservice: CharaService ) { }


  ngOnInit() {

  }

  onFeatureSubmit() {

  }

}
