import React from 'react';

export default class GameAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rightAnswerSound: new Audio('content/sounds/Ding.mp3'), wrongAnswerSound:new Audio('content/sounds/blackBall.mp3')};
  }
  checkRightAnswer(e,index){
    var answersLength = e.target.parentNode.childNodes.length;
    
    if (this.props.rightAnswer == index){
      
      this.props.rightAnswersSum(1);
      
      e.target.className = 'green';
      this.state.rightAnswerSound.play();
      
      if (this.props.getPoints) {
        this.props.getPoints(5);
      }
      
    }
    else{
      e.target.className = 'red';
      this.state.wrongAnswerSound.play();
      
      if (this.props.getPoints) {
        this.props.getPoints(-5);
      }
    }
    
    {/*LOCK the answers*/}
    for (let i = 0; i < answersLength; i++) {
      e.target.parentNode.childNodes[i].className += ' disableButton';
    } 
    this.props.nextQuestion();
  }
  
  render() {
    if (this.props.answers){
      var answers = this.props.answers.map((answer, index) => {
        return <button key = {index} onClick={(e) => this.checkRightAnswer(e,index)} className="defaultColor" > {answer} </button>
      })
      return <div>{answers}</div>
    }
    else
    return null;
  }
}   