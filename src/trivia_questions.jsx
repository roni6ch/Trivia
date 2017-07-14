
import React from 'react';
import Fetch from 'react-fetch';
import {reactLocalStorage} from 'reactjs-localstorage';
import Timer  from './Timer';
import QuestionsByType  from './QuestionsByType';
import GameMenuTypeButtons  from './GameMenuTypeButtons';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-modal-bootstrap';

export default class LoadTriviaQuestions extends React.Component {
  constructor(props) {
    super(props);
    let record = 0;
    {/*Initialize local storage and members*/}
    if (reactLocalStorage.getObject('record') == undefined || reactLocalStorage.getObject('record') == null)
    reactLocalStorage.set('record', 0);
    this.state = {points:0,timer:45,minimumQuestions:9, isOpen:false,shouldHide:false,type:'',dynamicJson : [], newQuestionsArr:[]};
    
  }
  componentDidMount() {
    this.ReadJSON();
  }
  ReadJSON() {
    return  fetch('content/json/questions.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({dynamicJson: responseJson}, function (){
        console.log(this.state.dynamicJson);
      });
      console.log("json finish");
    })
    .catch((error) => {
      console.error(error);
    });
  }
  setType(type){
    this.setState({type: type}, function () {
      let objectTypeFromJson = this.state.dynamicJson[this.state.type];
      let randomKeysQuestionsArr = [];
      let newQuestionsArr = [];
      
      {/* selecet random question */}
      if (this.state.minimumQuestions <= objectTypeFromJson.length)
      for (var i = 0; i < this.state.minimumQuestions; i++) {
        let randomQuestion = Math.floor((Math.random() * objectTypeFromJson.length));
        if (randomKeysQuestionsArr.indexOf(randomQuestion) == -1){
          randomKeysQuestionsArr.push(randomQuestion);
          newQuestionsArr.push(objectTypeFromJson[randomQuestion]);
          this.setState({newQuestionsArr: newQuestionsArr});
        }
        else i--;
      }   
    });
  }
  setPoints(points){
    if (this.state.points+points >= 0)
    this.setState({points: this.state.points+points});
  }
  setTime(timer){
    this.setState({timer: timer});
  }
  restart(){
    window.location.reload();  
  }
  startGame(){
    this.setState({shouldHide: true});
  }
  gameOver(points){
    let originalRecord = reactLocalStorage.get('record', true);
    if (originalRecord < points)
    reactLocalStorage.set('record', points);
    this.setState({isOpen: true});
  }
  
  render() {
    return (<div>
      
      <section className={'hide-' + this.state.shouldHide}>
        <GameMenuTypeButtons getType={ type => this.setType(type) } startGame={ e => this.startGame() } timer={this.state.timer} questionsSum={this.state.minimumQuestions}/>
      </section>
      
      <section   className={'hide-' + !this.state.shouldHide}>
        <Timer startTimer = { this.state.shouldHide } gameOver={  gameOver => this.gameOver(this.state.points) } setTime={this.state.timer}/>
        <QuestionsByType  gameQuestionsFromJson={this.state.newQuestionsArr} getPoints={ points => this.setPoints(points)} points={this.state.points} questionsSum={this.state.minimumQuestions} restart={this.restart}
          openModal={ bool => this.openModal(bool)}/>
      </section>
      
      <section>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.restart}>
          <p className='modalRecord'>Game Over! you earn'd <strong>{this.state.points}</strong> points in <strong>{this.state.timer} seconds!</strong></p>
          <button className='btn btn-default breakRecord' onClick={this.restart}>
            Play again!
          </button>
        </Modal>
      </section>
      
    </div>)
  }
}


