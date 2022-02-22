import React, { Component } from 'react'
import { render } from "react-dom";
import {isMobile} from 'react-device-detect';
import Main from './pages/Main';
import MyPolls from './pages/MyPolls';
import NewPoll from './pages/NewPoll';
import SearchPolls from './pages/SearchPolls';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Header from './components/Header.js'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        var path_location = window.location.pathname;
        return (
            <div>
                <Router>
                    {path_location !== '/login' && <Header/>}
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/my-polls" element={<MyPolls />} />
                        <Route path="/new-poll" element={<NewPoll />} />
                        <Route path="/search-polls" element={<SearchPolls />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </Router>
            </div>
        )
    }
}

export default App;

if(isMobile){
    render(<App/>, document.getElementById("app"));
}
