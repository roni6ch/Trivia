import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import Timer from 'Timer';
import { Button , ButtonToolbar,ButtonGroup , DropdownButton , MenuItem} from 'react-bootstrap';

export default class GameMenuTypeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'Category',
      openStartGameButton:false 
    }
    this.startGame = this.startGame.bind(this);
  }
  
  gameTypeClick(e,type){
    this.setState({title: type, openStartGameButton:true});
    //pass to parent
    if (this.props.getType) {
      this.props.getType(type);
    }
    
  }
  startGame(){
    if (this.props.startGame) {
      this.props.startGame();
    }
  }
  
  render() {
    var disableButton = 'startOpen ';
    if (this.state.openStartGameButton == false)
    disableButton = 'disableButton';
    return  <div>
      <p className="title">Trivia Game - By Roni Chabra - ReactJS</p>
      <ButtonGroup justified>
        <div className='selectGame'>Please select a game category
          <br />You have only <span>{this.props.timer} </span>seconds to get  <span>{this.props.questionsSum}</span> questions.
            <br />
            {reactLocalStorage.get('record') > 0 ? ( <p>Your Score is:  <span> {reactLocalStorage.get('record', true)} </span> </p> ) : (<p></p>)}
            <br />  Good Luck! </div>
            <section className='questionsType'>
              
              <ButtonGroup>
                <Button   bsStyle="info" onClick={(e) => this.gameTypeClick(e,"general")}> General Questions</Button>
                <Button   bsStyle="info" onClick={(e) => this.gameTypeClick(e,"history")}>History Questions</Button>
                <Button   bsStyle="info" onClick={(e) => this.gameTypeClick(e,"proggraming")}>Proggraming Questions</Button>
              </ButtonGroup>
              
              <Button bsStyle="primary" bsSize="large" active onClick={this.startGame} className={'start ' + disableButton}>Start!</Button>
            </section>
          </ButtonGroup>
        </div>
      }
    } 
    