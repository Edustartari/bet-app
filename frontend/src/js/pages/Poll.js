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
import { updatePollDict } from "../redux_folder/global_reducer.js";
import default_poll_image from 'images//default_poll_image.png';
import LoadingComponent from '../components/LoadingComponent.js'

/* IF USER IS ADMIN, INCLUDE AT HEADER THE THREE DOTS OPTION SO HE CAN EDIT THE POLL BY CHANGING NAME OR ADDING MORE BETS */
/* for all other users, create option at three dots on header to display group info, such as name, admins, number of participants, and also options(get of from group - and in case admin, delete group, specific users or alter password) */
/* USE AVATAR FOR USERS THAT DON'T HAVE PHOTO */

const Poll = (props) => {
    const state = useSelector(state => state.global)
    const dispatch = useDispatch()

    console.log('redux state:', state)

    const [loading, setLoading] = useState(true);
    const [poll_dict, setPollDict] = useState({});	
    // console.log('')
    // console.log('Poll')
    // console.log('poll_dict', poll_dict)
    // console.log('window.location.pathname', window.location.pathname)
    const poll_hash_id = window.location.pathname.split('/')[2];
    // console.log('poll_hash_id', poll_hash_id)

    useEffect(() => {
        console.log('useEffect Poll 1')

        const fetch_data = async () => {
            try {
                let response = await fetch('/poll-info', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ hash_id: poll_hash_id }),
                });
                console.log('response:', response);
                if(response.status === 200){
                    let data = await response.json();
                    console.log('Fetched data:', data);
                    setPollDict(data.poll_dict);
                    dispatch(updatePollDict(data.poll_dict));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetch_data()
    }, [])

    console.log('')
    console.log(' -------- Poll -------- ')
    console.log('props: ', props)
    
    if (!poll_dict) {
        console.log('if')
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
                {/* {poll_dict.ranking.length === 0 &&
                    <div className="poll-table-empty">
                        No results yet...
                    </div>
                }
                {poll_dict.ranking.length > 0 &&
                    <div className="poll-table">
                        <div className="poll-table-title">Ranking</div>
                        <div className="poll-table-container">
                            {poll_dict.ranking.map((element) => {
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
                } */}
            </div>
        )
    }
}
export default Poll;