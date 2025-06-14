import React, { Component } from 'react';
import 'styles/pages/Main.css'

/* AT PENDING BETS, COULD BE USEFUL TO INFORM A NUMBER ASIDE THE TITLE INFORMING THE TOTAL OF PENDINGS USER STILL HAVE TO ACCOMPLISH (could be bets or in case admin could be confirm answers) */

const Main = (props) => {
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
                <div className="main-title-card">Pending bets</div>
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
export default Main;
