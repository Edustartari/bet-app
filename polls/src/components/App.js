import React, { Component } from 'react'
import { render } from "react-dom";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: 1
        }
        this.counting = this.counting.bind(this);
    }

    counting(){
        this.setState({count: this.state.count + 1})
    }

    render() {
        console.log('Testing 2')
        console.log(this.state.count)
        return (
            <div onClick={this.counting}>
                <div>App</div>
                <div style={{color: 'blue'}}>{this.state.count}</div>
            </div>
        )
    }
}

export default App;

render(<App/>, document.getElementById("app"));
