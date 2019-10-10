import { Component } from "react";

class TemporaryAlert extends Component {
    alertTimeInSec = 2;

    constructor(props) {
        super(props);
        let timeoutId = setInterval(this.timer, 1000);
        this.state = {
            counter : this.alertTimeInSec,
            timeoutId
        }
    }

    timer() {
        if (this.state.counter === 0) {
            clearInterval(this.state.timeoutId);
            return;
        }
        this.setState({
            counter: this.state.counter - 1
        })
    }

    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}