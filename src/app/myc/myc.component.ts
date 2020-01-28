import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myc',
  templateUrl: './myc.component.html',
  styleUrls: ['./myc.component.css']
})
export class MycComponent {

  public cardTitleName = 'hello world';
  public counter = 0;

  /**
   * increment
   */
  public increment(){
    this.counter++;
  }

}
