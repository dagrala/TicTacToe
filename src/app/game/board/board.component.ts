import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/game/state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private _values: string[][]; 

  constructor(private stateService: StateService) { 
    this._values = this.stateService.state.values;
  }

  ngOnInit() {
  }

}
