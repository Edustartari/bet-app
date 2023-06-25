import React, { Component } from 'react';
import './styles/NewPoll.css';

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
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, { Dayjs } from 'dayjs';
import empty_list from '../../static/img/empty_list.jpg';
import default_poll_image from '../../static/img/default_poll_image.png';
import ImageUploading from "react-images-uploading";

function UploadImageComponent(props) {
	const [images, setImages] = React.useState(props.image);
	const maxNumber = 69;
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
		props.handle_change('image', imageList)
	};

	return (
		<div className="upload-image-container">
			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
				dataURLKey="data_url"
				acceptType={["jpg", "png"]}
			>
			{({
				imageList,
				onImageUpload,
				onImageRemoveAll,
				onImageUpdate,
				onImageRemove,
				isDragging,
				dragProps
			}) => (
				<div className="upload__image-wrapper upload-image-container-card">
					{imageList.length === 0 &&
						<div
							style={isDragging ? { color: "red" } : null}
							onClick={onImageUpload}
							{...dragProps}
							className="upload-image-empty"
						>
							<img src={default_poll_image} alt="" width="100" />
							<div className="upload-image-empty-text">Click here to upload your image...</div>
						</div>
					}
					{imageList.length > 0 &&
						<React.Fragment>
							{imageList.slice(0,1).map((image, index) => (
								<div key={index} className="image-item upload-image-object">
									<img src={image.data_url} alt="" width="100" />
									<div className="image-item__btn-wrapper upload-image-object-button">
										<div className="upload-image-object-button-details" onClick={() => onImageUpdate(index)}>Update</div>
										<div className="upload-image-object-button-details" onClick={onImageRemoveAll}>Remove</div>
									</div>
								</div>
							))}
						</React.Fragment>
					}
				</div>
			)}
			</ImageUploading>
		</div>
	);
}

