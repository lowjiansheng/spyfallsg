import React, { Component } from 'react';

class CommunicateLayout extends Component{
    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        let timeoutId = setInterval(this.timer, 1000);
        this.state = {
            counter : 3,
            timeoutId,
        }
    }
    
    timer() {
        if (this.state.counter === 0) {
            this.props.communicationEnds();
            clearInterval(this.state.timeoutId);
            return;
        }
        this.setState({
            counter: this.state.counter - 1
        })
    }

    render(){
        return <p>Time Left: {this.state.counter}</p>
    }
}


export default CommunicateLayout;