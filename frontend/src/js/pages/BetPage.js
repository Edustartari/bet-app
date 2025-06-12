import React, { Component } from 'react';
import 'styles/pages/BetPage.css';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import profile_picture_1 from 'images//profile-picture-1.jpg';
import profile_picture_2 from 'images//profile-picture-2.jpg';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Marquee from "react-fast-marquee";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { connect } from "react-redux";
import { update } from "../redux_folder/global_reducer.js";
import default_poll_image from 'images//default_poll_image.png';

class BetCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            option_selected: []
        }
        this.save_bet = this.save_bet.bind(this);
    }

    save_bet(){
        console.log('')
        console.log('save_bet')
        if(this.state.option_selected.length === 0){
            console.log('if')
            this.props.handle_snackbar('Please select at least one option');
            return;
        }
        else if(this.props.data.type === 'radio' && this.state.option_selected.length > 1){
            console.log('else if')
            this.props.handle_snackbar('Please select one option only');
            return;
        }

        $.ajax({
			context: this,
			type: 'POST',
			url: '/save-bet',
			data: {
				bet_info: JSON.stringify(this.props.data),
                option_selected: JSON.stringify(this.state.option_selected)
			},
			success: function(data){
				if(data.status === 'success'){
					this.props.handle_snackbar('Saved!');
                    let poll_dict = this.props.poll_dict;
                    // Find the bet in the poll_dict and update it
                    for(let i = 0; i < poll_dict.bets.length; i++){
                        if(poll_dict.bets[i].hash_id === this.props.data.hash_id){
                            poll_dict.bets[i]['users_answers'][this.props.poll_dict.user_id] = {
                                "answer": this.state.option_selected
                            };
                            break;
                        }
                    }
                    // Update the poll_dict in the redux store
                    this.props.update('poll_dict', poll_dict);                    
                    this.props.handle_change('bet_card', false);
				} else {
					this.props.handle_snackbar('Sorry, something went wrong...');
				}
			}
		})
    }

    render() {
        const { data } = this.props;
        console.log('')
        console.log('data', data)
        console.log('this.state.option_selected', this.state.option_selected)
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
                                onClick={(e) => this.setState({ option_selected: this.state.option_selected.includes(answer) ? this.state.option_selected.filter(item => item !== answer) : [...this.state.option_selected, answer] })}
                                style={{backgroundColor: this.state.option_selected.includes(answer) ? 'rgb(25 118 210 / 30%)' : 'white'}}
                            >
                                <div className='bet-card-option-item-text'>{answer}</div>
                                <div className='bet-card-option-item-checkbox'>
                                    <Checkbox
                                        checked={this.state.option_selected.includes(answer)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='bet-card-warning'>7 days until bet is closed...</div>
                <div className='bet-card-buttons'>
                    <div className='bet-card-button-details bet-card-button-cancel' onClick={() => this.props.handle_change('bet_card', false)}>CANCEL</div>
                    <div className='bet-card-button-details bet-card-button-confirm' onClick={this.save_bet}>CONFIRM</div>
                </div>
            </div>
        )
    }
}

class BetPage extends Component {    
    constructor(props){
        super(props)
        this.state = {
            bet_card: false,
            snackbar_open: false,
            snackbar_message: ''
        }
        this.handle_change = this.handle_change.bind(this);
        this.handle_snackbar = this.handle_snackbar.bind(this);
    }

    handle_change(key, value) {
        this.setState({ [key]: value });
    }

    handle_snackbar(message){
        console.log('')
        console.log('handle_snackbar')
        console.log('message: ', message)
        this.setState({snackbar_open: true, snackbar_message: message})
    }

    render() {
        let poll_dict = this.props.poll_dict;

        let poll_image = "";
        try {
            poll_image = require('images//' + poll_dict.image + '.jpg');
            poll_image = poll_image.default;
        } catch (error) {
            poll_image = default_poll_image;
        }

        console.log('')
        console.log('this.state.snackbar_open', this.state.snackbar_open)

        return (
            <React.Fragment>
                {this.state.bet_card &&
                    <BetCard {...this.props} data={this.state.bet_card} handle_change={this.handle_change} handle_snackbar={this.handle_snackbar}/>
                }
                {!this.state.bet_card &&
                    <div className="bet-page-background">
                        <div className="bet-page-main-header">
                            <Link to={"/" + poll_dict.hash_id}>
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
                                        <div key={bet.hash_id} className="bet-page-container-card" onClick={() => this.setState({bet_card: bet})}>
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
                    open={this.state.snackbar_open}
                    autoHideDuration={6000}
                    onClose={() => this.setState({snackbar_open: false})}
                    message={this.state.snackbar_message}
                    className='bet-page-snackbar'
                />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        poll_dict: state.poll_dict
    };
}

export default connect(mapStateToProps, { update })(BetPage);