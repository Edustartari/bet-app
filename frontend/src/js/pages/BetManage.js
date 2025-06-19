import React, { useState, useEffect } from 'react';
import 'styles/pages/BetManage.css';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import profile_picture_1 from 'images/profile-picture-1.jpg';
import profile_picture_2 from 'images/profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Marquee from "react-fast-marquee";
import {
    Link
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { update } from "../redux_folder/global_reducer.js";
import default_poll_image from 'images/default_poll_image.png';

/* 
CREATE A INTERMEDIATE PAGE: 
- As soon user clicks on a bet, show a page with:
    - Bet title
    - Bet description
    - Warning that bet closes in 7 days
    - Button "Others users answers" that shows how others users answered the bet
    - Button "My answer" that opens BetCard component
    - Button "Admin - Set correct answer" that ends the bet and shows the results
        -> This button should also open the BetCard component, but user must select the correct answer before submitting
        -> If user already provided the answer, then the option should be pre-selected
        -> To confirm the end of the bet, user must click on "Confirm" button
        -> Then the system will make a request to process the results and store in the correct tables in database
        -> After that, the user will be redirected to the BetPage where it is displayed a list of all bets
*/

const BetManage = (props) => {
    const state = useSelector(state => state.global)
    const dispatch = useDispatch()

    // let poll_dict = state.poll_dict;

    const [bet_card, setBetCard] = useState(false);
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

    return (
        <React.Fragment>
            <div className="bet-manage-background">
                Bet manage page
            </div>
            <Snackbar
                open={snackbar_open}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbar_message}
                className='bet-page-snackbar'
            />
        </React.Fragment>
    )
}
export default BetManage;