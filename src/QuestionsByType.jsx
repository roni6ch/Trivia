import React from 'react';
import {Modal} from 'react-modal-bootstrap';
import GameAnswers from './GameAnswers';
import Slider from 'react-slick';

export default class QuestionsByType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rightAnswers:0,showModal:false,questionNum:0}
  }
  
  rightAnswersSum(rightAnswers){
    this.setState({ rightAnswers: this.state.rightAnswers + rightAnswers }, function (){
      if (this.state.rightAnswers == this.props.questionsSum){
        this.setState({ showModal:true });
      }
    });
  }
  
  setPoints(points){
    if (this.props.getPoints) {
      this.props.getPoints(points);
    }
  }
  nextQuestion(){
    
     this.slider.slickPrev();
    
    this.setState({ questionNum:this.state.questionNum+1 }, function (){
      console.log(this.state.questionNum);
      if (this.state.questionNum == this.props.questionsSum){
        this.setState({ showModal:true });
      }
    });
  }
  render() {
    var sliderSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe:false
    };
    
    
    if (this.props.gameQuestionsFromJson.length > 0) {
      
      const questions = this.props.gameQuestionsFromJson.map((question, i) => {
        if (i < this.props.questionsSum){
          return (  <div key={i} className="questionAndAnswers animated pulse">
          <h1>{question.question}</h1>
          <h2><GameAnswers answers={question.answers} rightAnswer={question.right_answer} getPoints={points => this.setPoints(points)} rightAnswersSum={rightAnswers => this.rightAnswersSum(rightAnswers)} 
            nextQuestion={e => this.nextQuestion()}/></h2>
        </div> )
      }
    });
    
    if (this.state.showModal){
      return <section>
        <Modal isOpen={this.state.showModal}>
          <p className='modalRecord' ref="modalHeader">Game Over!</p>
          <h2 className="modalRecord">You answer'd <span>{this.state.rightAnswers} </span>Right Answers: </h2><h2  className="modalRecord"> with <span>{this.props.points}</span> Points</h2>
          <button className='btn btn-default breakRecord'  onClick={this.props.restart}  ref="modalBody">
            Try next challenge...
          </button>
        </Modal>
      </section>
    }
    
    return (<div>
      
      <h1 className="questionNum">Question :  {this.state.questionNum} / {this.props.questionsSum}</h1>
      <section className="gameInfo">  <h2  className="rightAnswers">Right Answers: <span>{this.state.rightAnswers}</span></h2>  <h2  className="rightAnswers">Points: <span>{this.props.points}</span></h2>
    </section>
    <div><Slider ref={c => this.slider = c } {...sliderSettings}>
      { questions } 
    </Slider></div>
    
    
  </div>)
} 
else{
  return <div></div>
}
} 
}
