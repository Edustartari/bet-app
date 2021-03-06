import React, { Component } from 'react'
import './styles/BetPage.css'
import Button from '@mui/material/Button';
import oscar from '../../static/img/oscar.jpg';
import profile_picture_1 from '../../static/img/profile-picture-1.jpg';
import profile_picture_2 from '../../static/img/profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import Marquee from "react-fast-marquee";

export default class BetPage extends Component {    

    render() {
        return (
            <div className="bet-page-background">
                <div className="bet-page-main-header">
                    <div className="bet-page-main-header-button">
                        <span className="material-icons" onClick={() => window.open("/my-polls", '_self')}>arrow_back</span>
                        <span className="bet-page-main-header-button-details" onClick={() => window.open("/my-polls", '_self')}>BACK</span>
                    </div>
                    <div className="bet-page-main-header-poll-info">
                        <div className="bet-page-main-header-poll-info-image">
                            <img src={oscar}/>
                        </div>
                        <div className="bet-page-main-header-poll-info-text">Poll name here</div>
                    </div>
                </div>
                <div className="bet-page-main-container">
                    <div className="bet-page-container-filter">
                        <div className="bet-page-container-filter-details">All</div>
                        <span className="material-icons">filter_alt</span>
                    </div>
                    <div className="bet-page-container-cards-list">
                        <div className="bet-page-container-card">
                            <div className="bet-page-container-card-info">
                                <div className="bet-page-container-card-info-status">
                                    <span className="material-icons">done</span>
                                    <div className="bet-page-container-card-info-title">Bet Title</div>
                                </div>
                                <div className="bet-page-container-card-info-description"><Marquee gradient={false}>Bet description, could be very long</Marquee></div>
                                <div className="bet-page-container-card-info-date">12, JUN - 2022</div>
                            </div>
                            <div className="bet-page-container-card-button">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                        <div className="bet-page-container-card">
                            <div className="bet-page-container-card-info">
                                <div className="bet-page-container-card-info-status">
                                    <span className="material-icons">error</span>
                                    <div className="bet-page-container-card-info-title">Bet Title</div>
                                </div>
                                <div className="bet-page-container-card-info-description"><Marquee gradient={false}>Bet description, could be very long, very very very very very very very very very very very looooong </Marquee></div>
                                <div className="bet-page-container-card-info-date">12, JUN - 2022</div>
                            </div>
                            <div className="bet-page-container-card-button">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                        <div className="bet-page-container-card">
                            <div className="bet-page-container-card-info">
                                <div className="bet-page-container-card-info-status">
                                    <span className="material-icons">done</span>
                                    <div className="bet-page-container-card-info-title">Bet Title</div>
                                </div>
                                <div className="bet-page-container-card-info-description"><Marquee gradient={false}>Bet description, could be very long</Marquee></div>
                                <div className="bet-page-container-card-info-date">12, JUN - 2022</div>
                            </div>
                            <div className="bet-page-container-card-button">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                        <div className="bet-page-container-card">
                            <div className="bet-page-container-card-info">
                                <div className="bet-page-container-card-info-status">
                                    <span className="material-icons">block</span>
                                    <div className="bet-page-container-card-info-title">Bet Title, gigantic, big and incredibly amazing title we have here don't you agree?</div>
                                </div>
                                <div className="bet-page-container-card-info-description"><Marquee gradient={false}>Bet description, could be very long</Marquee></div>
                                <div className="bet-page-container-card-info-date">12, JUN - 2022</div>
                            </div>
                            <div className="bet-page-container-card-button">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
