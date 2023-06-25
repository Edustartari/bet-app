import React, { Component } from 'react'
import './styles/BetPage.css'
import Button from '@mui/material/Button';
import profile_picture_1 from '../../static/img/profile-picture-1.jpg';
import profile_picture_2 from '../../static/img/profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import Marquee from "react-fast-marquee";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { connect } from "react-redux";
import { update } from "../redux_folder/global_reducer.js";
import default_poll_image from '../../static/img/default_poll_image.png';

class BetPage extends Component {    

    render() {

        let poll_image = "";
        try {
            poll_image = require('../../static/img/poll_images/' + this.props.poll_dict.image + '.jpg');
            poll_image = poll_image.default;
        } catch (error) {
            poll_image = default_poll_image;
        }

        return (
            <div className="bet-page-background">
                <div className="bet-page-main-header">
                    <Link to={"/" + this.props.poll_dict.hash_id}>
                        <div className="bet-page-main-header-button">
                            <span className="material-icons">arrow_back</span>
                            <span className="bet-page-main-header-button-details">BACK</span>
                        </div>
                    </Link>
                    <div className="bet-page-main-header-poll-info">
                        <div className="bet-page-main-header-poll-info-image">
                            <img src={poll_image}/>
                        </div>
                        <div className="bet-page-main-header-poll-info-text">{this.props.poll_dict.name}</div>
                    </div>
                </div>
                <div className="bet-page-main-container">
                    <div className="bet-page-container-filter">
                        <div className="bet-page-container-filter-details">All</div>
                        <span className="material-icons">filter_alt</span>
                    </div>
                    <div className="bet-page-container-cards-list">
                        {this.props.poll_dict.bets.map((bet, index) => {
                            return (
                                <div key={bet.hash_id} className="bet-page-container-card">
                                    <div className="bet-page-container-card-info">
                                        <div className="bet-page-container-card-info-status">
                                            <span className="material-icons">done</span>
                                            <div className="bet-page-container-card-info-title">{bet.title}</div>
                                        </div>
                                        <div className="bet-page-container-card-info-description"><Marquee gradient={false}>{bet.description}</Marquee></div>
                                        <div className="bet-page-container-card-info-date">{bet.created_at}</div>
                                    </div>
                                    <div className="bet-page-container-card-button">
                                        <span className="material-icons">keyboard_arrow_right</span>
                                    </div>
                                </div>
                            )
                        })
                        }
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

function mapStateToProps(state) {
    return {
        poll_dict: state.poll_dict
    };
}

export default connect(mapStateToProps, { update })(BetPage);