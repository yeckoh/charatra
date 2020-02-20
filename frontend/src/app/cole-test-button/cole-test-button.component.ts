import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cole-test-button',
  templateUrl: './cole-test-button.component.html',
  styleUrls: ['./cole-test-button.component.css']
})
export class ColeTestButtonComponent implements OnInit {

  color;
  numOfButtons: number;
  counter;

  constructor() {
    this.color = 'primary';
    this.numOfButtons = 1;
    this.counter = Array;
  }

  ngOnInit() {

  }
  newButton() {
    this.numOfButtons++;
  }
}
