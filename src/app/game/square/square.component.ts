import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  @Input() row: number;
  @Input() column: number;

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  _handleSquareClick = () => {
    console.log(`Square click - row: ${this.row}, column: ${this.column}`);
    this.stateService.updateValue(this.row,this.column);
  }

}
