import React, { useState, useEffect } from 'react';
import 'styles/pages/BetPage.css';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import profile_picture_1 from 'images/profile-picture-1.jpg';
import profile_picture_2 from 'images/profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Marquee from "react-fast-marquee";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { update } from "../redux_folder/global_reducer.js";
import default_poll_image from 'images/default_poll_image.png';

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

const BetCard = (props) => {
    const { data } = props;

    const state = useSelector(state => state.global)
    const dispatch = useDispatch()

    const [option_selected, setOptionSelected] = useState([]);

    const change_option = (option) => {
        console.log('')
        console.log('change_option')
        console.log('option', option)
        if(data.type === 'radio'){
            console.log('if')
            setOptionSelected([option]);
        }
        else {
            console.log('else if')
            if(option_selected.includes(option)){
                setOptionSelected(option_selected.filter(item => item !== option));
            } else {
                setOptionSelected([...option_selected, option]);
            }
        }
    }

    const save_bet = () => {
        console.log('')
        console.log('save_bet')
        console.log('data', data)
        console.log('option_selected', option_selected)

        if(option_selected.length === 0){
            console.log('if')
            props.handle_snackbar('Please select at least one option');
            return;
        }
        else if(data.type === 'radio' && option_selected.length > 1){
            console.log('else if')
            props.handle_snackbar('Please select one option only');
            return;
        }

        $.ajax({
			context: this,
			type: 'POST',
			url: '/save-bet',
			data: {
				bet_info: JSON.stringify(data),
                option_selected: JSON.stringify(option_selected)
			},
			success: function(data){
				if(data.status === 'success'){
					props.handle_snackbar('Saved!');
                    let poll_dict = state.poll_dict;
                    // Find the bet in the poll_dict and update it
                    for(let i = 0; i < poll_dict.bets.length; i++){
                        if(poll_dict.bets[i].hash_id === data.hash_id){
                            poll_dict.bets[i]['users_answers'][state.poll_dict.user_id] = {
                                "answer": option_selected
                            };
                            break;
                        }
                    }
                    // Update the poll_dict in the redux store
                    dispatch(update({key: 'poll_dict', value: poll_dict}));                    
                    props.setBetCard(false);
				} else {
					props.handle_snackbar('Sorry, something went wrong...');
				}
			}
		})
    }

    console.log('')
    console.log('data', data)
    console.log('option_selected', option_selected)
    return (
        <div className='bet-card-background'>
            <div className='bet-card-title'>{data.title}</div>
            <div className='bet-card-description'>{data.description}</div>
            <div className='bet-card-options'>
                {data.answers.map((answer, index) => {
                    // console.log('')
                    // console.log('answer', answer)
                    return (
                        <div 
                            key={answer} 
                            className='bet-card-option-item' 
                            onClick={(e) => change_option(answer)}
                            style={{backgroundColor: option_selected.includes(answer) ? 'rgb(25 118 210 / 30%)' : 'white'}}
                        >
                            <div className='bet-card-option-item-text'>{answer}</div>
                            <div className='bet-card-option-item-checkbox'>
                                <Checkbox
                                    checked={option_selected.includes(answer)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <div className='bet-card-warning'>7 days until bet is closed...</div> */}
            <div className='bet-card-buttons'>
                <div className='bet-card-button-details bet-card-button-cancel' onClick={() => props.setBetCard(false)}>CANCEL</div>
                <div className='bet-card-button-details bet-card-button-confirm' onClick={save_bet}>CONFIRM</div>
            </div>
        </div>
    )
}

const BetPage = (props) => {
    const state = useSelector(state => state.global)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    let poll_dict = state.poll_dict;

    const [bet_card, setBetCard] = useState(false);
    const [snackbar_open, setSnackbarOpen] = useState(false);
    const [snackbar_message, setSnackbarMessage] = useState('');

    const handle_snackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    let poll_image = "";
    try {
        poll_image = require('images/' + poll_dict.image + '.jpg');
        poll_image = poll_image.default;
    } catch (error) {
        poll_image = default_poll_image;
    }

    console.log('')
    console.log('snackbar_open', snackbar_open)
    console.log('poll_dict', poll_dict)

    return (
        <React.Fragment>
            {bet_card &&
                <BetCard data={bet_card} setBetCard={setBetCard} handle_snackbar={handle_snackbar}/>
            }
            {!bet_card &&
                <div className="bet-page-background">
                    <div className="bet-page-main-header">
                        <Link to={"/poll/" + poll_dict.hash_id}>
                            <div className="bet-page-main-header-button">
                                <span className="material-icons">arrow_back</span>
                                <span className="bet-page-main-header-button-details">BACK</span>
                            </div>
                        </Link>
                        <div className="bet-page-main-header-poll-info">
                            <div className="bet-page-main-header-poll-info-image">
                                <img src={poll_image}/>
                            </div>
                            <div className="bet-page-main-header-poll-info-text">{poll_dict.name}</div>
                        </div>
                    </div>
                    <div className="bet-page-main-container">
                        <div className="bet-page-container-filter">
                            <div className="bet-page-container-filter-details">All</div>
                            <span className="material-icons">filter_alt</span>
                        </div>
                        <div className="bet-page-container-cards-list">
                            {poll_dict.bets.map((bet, index) => {
                                return (
                                    // <div key={bet.hash_id} className="bet-page-container-card" onClick={() => setBetCard(bet)}>
                                    <div key={bet.hash_id} className="bet-page-container-card" onClick={() => navigate('/bet-manage/' + bet.hash_id)}>
                                        <div className="bet-page-container-card-info">
                                            <div className="bet-page-container-card-info-status">
                                                <span className="material-icons">
                                                    {
                                                        poll_dict.user_id in bet.users_answers ? 'done' : 'error'
                                                    }
                                                </span>
                                                <div className="bet-page-container-card-info-title">{bet.title}</div>
                                            </div>
                                            <div className="bet-page-container-card-info-description"><Marquee gradient={false}>{bet.description}</Marquee></div>
                                            {bet.finish_date &&
                                                <div className="bet-page-container-card-info-date">Deadline: {bet.finish_date}</div>
                                            }
                                        </div>
                                        <div className="bet-page-container-card-button">
                                            <span className="material-icons">keyboard_arrow_right</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
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
export default BetPage;