import React, { Component } from 'react'
import { render } from "react-dom";
import {isMobile} from 'react-device-detect';
import Main from './pages/Main';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        // console.log('render APP')
        // console.log(content)
        return (
            <div>
                <Main/>
            </div>
        )
    }
}

export default App;

if(isMobile){
    render(<App/>, document.getElementById("app"));
}
