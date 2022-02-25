import React, { Component } from 'react';
import './styles/NewPoll.css';

// components suggestions
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { TransitionGroup } from 'react-transition-group';

export default class NewPoll extends Component {
	constructor(props){
		super(props)
		this.state = {
			step: 'first', // can be first, second, third...
			name: '',
			type: false,
			password: '',
			finish_date_active: false,
			finish_date: false,
			bets: [],
			bet: {
				'question_title': '',
				'question_description': '',
				'question_data': {},
				'image': '',
				'question_type': '',
				'answer': ''
			},
		}
		this.edit_bet = this.edit_bet.bind(this)
	}

	edit_bet(key, value){
		console.log('')
		console.log('edit_bet')
		console.log(this.state.bet)
		let temporary_dict = Object.assign({}, this.state.bet)
		temporary_dict[key] = value
		this.setState({bet: temporary_dict})
		console.log(this.state.bet)
	}

    render() {
		if(this.state.step === 'first'){
			return (
				<div className='new-poll-first-step-background'>
					<div className='new-poll-first-step-container'>
						<div className='new-poll-first-step-title'>ADD POLL</div>
						<div className='new-poll-first-step-field'>
							<TextField fullWidth id="outlined-basic" label="Name" variant="outlined" onChange={(event) => this.setState({name: event.target.value})}/>
						</div>
						<div className='new-poll-first-step-field' style={{marginBottom: '0px'}}>
							<div className='new-poll-first-step-field-text'>Private Poll?</div>
							<div className='new-poll-first-step-field-toggle'>
								<Switch onChange={() => {this.setState({type: !this.state.type}), this.setState({password: ''})}}/>
							</div>
						</div>
						{this.state.type &&
							<div className='new-poll-first-step-password-textfield'>
								<TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(event) => this.setState({password: event.target.value})}/>
							</div>
						}
						<div className='new-poll-first-step-field' style={{marginBottom: '0px'}}>
							<div className='new-poll-first-step-field-text'>Is there a date to end poll?</div>
							<div className='new-poll-first-step-field-toggle'>
								<Switch onChange={() => this.setState({finish_date_active: !this.state.finish_date_active})}/>
							</div>
						</div>
						{this.state.finish_date_active &&
							<div className='new-poll-first-step-password-textfield'>
								datepicker - Date to end
							</div>
						}
					</div>
					<div className='new-poll-first-step-button-container'>
						<div className='new-poll-first-step-button' onClick={() => this.setState({step: 'second'})}>
							<Button fullWidth variant="contained">NEXT</Button>
						</div>
					</div>
				</div>
			)
		} else if (this.state.step === 'second'){
			return (
				<div className='new-poll-second-step-background'>
					{/* Make the title and add button a fixed component */}
					<div className='new-poll-second-step-header'>
						<div className='new-poll-second-step-header-title'>CREATE BETS</div>
						<div className='new-poll-second-step-header-button'>
							<Button variant="contained">
								<span className="material-icons">add</span>
							</Button>
						</div>
					</div>
					{/* Everytime a user clicks to add button, open a card */}
					<div className='new-poll-second-step-card'>
						<div className='new-poll-second-step-card-header'>
							<div className='new-poll-second-step-card-header-title'>Erase all fields</div>
							<div className='new-poll-second-step-card-header-icon'>
								<span className="material-icons">delete</span>
							</div>							
						</div>
						<div className='new-poll-second-step-card-container'>
							<div className='new-poll-second-step-card-field'>
								<TextField fullWidth id="outlined-basic" label="Bet name" variant="outlined" onChange={(event) => this.edit_bet('question_title', event.target.value)}/>
							</div>
							<div className='new-poll-second-step-card-field'>
								<TextField
									id="outlined-multiline-static"
									label="Description"
									multiline
									rows={4}
									value={this.state.bet.question_description}
									onChange={(event) => this.edit_bet('question_description', event.target.value)}
								/>
							</div>
							<div className='new-poll-second-step-card-field'>select field - bet type</div>{/* could be radio (one answer), several checks (several answers) or free text */}
							<div className='new-poll-second-step-card-field'>datepicker - Date to make bet</div>{/* date limit to participantes give an answer */}
							<div className='new-poll-second-step-card-field'>
								<div>Is there a answer already?</div>
								<div>toggle</div>
								textfield - real answer
							</div>{/* If there isn't a answer yet, include a toggle to make it optional */}
							<div>
								<div>real answer textfield</div>
								<div>real answer add button</div>
							</div>
							<div className='new-poll-second-step-card-field'>{/* If user already added the real answer, include at the list options of answers available */}
								<div>transition group component to show several bet answer options</div>
								<div>
									<div>add button text</div>
									<div>button</div>
								</div>
								<div>answer 1</div>
								<div>answer 2</div>
								<div>answer 3</div>
							</div>
						</div>
					</div>
					<div className='new-poll-second-step-list'>
						<div>
							<div>list of bets</div>
							<div>
								<span className="material-icons">delete</span>
							</div>
						</div>
					</div>
					<div className='new-poll-second-step-button'>
						<div onClick={() => this.setState({step: 'first'})}>back BUTTON</div>
						{/* ONLY DISPLAY NEXT BUTTON IF THERE IS AT LEAT ONE BET ADDED */}
						<div onClick={() => this.setState({step: 'third'})}>
							<Button fullWidth variant="contained">NEXT</Button>
						</div>
					</div>
				</div>
			)
		} else if (this.state.step === 'third'){
			return (
				<div>
					<div>
						<div>Poll photo</div>
						<div>react avatar editor</div>
					</div>
					<div>
						<div onClick={() => this.setState({step: 'second'})}>back BUTTON</div>
						<div onClick={() => this.setState({step: 'finish'})}>CONFIRM BUTTON</div>
					</div>
				</div>
			)
		} 
    }
}
