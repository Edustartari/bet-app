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

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TransitionGroup } from 'react-transition-group';


function renderItem({ item, handleRemoveFruit }) {
	return (
	<ListItem
		secondaryAction={
		<IconButton
			edge="end"
			aria-label="delete"
			title="Delete"
			onClick={() => handleRemoveFruit(item)}
		>
			<span className="material-icons">delete</span>
		</IconButton>
		}
	>
		<ListItemText primary={item} />
	</ListItem>
	);
}
  
function AnswerOptions(props) {
	const [answer_options, setAnswerList] = React.useState(props.answer_options);
	const [answer, setAnswer] = React.useState('');

	const handleAddFruit = () => {
		console.log('')
		console.log('handleAddFruit')
		console.log(props.answer_options)
		const nextHiddenItem = props.answer_options.find((i) => i === answer);
		console.log(nextHiddenItem)
		console.log(answer)
		if (nextHiddenItem) {
			console.log('if')
			console.log('answer already saved')
		} else {
			console.log('else')
			setAnswerList((prev) => [answer, ...prev]);
			props.save_answer(answer, 'add')
		}
		setAnswer('')
	};

	const handleRemoveFruit = (answer) => {
		props.save_answer(answer, 'remove')
		setAnswerList((prev) => [...prev.filter((i) => i !== answer)]);
	};

	const addFruitButton = (
		<Button
			fullWidth
			variant="contained"
			onClick={handleAddFruit}
		>
			Add answer
		</Button>
	);

	console.log('')
	console.log('AnswerOptions')
	console.log(props)

	return (
		<div>
			<TextField fullWidth id="outlined-basic" label="Answer Option" variant="outlined" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
			{addFruitButton}
			{props.answer_options.length > 0 &&
				<Box sx={{ mt: 1 }}>
					<List>
						<TransitionGroup>
							{props.answer_options.map((item) => (
								<Collapse key={item}>
								{renderItem({ item, handleRemoveFruit })}
								</Collapse>
							))}
						</TransitionGroup>
					</List>
				</Box>
			}
		</div>
	);
}

export default class NewPoll extends Component {
	constructor(props){
		super(props)
		this.state = {
			step: 'first', // can be first, second, third...
			name: '',
			poll_type: false,
			password: '',
			finish_date_active: false,
			finish_date: false,
			bets: [],
			bet: {
				'question_title': '',
				'question_description': '',
				'question_data': {
					'answer_options': []
				},
				'image': '',
				'question_type': '', /* select field - bet type could be radio (one answer), several checks (several answers) or free text */
				'correct_answer': ''
			},
			create_bet_card: false,
			correct_answer: '',
			correct_answer_switch: true,
			correct_answer_confirmed: false,
			answer_options: []
			// answer_options: ['edu test one', 'edu test two', 'edu test three']
		}
		this.edit_bet = this.edit_bet.bind(this);
		this.save_answer = this.save_answer.bind(this);
		this.erase_all_fields = this.erase_all_fields.bind(this);
	}

	edit_bet(key, value){
		console.log('')
		console.log('edit_bet')
		console.log(this.state.bet)
		let temporary_dict = Object.assign({}, this.state.bet)
		if(key === 'question_data'){
			if('answer_options' in temporary_dict[key]){
				temporary_dict[key]['answer_options'].push(value)
			} else {
				temporary_dict[key]['answer_options'] = [value]
			}
		} else {
			temporary_dict[key] = value
			console.log(this.state.bet)
		}
		this.setState({bet: temporary_dict})
	}

	save_answer(answer, action){
		console.log('')
		console.log('save_answer')
		console.log(answer)
		if(action === 'add'){
			console.log('if')
			this.setState({answer_options: [...this.state.answer_options, answer]})
		} else {
			console.log('else')
			this.setState({answer_options: [...this.state.answer_options.filter((i) => i !== answer)]})
		}
		console.log(this.state.answer_options)
		let temporary_dict = Object.assign({}, this.state.bet)
		temporary_dict.question_data['answer_options'] = this.state.answer_options
		this.setState({bet: temporary_dict})		
	}

	erase_all_fields(){
		console.log('')
		console.log('erase_all_fields')
		this.setState({correct_answer: ''});
		this.setState({answer_options: []});
		let empty_bet = {
			'question_title': '',
			'question_description': '',
			'question_data': {
				'answer_options': []
			},
			'image': '',
			'question_type': '',
			'correct_answer': ''
		}
		this.setState({bet: empty_bet});
		if(this.state.correct_answer_confirmed){
			this.setState({correct_answer_confirmed: false})
		}
	}

