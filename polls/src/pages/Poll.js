import React, { Component } from 'react'
import './styles/Poll.css'
import Button from '@mui/material/Button';
import oscar from '../../static/img/oscar.jpg';
import profile_picture_1 from '../../static/img/profile-picture-1.jpg';
import profile_picture_2 from '../../static/img/profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';

/* IF USER IS ADMIN, INCLUDE AT HEADER THE THREE DOTS OPTION SO HE CAN EDIT THE POLL BY CHANGING NAME OR ADDING MORE QUESTIONS */
/* for all other users, create option at three dots on header to display group info, such as name, admins, number of participants, and also options(get of from group - and in case admin, delete group, specific users or alter password) */
/* USE AVATAR FOR USERS THAT DON'T HAVE PHOTO */

export default class Poll extends Component {    

    render() {
        return (
        <div className="poll-background">
            <div className="poll-header">
                <div className="poll-header-image">
                    <img src={oscar}/>
                </div>
                <div className="poll-header-title">{content.poll_dict.name}</div>
                <div className="poll-header-info">
                    <span>2º position</span>
                    <span> / 13 pts</span>
                </div>
                <div className="poll-header-button">
                    <Button variant="contained">BETS</Button>
                </div>
            </div>
            <div className="poll-table">
                <div className="poll-table-title">Ranking</div>
                <div className="poll-table-container">
                    {/* {content.poll_dict.map((element) => {
                        return (
                            <div className="poll-table-card">
                                <div className="poll-table-card-info">
                                    <div className="poll-table-card-info-position">1º</div>
                                    <div className="poll-table-card-info-image">
                                        <img src={profile_picture_1}/>
                                    </div>
                                    <div className="poll-table-card-info-name">Eduardo Startari</div>
                                </div>
                                <div className="poll-table-card-number">15pts</div>
                            </div>
                        )
                    })} */}
                    <div className="poll-table-card">
                        <div className="poll-table-card-info">
                            <div className="poll-table-card-info-position">2º</div>
                            <div className="poll-table-card-info-image">
                                <img src={profile_picture_2}/>
                            </div>
                            <div className="poll-table-card-info-name">Random person</div>
                        </div>
                        <div className="poll-table-card-number">13pts</div>
                    </div>
                    <div className="poll-table-card">
                        <div className="poll-table-card-info">
                            <div className="poll-table-card-info-position">3º</div>
                            <div className="poll-table-card-info-image">
                                <img src={profile_picture_1}/>
                            </div>
                            <div className="poll-table-card-info-name">Random person</div>
                        </div>
                        <div className="poll-table-card-number">9pts</div>
                    </div>
                    <div className="poll-table-card">
                        <div className="poll-table-card-info">
                            <div className="poll-table-card-info-position">4º</div>
                            <div className="poll-table-card-info-image">
                                <img src={profile_picture_2}/>
                            </div>
                            <div className="poll-table-card-info-name">Random person</div>
                        </div>
                        <div className="poll-table-card-number">8pts</div>
                    </div>
                    <div className="poll-table-card">
                        <div className="poll-table-card-info">
                            <div className="poll-table-card-info-position">5º</div>
                            <div className="poll-table-card-info-image">
                                <img src={profile_picture_1}/>
                            </div>
                            <div className="poll-table-card-info-name">Random person</div>
                        </div>
                        <div className="poll-table-card-number">2pts</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
