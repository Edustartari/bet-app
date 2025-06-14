import React, { Component } from 'react'
import 'styles/pages/Poll.css'
import Button from '@mui/material/Button';
import oscar from 'images/oscar.jpg';
import profile_picture_1 from 'images/profile-picture-1.jpg';
import profile_picture_2 from 'images/profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { update } from "../redux_folder/global_reducer.js";
import default_poll_image from 'images//default_poll_image.png';

/* IF USER IS ADMIN, INCLUDE AT HEADER THE THREE DOTS OPTION SO HE CAN EDIT THE POLL BY CHANGING NAME OR ADDING MORE BETS */
/* for all other users, create option at three dots on header to display group info, such as name, admins, number of participants, and also options(get of from group - and in case admin, delete group, specific users or alter password) */
/* USE AVATAR FOR USERS THAT DON'T HAVE PHOTO */

const Poll = (props) => {

    console.log('')
    console.log('Poll')
    console.log('props.poll_dict', props.poll_dict)

    if (!props.poll_dict) {
        props.update('poll_dict', content.poll_dict);
    }

    console.log('')
    console.log(' -------- Poll -------- ')
    console.log('props: ', props)
    
    if (!props.poll_dict) {
        console.log('if')
        return (
            <div>Loading...</div>
        )
    } else {
        let poll_image = "";
        try {
            poll_image = require('images//' + props.poll_dict.image + '.jpg');
            poll_image = poll_image.default;
        } catch (error) {
            poll_image = default_poll_image;
        }
        return (
            <div className="poll-background">
                <div className="poll-header">
                    <div className="poll-header-icon">
                        <span className="material-icons" onClick={() => window.open("/my-polls", '_self')}>arrow_back</span>
                        <span className="poll-header-icon-text" onClick={() => window.open("/my-polls", '_self')}>BACK</span>
                    </div>
                    <div className="poll-header-image">
                        <img src={poll_image}/>
                    </div>
                    <div className="poll-header-title">{props.poll_dict.name}</div>
                    <div className="poll-header-info">
                        <span>2º position</span>
                        <span> / 13 pts</span>
                    </div>
                    <div className="poll-header-button">
                        <Link to="/bet-page">
                            <Button variant="contained">BETS</Button>
                        </Link>
                    </div>
                </div>
                {props.poll_dict.ranking.length === 0 &&
                    <div className="poll-table-empty">
                        No results yet...
                    </div>
                }
                {props.poll_dict.ranking.length > 0 &&
                    <div className="poll-table">
                        <div className="poll-table-title">Ranking</div>
                        <div className="poll-table-container">
                            {props.poll_dict.ranking.map((element) => {
                                return (
                                    <div key={element.user_hash} className="poll-table-card">
                                        <div className="poll-table-card-info">
                                            <div className="poll-table-card-info-position">{element.position}º</div>
                                            <div className="poll-table-card-info-image">
                                                <img src={profile_picture_1}/>
                                            </div>
                                            <div className="poll-table-card-info-name">{element.user_name}</div>
                                        </div>
                                        <div className="poll-table-card-number">{element.total_points}pts</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        poll_dict: state.poll_dict
    };
}

export default connect(mapStateToProps, { update })(Poll);