    render() {
		console.log('render')
		console.log('this.state.bet')
		console.log(this.state.bet)
		console.log('this.state.answer_options')
		console.log(this.state.answer_options)
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
								<Switch onChange={() => {this.setState({poll_type: !this.state.poll_type}), this.setState({password: ''})}}/>
							</div>
						</div>
						{this.state.poll_type &&
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
						<div className='new-poll-second-step-header-title'>CREATE BET</div>
						<div className='new-poll-second-step-header-button'>
							<Button fullWidth variant="contained" onClick={() => this.setState({create_bet_card: true})}>
								<span className="material-icons">add</span>
							</Button>
						</div>
					</div>
					{/* Everytime a user clicks to add button, open a card */}
					{this.state.create_bet_card &&
						<React.Fragment>
							<div className='new-poll-second-step-card'>
								<div className='new-poll-second-step-card-title'>New Bet</div>
								<div className='new-poll-second-step-card-header'>
									<div className='new-poll-second-step-card-header-title'>Erase all fields</div>
									<div className='new-poll-second-step-card-header-icon' onClick={this.erase_all_fields}>
										<span className="material-icons">delete</span>
									</div>							
								</div>
								<div className='new-poll-second-step-card-container'>
									<div className='new-poll-second-step-card-field'>
										<TextField 
											fullWidth 
											id="outlined-basic" 
											label="Bet name" 
											variant="outlined" 
											value={this.state.bet.question_title}
											onChange={(event) => this.edit_bet('question_title', event.target.value)}
										/>
									</div>
									<div className='new-poll-second-step-card-field'>
										<TextField
											fullWidth
											id="outlined-multiline-static"
											label="Description"
											multiline
											rows={4}
											value={this.state.bet.question_description}
											onChange={(event) => this.edit_bet('question_description', event.target.value)}
										/>
									</div>
									<div className='new-poll-second-step-card-field'>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Type</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={this.state.bet.question_type}
												label="Type"
												onChange={(event) => this.edit_bet('question_type', event.target.value)}
											>
											<MenuItem value={'radio'}>One answer only</MenuItem>
											<MenuItem value={'multiple'}>Multiple answer</MenuItem>
											<MenuItem value={'free'}>Free text</MenuItem>
											</Select>
										</FormControl>	
									</div>
									<div className='new-poll-second-step-card-field'>datepicker - Date to make bet</div>{/* date limit to participantes give an answer */}
									<div className='new-poll-second-step-card-field'>
										<div className='new-poll-second-step-card-toggle-container'>
											<div className='new-poll-second-step-card-toggle-title'>Is there a answer already?</div>
											<div className='new-poll-second-step-card-toggle-button'>
												<Switch 
													disabled={this.state.correct_answer_confirmed ? true : false} 
													defaultChecked 
													onChange={() => {this.setState({correct_answer_switch: !this.state.correct_answer_switch})}}
												/>
											</div>
										</div>
										{this.state.correct_answer_switch &&
											<div className='new-poll-second-step-card-field-textfield'>
												<div className='new-poll-second-step-card-field-textfield-description'>
													{/* <TextField fullWidth id="outlined-basic" label="Correct answer" variant="outlined" onChange={(event) => this.setState({correct_answer: event.target.value})}/> */}
													<TextField 
														disabled={this.state.correct_answer_confirmed ? true : false} 
														fullWidth 
														id="outlined-basic" 
														label="Correct answer" 
														variant="outlined"
														value={this.state.correct_answer}
														onChange={(event) => this.setState({correct_answer: event.target.value})}
													/>
												</div>
												<div>
													<Button disabled={this.state.correct_answer_confirmed ? true : false} fullWidth variant="contained" onClick={() => {this.setState({answer_options: [...this.state.answer_options, this.state.correct_answer]}), this.setState({correct_answer_confirmed: true})}}>CONFIRM</Button>
													{this.state.correct_answer_confirmed &&
														<Button 
															fullWidth variant="contained" 
															onClick={() => {
																this.setState({answer_options: this.state.answer_options.filter((item) => item !== this.state.correct_answer)}),
															 	this.setState({correct_answer_confirmed: false}),
															 	this.setState({correct_answer: ''})
															}}
														>
															ERASE
														</Button>
													}
												</div>
											</div>
										}
									</div>
									<div className='new-poll-second-step-card-answers-options-title'>List here your answer options:</div>
									<div className='new-poll-second-step-card-field new-poll-second-step-card-answers-options'>{/* If user already added the real answer, include at the list options of answers available */}
										<div className='new-poll-second-step-card-answers-options-container'>
											<div className='new-poll-second-step-card-answers-options-textfield'>
												{/* <TextField fullWidth id="outlined-basic" label="Answer Option" variant="outlined" onChange={(event) => this.setState({answer_option: event.target.value})}/> */}
											</div>
											<div className='new-poll-second-step-card-answers-options-component'>
												<AnswerOptions save_answer={this.save_answer} answer_options={this.state.answer_options}/>
												{/* transition group component to show several bet answer options */}
											</div>
										</div>
										{/* <div className='new-poll-second-step-card-answers-options'>
											<div>add button text</div>
											<div>button</div>
										</div>
										<div className='new-poll-second-step-card-answers-options'>answer 1</div>
										<div className='new-poll-second-step-card-answers-options'>answer 2</div>
										<div className='new-poll-second-step-card-answers-options'>answer 3</div> */}
									</div>
								</div>
							</div>
						</React.Fragment>
					}
					<div className='new-poll-second-step-list'>
						<div>
							<div>list of bets</div>
							<div>
								<span className="material-icons">delete</span>
							</div>
						</div>
					</div>
					<div className='new-poll-second-step-buttons-container'>
						<div className='new-poll-second-step-button' onClick={() => this.setState({step: 'first'})}>
							<Button fullWidth variant="contained">BACK</Button>
						</div>
						{/* ONLY DISPLAY NEXT BUTTON IF THERE IS AT LEAST ONE BET ADDED */}
						{this.state.bets.length !== 0 &&
							<div className='new-poll-second-step-button' onClick={() => this.setState({step: 'third'})}>
								<Button fullWidth variant="contained">NEXT</Button>
							</div>
						}
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
