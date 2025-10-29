import React, { useState, useEffect } from 'react'
import 'styles/pages/Poll.css'
import Button from '@mui/material/Button';
import oscar from 'images/oscar.jpg';
import profile_picture_1 from 'images/profile-picture-1.jpg';
import profile_picture_2 from 'images/profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { update } from "../redux_folder/global_reducer.js";
import default_poll_image from 'images//default_poll_image.png';
import LoadingComponent from '../components/LoadingComponent.js'

/* IF USER IS ADMIN, INCLUDE AT HEADER THE THREE DOTS OPTION SO HE CAN EDIT THE POLL BY CHANGING NAME OR ADDING MORE BETS */
/* for all other users, create option at three dots on header to display group info, such as name, admins, number of participants, and also options(get of from group - and in case admin, delete group, specific users or alter password) */
/* USE AVATAR FOR USERS THAT DON'T HAVE PHOTO */

const Poll = (props) => {
    const state = useSelector(state => state.global)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);
    const [poll_dict, setPollDict] = useState({});	
    const poll_hash_id = window.location.pathname.split('/')[2];

    useEffect(() => {
        const fetch_data = async () => {
            try {
                let response = await fetch('/poll-info', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ hash_id: poll_hash_id }),
                });
                if(response.status === 200){
                    let data = await response.json();
                    console.log('Fetched poll data:', data);
                    setPollDict(data.poll_dict);
                    dispatch(update({key: 'poll_dict', value: data.poll_dict}));
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        fetch_data()
    }, [])

    
    if (!poll_dict) {
        return (
            <div>Loading...</div>
        )
    } else {
        let poll_image = "";
        try {
            poll_image = require('images/' + poll_dict.image + '.jpg');
            poll_image = poll_image.default;
        } catch (error) {
            poll_image = default_poll_image;
        }

        // Convert poll_dict.ranking from object to array and sort by total_points
        let rankingArray = []
        if(poll_dict?.ranking) {
            rankingArray = Object.entries(poll_dict?.ranking).map(([user_id, user_data]) => ({
                user_id,
                ...user_data
            })).sort((a, b) => b.total_points - a.total_points);
        }
        // Set positions in ranking
        let position = 1;
        rankingArray = rankingArray.map((element, index) => {
            if(index > 0 && element.total_points < rankingArray[index - 1].total_points) {
                position = index + 1;
            }
            return {
                ...element,
                position: position
            }
        });
        console.log('rankingArray', rankingArray);

        return (
            <div className="poll-background">
                <div className="poll-header">
                    <div className="poll-header-button-container">
                        <Link to="/my-polls">
                            <div className="poll-header-icon">
                                <span className="material-icons">arrow_back</span>
                                <span className="poll-header-icon-text">BACK</span>
                            </div>
                        </Link>
                    </div>
                    <div className="poll-header-image">
                        <img src={poll_image}/>
                    </div>
                    <div className="poll-header-title">{poll_dict.name}</div>
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
                {rankingArray.length === 0 &&
                    <div className="poll-table-empty">
                        No results yet...
                    </div>
                }
                {rankingArray.length > 0 &&
                    <div className="poll-table">
                        <div className="poll-table-title">Ranking</div>
                        <div className="poll-table-container">
                            {rankingArray.map((element) => {
                                return (
                                    <div key={element.user_id} className="poll-table-card">
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
export default Poll;