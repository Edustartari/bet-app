import React, { Component, StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import {isMobile} from 'react-device-detect';
import Main from './pages/Main';
import MyPolls from './pages/MyPolls';
import Poll from './pages/Poll';
import NewPoll from './pages/NewPoll';
import SearchPolls from './pages/SearchPolls';
import Settings from './pages/Settings';
import TermsOfUse from './pages/TermsOfUse';
import Login from './pages/Login';
import BetPage from './pages/BetPage';
import BetManage from './pages/BetManage';
import Header from './components/Header.js'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import store from './redux_folder/store';
import { Provider } from "react-redux";

const App = () => {
    var path_location = window.location.pathname;
    return (
        <div>
            {path_location !== '/login' && <Header/>}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/my-polls" element={<MyPolls />} />
                <Route path="/new-poll" element={<NewPoll />} />
                <Route path="/search-polls" element={<SearchPolls />} />
                <Route path="/terms" element={<TermsOfUse />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/bet-page" element={<BetPage />} />
                <Route path="/bet-manage/:slug" element={<BetManage />} />
                <Route path="/poll/:slug" element={<Poll />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    )
}

export default App;

if(isMobile){
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
        <StrictMode>
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        </StrictMode>,
    );
}
