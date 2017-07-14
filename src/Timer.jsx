
import React from 'react';
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timer: this.props.setTime};
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.startTimer !== this.props.startTimer) {
      this.startTimer();
    }
  }
  tick () {
    if (this.state.timer == 1)
    this.stopTimer();
    this.setState({timer: (this.state.timer - 1)})
  }
  startTimer () {
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  stopTimer () {
    clearInterval(this.timer);
    this.props.gameOver();
  }
  render() {
    return (<div><h1 className='timer'>Timer: {this.state.timer}</h1>
  
</div>)
}
}