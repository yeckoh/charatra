import { Component, OnInit } from '@angular/core';
import { CharaService } from 'src/app/shared/chara.service';
import { SecretSocketComponent } from 'src/app/secret-socket/secret-socket.component';

@Component({
  selector: 'app-dialog-feature',
  templateUrl: './dialog-feature.component.html',
  styleUrls: ['./dialog-feature.component.css']
})
export class DialogFeatureComponent implements OnInit {

  constructor(private charaservice: CharaService ) { }


  ngOnInit() {

  }

  sendFeatureDialogUpdate() {
    console.log('dialog feature component senddialogfeatureupdate');
    SecretSocketComponent.sendFeatureSelectedUpdate(this.charaservice.FeatureSelected, this.charaservice.CharaId);
  }




}
