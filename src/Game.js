import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const START_SCORES = {
          ones: undefined,
          twos: undefined,
          threes: undefined,
          fours: undefined,
          fives: undefined,
          sixes: undefined,
          threeOfKind: undefined,
          fourOfKind: undefined,
          fullHouse: undefined,
          smallStraight: undefined,
          largeStraight: undefined,
          yahtzee: undefined,
          chance: undefined
          }
const START_DICE = Array.from({ length: NUM_DICE }, x => Math.ceil(Math.random() * 6) );
const START_LOCK = Array(NUM_DICE).fill(false);

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: START_DICE,
      locked: START_LOCK,
      rollsLeft: NUM_ROLLS - 1,
      scores: START_SCORES
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    // if have no rolls left locks all dice
    // minus one from rolls left
    this.setState(st => ({
      dice: st.dice.map(
        (d, i) => st.locked[i] ? d : Math.ceil(Math.random() * 6)),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if(this.state.rollsLeft > 0){
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ],
      }))
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    // reset rolls left
    // unlock all dice
    // reroll
    if(this.state.scores[rulename] === undefined){
      this.setState(st => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
      }));
      this.roll();
    }
  }

  resetGame(){
    // if (game is over){
      this.setState({ dice: START_DICE,
                      locked: START_LOCK,
                      rollsLeft: NUM_ROLLS - 1,
                      scores: START_SCORES
                    })
    // }

  }

  render() {
    
    return (
      <section>
        { Object.values(this.state.scores).includes(undefined)
         ?
         <div>
          <Dice dice={this.state.dice} locked={this.state.locked} handleClick={this.toggleLocked} />
          <button
            className="Game-reroll"
            disabled={this.state.locked.every(x => x)}
            onClick={this.roll}>
            {this.state.rollsLeft} Rerolls Left
          </button> 
          </div>
          :
          <div>
            <div> GAME OVER!! </div>
            <button onClick={this.resetGame}> Restart the Game! </button>
          </div>
          }
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </section >
    );
  }
}

export default Game;