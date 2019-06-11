import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() { 
    this._state$ = new BehaviorSubject({
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      movements: 0,
      winner: false
    });
  }

  get state$ (): BehaviorSubject<State> {
    return this._state$;
  };

  get state (): State {
    return this._state$.getValue();
  };

  set state (state: State) {
    this._state$.next(state);
  };
  
  updateValue = (row, col) =>{
    if(this.state.values[row][col] === '-'){
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      let winner = this._isWinnerMovement(row, col, newValue);
      this.state.values[row][col] = newValue;
      if(!winner){
        this.state.turn = newTurn;
      }
      this.state.movements = this.state.movements +1;
      this.state.winner = winner;
      this.state = this.state;
    }
  };

  reset = () => {
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      movements: 0,
      winner: false
    };
  };

  _isWinnerMovement = (row, col, symbol) => {
    return this._isHorizontalWin(row, col, symbol) ||
      this._isVerticalWin(row, col, symbol) ||
      this._isDiagonalWin(row, col, symbol);

  } 

  _isHorizontalWin = (row, col, symbol) => {
    if(col === 0){
      return this.state.values[row][1] === symbol && this.state.values[row][2] === symbol;
    } else if(col === 1){
      return this.state.values[row][0] === symbol && this.state.values[row][2] === symbol;
    } else {
      return this.state.values[row][0] === symbol && this.state.values[row][1] === symbol;
    }
  }

  _isVerticalWin = (row, col, symbol) => {
    if(row === 0){
      return this.state.values[1][col] === symbol && this.state.values[2][col] === symbol;
    } else if(col === 1){
      return this.state.values[0][col] === symbol && this.state.values[2][col] === symbol;
    } else {
      return this.state.values[0][col] === symbol && this.state.values[1][col] === symbol;
    }
  }

  _isDiagonalWin = (row, col, symbol) => {
    if(row === 0){
      if(col === 0){
       return this.state.values[1][1] === symbol && this.state.values[2][2] === symbol;
      } else if(col === 1){
        return false;
      } else {
        return this.state.values[1][1] === symbol && this.state.values[2][0] === symbol;
      }
    } else if(row === 1){
      if(col === 0){
        return false;
      } else if(col === 1){
        return (this.state.values[0][0] === symbol && this.state.values[2][2] === symbol) ||
          (this.state.values[0][2] === symbol && this.state.values[2][0] === symbol);
      } else {
        return false;
      }
    } else if(row === 2){
      if(col === 0){
        return this.state.values[1][1] === symbol && this.state.values[0][2] === symbol;
      } else if(col === 1){
        return false;
      } else {
        return this.state.values[1][1] === symbol && this.state.values[0][0] === symbol;
      }
    }
  }

}
