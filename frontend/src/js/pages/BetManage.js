import React, { useState, useEffect } from 'react';
import 'styles/pages/BetManage.css';
import profile_picture_1 from 'images/profile-picture-1.jpg';
import profile_picture_2 from 'images/profile-picture-2.jpg';

import { 
	Button,
	TextField,
	Box,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Switch,
	Collapse,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Snackbar,
	Checkbox,
	Backdrop,
	CircularProgress	
} from '@mui/material';

import Marquee from "react-fast-marquee";
import {
    Link,
    useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { update } from "../redux_folder/global_reducer.js";
import default_poll_image from 'images/default_poll_image.png';
import BetCard from './BetCard.js';

/* 
CREATE A INTERMEDIATE PAGE: 
- As soon user clicks on a bet, show a page with:
    - Bet title
    - Bet description
    - Warning that bet closes in 7 days
    - Button "My answer" that opens BetCard component
    - Button "Others users answers" that shows how others users answered the bet
    - Button "Admin - Set correct answer" that ends the bet and shows the results
        -> This button should also open the BetCard component, but user must select the correct answer before submitting
        -> If user already provided the answer, then the option should be pre-selected
        -> To confirm the end of the bet, user must click on "Confirm" button
        -> Then the system will make a request to process the results and store in the correct tables in database
        -> After that, the user will be redirected to the BetPage where it is displayed a list of all bets
*/

const BetManage = (props) => {
    const state = useSelector(state => state.global)

    console.log('')
    console.log('BetManage')
    console.log('state: ', state)
    
    const dispatch = useDispatch()
    if(!state.poll_dict || Object.keys(state.poll_dict).length === 0){
        window.location.href = '/my-polls';
    }
    
    const bet_hash_id = window.location.pathname.split('/')[2];
    const bet_info = state.poll_dict.bets ? state.poll_dict.bets.find(bet => bet.hash_id === bet_hash_id) : null;
    console.log('bet_info: ', bet_info)

    if(!bet_info){
        window.location.href = '/my-polls';
    }

    const [open_bet_card, setOpenBetCard] = useState(false);
    const [snackbar_open, setSnackbarOpen] = useState(false);
    const [snackbar_message, setSnackbarMessage] = useState('');
   

    const handle_snackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // let poll_image = "";
    // try {
    //     poll_image = require('images/' + poll_dict.image + '.jpg');
    //     poll_image = poll_image.default;
    // } catch (error) {
    //     poll_image = default_poll_image;
    // }

    // console.log('')
    // console.log('snackbar_open', snackbar_open)
    // console.log('poll_dict', poll_dict)

    // Create a function to accept this date value format "5, Jul - 2025" and return the remaining days until that date
    // If the date is in the past, return "Bet closed"
    const calculate_remaining_days = (date_string) => {
        const months = {
            'Jan': 0,
            'Feb': 1,
            'Mar': 2,
            'Apr': 3,
            'May': 4,
            'Jun': 5,
            'Jul': 6,
            'Aug': 7,
            'Sep': 8,
            'Oct': 9,
            'Nov': 10,
            'Dec': 11
        };
        const parts = date_string.split(' - ');
        const day_month = parts[0].split(', ');
        const day = parseInt(day_month[0]);
        const month = months[day_month[1]];
        const year = parseInt(parts[1]);

        const target_date = new Date(year, month, day);
        const current_date = new Date();

        const time_difference = target_date - current_date;
        const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));

        if (days_difference < 0) {
            return "Bet finished";
        } else {
            return days_difference + " days until bet is closed";
        }
    };


    return (
        <React.Fragment>
            <div className="bet-manage-background">

                <div className="bet-manage-main-header">
                    <Link to={"/bet-page/" + state.poll_dict.hash_id}>
                        <div className="bet-manage-main-header-button">
                            <span className="material-icons">arrow_back</span>
                            <span className="bet-manage-main-header-button-details">BACK</span>
                        </div>
                    </Link>
                </div>

                <div className="bet-manage-header">
                    <div className="bet-manage-header-title">{bet_info.title}</div>
                    <div className="bet-manage-header-description">{bet_info.description}</div>
                    {/* <div className="bet-manage-header-warning">7 days until bet is closed...</div> */}
                    <div className="bet-manage-header-warning">{calculate_remaining_days(bet_info.finish_date)}</div>
                </div>
                <div className="bet-manage-container">
                    <div className="bet-manage-container-buttons">
                        <Button 
                            fullWidth
                            variant="contained" 
                            onClick={() => console.log('My answer clicked')}
                            sx={{ height: '60px' }}
                        >
                            SELECT MY ANSWER
                        </Button>
                        <Button 
                            fullWidth
                            variant="contained" 
                            onClick={() => console.log('SEE OTHERS ANSWERS clicked')}
                            sx={{ height: '60px' }}
                        >
                            SEE OTHERS ANSWERS
                        </Button>
                    </div>
                    <div className="bet-manage-container-admin">
                        <div className="bet-manage-container-admin-title">Admin area</div>
                        <div className="bet-manage-container-admin-description">The button bellow is only available for poll admins</div>
                        <div className="bet-manage-container-admin-description">Click the button to finish the bet with the correct answer</div>
                        <Button 
                            fullWidth
                            variant="outlined"
                            color="error"
                            onClick={() => console.log('CONFIRM CORRECT ANSWER clicked')}
                            sx={{ height: '60px' }}
                        >
                            CONFIRM CORRECT ANSWER
                        </Button>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbar_open}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbar_message}
                className='bet-page-snackbar'
            />
            {open_bet_card && 
                <BetCard setOpenBetCard={setOpenBetCard} />
            }
        </React.Fragment>
    )
}
export default BetManage;