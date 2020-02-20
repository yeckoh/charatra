import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cole-test-button',
  templateUrl: './cole-test-button.component.html',
  styleUrls: ['./cole-test-button.component.css']
})
export class ColeTestButtonComponent implements OnInit {

  constructor() {
    this.color = "accent";
    this.numOfButtons = 1;
    this.counter = Array;
  }

  ngOnInit() {

  }
  newButton() {
    this.numOfButtons++;
  }
}