function renderItem({ item, remove_answer }) {
	return (
	<ListItem
		secondaryAction={
		<IconButton
			edge="end"
			aria-label="delete"
			title="Delete"
			onClick={() => remove_answer(item)}
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
	// const [answer_options, setAnswerList] = React.useState(props.answer_options);
	const [answer, setAnswer] = React.useState('');

	const add_answer = () => {
		if(answer.length === 0){
			props.open_snackbar('Cannot add empty answer');
			return
		}
		const nextHiddenItem = props.answer_options.find((i) => i === answer);
		if (nextHiddenItem) {
			props.open_snackbar('Answer already added');
		} else {
			// setAnswerList((prev) => [answer, ...prev]);
			props.save_answer(answer, 'add')
		}
		setAnswer('')
	};

	const remove_answer = (answer) => {
		props.save_answer(answer, 'remove')
		// setAnswerList((prev) => [...prev.filter((i) => i !== answer)]);
	};

	const add_answer_button = (
		<Button
			fullWidth
			variant="contained"
			onClick={add_answer}
		>
			Add answer
		</Button>
	);

	return (
		<div>
			<TextField fullWidth id="outlined-basic" label="Answer Option" variant="outlined" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
			{add_answer_button}
			{props.answer_options.length > 0 &&
				<Box sx={{ mt: 1 }}>
					<List>
						<TransitionGroup>
							{props.answer_options.map((item) => (
								<Collapse key={item}>
								{renderItem({ item, remove_answer })}
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
			poll_name: '',
			poll_type: false,
			is_private: false,
			password: '',
			image: [],
			finish_date_active: false,
			finish_date: dayjs(new Date()),
			bets: [],
			bet: {
				'bet_title': '',
				'bet_description': '',
				'bet_data': {
					'answer_options': [],
					'finish_date': false,
					'users_answers': []
				},
				'image': '',
				'bet_type': '', /* select field - bet type could be radio (one answer), several checks (several answers) or free text */
				'correct_answer': ''
			},
			create_bet_card: false,
			correct_answer: '',
			correct_answer_switch: false,
			correct_answer_confirmed: false,
			answer_options: [],
			snackbar_open: false,
			snackbar_message: '',
			backdrop: false,
		}
		this.edit_bet = this.edit_bet.bind(this);
		this.save_answer = this.save_answer.bind(this);
		this.erase_all_fields = this.erase_all_fields.bind(this);
		this.add_bet = this.add_bet.bind(this);
		this.open_snackbar = this.open_snackbar.bind(this);
		this.remove_bet = this.remove_bet.bind(this);
		this.create_poll = this.create_poll.bind(this);
		this.handle_change = this.handle_change.bind(this);
	}

	handle_change(key, value){
		this.setState({[key]: value})
	}

	edit_bet(key, value){
		console.log('')
		console.log('edit_bet')
		console.log(this.state.bet)
		let temporary_dict = Object.assign({}, this.state.bet)
		if(key === 'bet_data'){
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
		let temporary_list;
		if(action === 'add'){
			console.log('if')
			temporary_list = [...this.state.answer_options, answer]
		} else {
			console.log('else')
			temporary_list = [...this.state.answer_options.filter((i) => i !== answer)]
		}
		this.setState({answer_options: temporary_list})
		console.log(this.state.answer_options)
		let temporary_dict = Object.assign({}, this.state.bet)
		temporary_dict.bet_data['answer_options'] = temporary_list
		this.setState({bet: temporary_dict})		
	}

	erase_all_fields(){
		console.log('')
		console.log('erase_all_fields')
		this.setState({correct_answer: ''});
		this.setState({answer_options: []});
		let empty_bet = {
			'bet_title': '',
			'bet_description': '',
			'bet_data': {
				'answer_options': []
			},
			'image': '',
			'bet_type': '',
			'correct_answer': ''
		}
		this.setState({bet: empty_bet});
		if(this.state.correct_answer_confirmed){
			this.setState({correct_answer_confirmed: false})
		}
	}

	add_bet(){
		if(this.state.bet.bet_title.length === 0){
			this.open_snackbar('You must give a bet name')
			return
		} else if(this.state.bet.bet_type.length === 0){
			this.open_snackbar('You must choose a type')
			this.setState({snackbar_messae: 'You must choose a type'})
			return
		}
		let temporary_dict = Object.assign({}, this.state.bet);
		temporary_dict.correct_answer = this.state.correct_answer;

		this.setState({bets: [...this.state.bets, temporary_dict]});
		this.erase_all_fields();
		this.setState({create_bet_card: false})
	}

	open_snackbar(message){
		console.log('')
		console.log('open_snackbar 4')
		console.log(this.state.snackbar_message)
		console.log(this.state.snackbar_open)
		this.setState({snackbar_message: message})
		this.setState({snackbar_open: true})
		this.state.snackbar_message = message
		this.state.snackbar_open = true
		console.log(this.state.snackbar_message)
		console.log(this.state.snackbar_open)
	}

	remove_bet(bet){
		let temporary_list = [...this.state.bets.filter((i) => i.bet_title !== bet.bet_title)]
		this.setState({bets: temporary_list})
	}

	create_poll(){
		this.setState({backdrop: true})
		console.log('')
		console.log('create_poll 6')
		let data_dict = {}
		data_dict['poll_name'] = this.state.poll_name
		data_dict['poll_type'] = this.state.poll_type
		data_dict['is_private'] = this.state.is_private
		data_dict['image'] = this.state.image
		data_dict['password'] = this.state.password
		data_dict['finish_date'] = this.state.finish_date_active ? this.state.finish_date : false
		data_dict['bets'] = this.state.bets

		$.ajax({
			context: this,
			type: 'POST',
			url: '/create-poll',
			data: {
				poll_info: JSON.stringify(data_dict)
			},
			success: function(data){
				if(data.status === 'success'){
					window.open('/' + data.new_poll_hash, "_self")
				} else {
					this.setState({backdrop: false});
					this.open_snackbar('Something went wrong. Please try again later...')
				}
				console.log('success')
				console.log(data)
			}
		})
	}

    render() {
		// console.log('render')
		// console.log('this.state.step')
		// console.log(this.state.step)
		// console.log('this.state.bets')
		// console.log(this.state.bets)
		return (
			<React.Fragment>
				{this.state.step === 'first' &&
					<div className='new-poll-first-step-background'>
						<div className='new-poll-first-step-container'>
							<div className='new-poll-first-step-title'>ADD POLL</div>
							<div className='new-poll-first-step-field'>
								<TextField fullWidth id="outlined-basic" label="Name" variant="outlined" value={this.state.poll_name} onChange={(event) => this.setState({poll_name: event.target.value})}/>
							</div>
							<div className='new-poll-first-step-field' style={{marginBottom: '0px'}} onClick={() => {this.setState({is_private: !this.state.is_private}), this.setState({password: ''})}}>
								<div className='new-poll-first-step-field-text'>Private Poll?</div>
								<div className='new-poll-first-step-field-toggle'>
									<Switch checked={this.state.is_private}/>
								</div>
							</div>
							{this.state.is_private &&
								<div className='new-poll-first-step-password-textfield'>
									<TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(event) => this.setState({password: event.target.value})}/>
								</div>
							}
							<div 
								className='new-poll-first-step-field' 
								style={{marginBottom: '0px'}}
								onClick={() => this.setState({finish_date_active: !this.state.finish_date_active})}
							>
								<div className='new-poll-first-step-field-text'>Is there a date to end poll?</div>
								<div className='new-poll-first-step-field-toggle'>
									<Switch checked={this.state.finish_date_active}/>
								</div>
							</div>
							{this.state.finish_date_active &&
								<div className='new-poll-first-step-password-textfield'>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											label="Basic date picker"
											value={this.state.finish_date}
											onChange={(e) => this.setState({finish_date: dayjs(e.$d)})}
										/>
									</LocalizationProvider>
								</div>
							}
						</div>
						<div className='new-poll-first-step-button-container'>
							<div 
								className='new-poll-first-step-button' 
							>
								<Button 
									fullWidth 
									variant="contained"
									onClick={
										() => this.state.poll_name.length === 0 ? this.open_snackbar('You must give a name for your poll') : 
										(this.state.is_private && this.state.password.length === 0) ? this.open_snackbar('Your private pool needs a password') : 
										this.setState({step: 'second'})
									}
								>
									NEXT
								</Button>
							</div>
						</div>
					</div>
				}
			
			{this.state.step === 'second' &&
				<div className='new-poll-second-step-background'>
					{/* Make the title and add button a fixed component */}
					{!this.state.create_bet_card &&
						<div className='new-poll-second-step-header'>
							<div className='new-poll-second-step-header-title'>CREATE NEW BET</div>
							<div className='new-poll-second-step-header-button'>
								<Button fullWidth variant="contained" onClick={() => this.setState({create_bet_card: true})}>
									<span className="material-icons">add</span>
								</Button>
							</div>
						</div>
					}
					{/* If there's no bet yet, display a message */}
					{(this.state.bets.length === 0 && !this.state.create_bet_card) &&
						<div className='new-poll-empty-bets-background'>
							<div className='new-poll-empty-bets-title'>Your poll has no bets yet.</div>
							<div className='new-poll-empty-bets-subtitle'>Create your first bet</div>
							<img className='new-poll-empty-bets-image' src={empty_list}/>
						</div>
					}
					{/* Everytime a user clicks to add button, open a card */}
					{this.state.create_bet_card &&
						<React.Fragment>
							<div className='new-poll-second-step-card-close-button' onClick={() => {this.erase_all_fields(), this.setState({create_bet_card: false})}}>
								<div className='new-poll-second-step-card-close-button-text'>Cancel</div>
								<span className='material-icons'>close</span>
							</div>
							<div className='new-poll-second-step-card'>
								<div className='new-poll-second-step-card-title'>New Bet</div>
								<div className='new-poll-second-step-card-header'>
									<div className='new-poll-second-step-card-header-icon' onClick={this.erase_all_fields}>
										<span className="material-icons">delete</span>
									</div>							
									<div className='new-poll-second-step-card-header-title' onClick={this.erase_all_fields}>Erase all fields</div>
								</div>
								<div className='new-poll-second-step-card-container'>
									<div className='new-poll-second-step-card-field'>
										<TextField 
											fullWidth 
											id="outlined-basic" 
											label="Bet name" 
											variant="outlined" 
											value={this.state.bet.bet_title}
											onChange={(event) => this.edit_bet('bet_title', event.target.value)}
										/>
									</div>
									<div className='new-poll-second-step-card-field'>
										<TextField
											fullWidth
											id="outlined-multiline-static"
											label="Description"
											multiline
											rows={4}
											value={this.state.bet.bet_description}
											onChange={(event) => this.edit_bet('bet_description', event.target.value)}
										/>
									</div>
									<div className='new-poll-second-step-card-field'>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Type</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={this.state.bet.bet_type}
												label="Type"
												onChange={(event) => this.edit_bet('bet_type', event.target.value)}
											>
											<MenuItem value={'radio'}>One answer only</MenuItem>
											<MenuItem value={'multiple'}>Multiple answer</MenuItem>
											<MenuItem value={'free'}>Free text</MenuItem>
											</Select>
										</FormControl>	
									</div>
									<div className='new-poll-second-step-card-field'>datepicker - Date limit to make bet</div>{/* date limit to participantes give an answer */}
									<div className='new-poll-second-step-card-field'>
										<div className='new-poll-second-step-card-toggle-container'>
											<div className='new-poll-second-step-card-toggle-title'>Is there a answer already?</div>
											<div className='new-poll-second-step-card-toggle-button'>
												<Switch 
													disabled={this.state.correct_answer_confirmed ? true : false} 
													checked={this.state.correct_answer_switch}
													onChange={() => {this.setState({correct_answer_switch: !this.state.correct_answer_switch})}}
												/>
											</div>
										</div>
										{this.state.correct_answer_switch &&
											<div className='new-poll-second-step-card-field-textfield'>
												<div className='new-poll-second-step-card-field-textfield-description'>
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
											<div className='new-poll-second-step-card-answers-options-component'>
												<AnswerOptions save_answer={this.save_answer} answer_options={this.state.answer_options} open_snackbar={this.open_snackbar}/>
											</div>
										</div>
									</div>
								</div>
								<Divider variant="middle" />
								<div className='new-poll-second-step-card-button'>
									<Button fullWidth variant="contained" onClick={this.add_bet}>ADD BET</Button>
								</div>
							</div>
						</React.Fragment>
					}
					{!this.state.create_bet_card &&
						<React.Fragment>
							{(this.state.bets.length > 0) &&
								<React.Fragment>
									<div className='new-poll-second-step-list'>
										<div className='new-poll-second-step-list-title'>List of Bets</div>
										{this.state.bets.map((bet) => {
											return(
												<div key={bet.bet_title} className='new-poll-second-step-list-card'>
													<div className='new-poll-second-step-list-card-title'>{bet.bet_title}</div>
													<div className='new-poll-second-step-list-card-icon' onClick={() => this.remove_bet(bet)}>
														<span className="material-icons">delete</span>
													</div>
												</div>
											)
										})}
									</div>
								</React.Fragment>
							}
						</React.Fragment>
					}
					{!this.state.create_bet_card &&
						<div className='new-poll-second-step-buttons-container'>
							<div className='new-poll-second-step-button' onClick={() => this.setState({step: 'first'})}>
								<Button fullWidth variant="contained">BACK</Button>
							</div>
							{this.state.bets.length !== 0 &&
								<div className='new-poll-second-step-button' onClick={() => this.setState({step: 'third'})}>
									<Button fullWidth variant="contained">NEXT</Button>
								</div>
							}
						</div>
					}
				</div>
			}
			{this.state.step === 'third' &&
				<div className='new-poll-third-step-background'>
					<div className='new-poll-third-step-photo'>
						<div className='new-poll-third-step-photo-title'>Last step...</div>
						<div className='new-poll-third-step-photo-subtitle'>Upload an image for your poll (OPTIONAL)</div>
						<UploadImageComponent handle_change={this.handle_change} {...this.state}/>
					</div>
					<div className='new-poll-third-step-buttons-container'>
						<div className='new-poll-third-step-button' onClick={() => this.setState({step: 'second'})}>
							<Button fullWidth variant="contained">BACK</Button>
						</div>
						{this.state.bets.length !== 0 &&
							<div className='new-poll-third-step-button new-poll-third-step-button-confirm' onClick={() => this.setState({step: 'finish'})}>
								<Button fullWidth variant="contained" onClick={this.create_poll}>SAVE POLL</Button>
							</div>
						}
					</div>
				</div>
			}
			<Snackbar
				autoHideDuration={2000}
				open={this.state.snackbar_open}
				message={this.state.snackbar_message}
				onClose={() => this.setState({snackbar_open: false})}
			/>
			<Backdrop
				open={this.state.backdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			</React.Fragment>
		)
    }
}
