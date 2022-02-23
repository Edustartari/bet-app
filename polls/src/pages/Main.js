import React, { Component } from 'react';
import './styles/Main.css'

export default class Main extends Component {
    render() {
        return (
            <div className="main-background">
                <div className="main-updates-container">
                    <div className="main-title-card">Last updates</div>
                    <div className="main-updates-card">
                        <div>Poll "Name of poll" update the "Name of bet" bet</div>
                        <div>Poll "Name of poll" update the "Name of bet" bet</div>
                    </div>
                </div>
                <div className="main-pending-container">
                    <div className="main-title-card">Peding bets</div>
                    <div className="main-pending-card">
                        <div>You have to bet "Name of bet" for "Name of poll" until "Date"</div>
                    </div>
                </div>
                <div className="main-highlights-container">
                    <div className="main-title-card">Random statistics</div>
                    <div className="main-highlights-card">
                        <div className="main-highlights-box">cool chart</div>
                        <div className="main-highlights-box">cool chart</div>
                        <div className="main-highlights-box">cool chart</div>
                        <div className="main-highlights-box">cool chart</div>
                        <div className="main-highlights-box">cool chart</div>
                    </div>
                </div>
            </div>
        )
    }
}

