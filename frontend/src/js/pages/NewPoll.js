import React, { useState } from 'react';
import 'styles/pages/NewPoll.css';
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
	IconButton,
	List,
	ListItem,
	ListItemText,
	Snackbar,
	Divider,
	Backdrop,
	CircularProgress	
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TransitionGroup } from 'react-transition-group';

import dayjs, { Dayjs } from 'dayjs';
import empty_list from 'images/empty_list.jpg';
import default_poll_image from 'images/default_poll_image.png';
import ImageUploading from "react-images-uploading";
import { Navigate, useNavigate } from "react-router-dom";

/* 

    CREATE OPTION TO USER COPY THE SAME BET AGAIN, BUT WITH A DIFFERENT NAME
	CREATE OPTION TO USER LOAD ANSWERS FROM A CSV FILE

*/

function UploadImageComponent(props) {
	const [images, setImages] = useState(props.image);
	const maxNumber = 69;
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
		props.setImage(imageList)
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

function renderItem({ item, remove_answer, correct_answer }) {
	return (
	<ListItem
		secondaryAction={
			correct_answer === item ? 
			'correct answer' :
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
	const [answer, setAnswer] = useState('');

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

	let correct_answer = props.bet.correct_answer

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
									{renderItem({ item, remove_answer, correct_answer })}
								</Collapse>
							))}
						</TransitionGroup>
					</List>
				</Box>
			}
		</div>
	);
}

const NewPoll = (props) => {
	let navigate = useNavigate();

	const [step, setStep] = useState('first'); // can be first, second, third...
	const [pollName, setPollName] = useState('');
	const [pollType, setPollType] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [password, setPassword] = useState('');
	const [image, setImage] = useState([]);
	const [finishDateActive, setFinishDateActive] = useState(false);
	const [finishDate, setFinishDate] = useState(dayjs(new Date()));
	const [bets, setBets] = useState([]);
	const [betFinishDateActive, setBetFinishDateActive] = useState(false);
	const [bet, setBet] = useState({
		'bet_title': '',
		'bet_description': '',
		'bet_data': {
			'answer_options': [],
			'finish_date': false,
			'users_answers': {},
		},
		'image': '',
		'bet_type': '', /* select field - bet type could be radio (one answer), several checks (several answers) */
		'correct_answer': '',
		'correct_answer_confirmed': false,
		'bet_hash': false
	});
	const [createBetCard, setCreateBetCard] = useState(false);
	const [correctAnswerSwitch, setCorrectAnswerSwitch] = useState(false);
	const [correctAnswerConfirmed, setCorrectAnswerConfirmed] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const edit_bet = (key, value) => {
		let temporary_dict = Object.assign({}, bet)
		if(key === 'bet_data'){
			if('answer_options' in temporary_dict[key]){
				temporary_dict[key]['answer_options'].push(value)
			} else {
				temporary_dict[key]['answer_options'] = [value]
			}
		} else if (key === 'bet_finish_date') {
			temporary_dict['bet_data']['finish_date'] = value
		} else {
			temporary_dict[key] = value
		}
		setBet(temporary_dict)
	}

	const set_bet = (bet) => {
		setCreateBetCard(true)
		setBet(bet)
		if(bet.correct_answer.length > 0 && bet.correct_answer_confirmed){
			setCorrectAnswerConfirmed(true)
		}
	}

	const save_answer = (answer, action) => {
		let temporary_list;
		if(action === 'add'){
			temporary_list = [...bet.bet_data.answer_options, answer]
		} else {
			temporary_list = [...bet.bet_data.answer_options.filter((i) => i !== answer)]
		}
		let temporary_dict = Object.assign({}, bet)
		temporary_dict.bet_data['answer_options'] = temporary_list
		setBet(temporary_dict)
	}

	const erase_all_fields = () => {
		setBetFinishDateActive(false)
		let empty_bet = {
			'bet_title': '',
			'bet_description': '',
			'bet_data': {
				'answer_options': [],
				'finish_date': false,
				'users_answers': {},
			},
			'image': '',
			'bet_type': '',
			'correct_answer': '',
			'correct_answer_confirmed': false,
			'bet_hash': false
		}
		setBet(empty_bet);
		if(correctAnswerConfirmed){
			setCorrectAnswerConfirmed(false)
		}
	}

	const add_bet = () => {
		if(bet.bet_title.length === 0){
			open_snackbar('You must give a bet name')
			return
		} else if(bet.bet_type.length === 0){
			open_snackbar('You must choose a type')
			return
		} else if (bet.bet_data.answer_options.length < 2){
			open_snackbar('You must choose at least 2 answer')
			return
		}
		let temporary_dict = Object.assign({}, bet);
		if(correctAnswerConfirmed){
			temporary_dict['correct_answer'] = bet.correct_answer;
			temporary_dict['correct_answer_confirmed'] = true;
		}

		// Create random hash with 32 characters
		let random_hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		temporary_dict['bet_hash'] = random_hash;

		setBets([...bets, temporary_dict]);
		erase_all_fields();
		setCreateBetCard(false);
	}

	const update_bet = () => {
		let temporary_list = [...bets.filter((i) => i.bet_hash !== bet.bet_hash)]
		setBets([...temporary_list, bet]);
		erase_all_fields();
		setCreateBetCard(false);
	}

	const open_snackbar = (message) => {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	}

	const remove_bet = (bet) => {
		let temporary_list = [...bets.filter((i) => i.bet_title !== bet.bet_title)]
		setBets(temporary_list);
	}

	const create_poll = () => {
		setLoading(true);
		let data_dict = {}
		data_dict['poll_name'] = pollName
		data_dict['poll_type'] = pollType
		data_dict['isPrivate'] = isPrivate
		data_dict['image'] = image
		data_dict['password'] = password
		data_dict['finish_date'] = finishDateActive ? finishDate : false
		data_dict['bets'] = bets

		$.ajax({
			context: this,
			type: 'POST',
			url: '/create-poll',
			data: {
				poll_info: JSON.stringify(data_dict)
			},
			success: function(data){
				if(data.status === 'success'){
					navigate('/poll/' + data.new_poll_hash)
				} else {
					setLoading(false);
					open_snackbar('Something went wrong. Please try again later...')
				}
			}
		})
	}

	return (
		<React.Fragment>
			{step === 'first' &&
				<div className='new-poll-first-step-background'>
					<div className='new-poll-first-step-container'>
						<div className='new-poll-first-step-title'>ADD POLL</div>
						<div className='new-poll-first-step-field'>
							<TextField fullWidth id="outlined-basic" label="Name" variant="outlined" value={pollName} onChange={(event) => setPollName(event.target.value)}/>
						</div>
						<div className='new-poll-first-step-field' style={{marginBottom: '0px'}} onClick={() => {setIsPrivate(!isPrivate), setPassword('')}}>
							<div className='new-poll-first-step-field-text'>Private Poll?</div>
							<div className='new-poll-first-step-field-toggle'>
								<Switch checked={isPrivate}/>
							</div>
						</div>
						{isPrivate &&
							<div className='new-poll-first-step-password-textfield'>
								<TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)}/>
							</div>
						}
						<div 
							className='new-poll-first-step-field' 
							style={{marginBottom: '0px'}}
							onClick={() => setFinishDateActive(!finishDateActive)}
						>
							<div className='new-poll-first-step-field-text'>Is there a date to end poll?</div>
							<div className='new-poll-first-step-field-toggle'>
								<Switch checked={finishDateActive}/>
							</div>
						</div>
						{finishDateActive &&
							<div className='new-poll-first-step-password-textfield'>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Poll finish date"
										value={finishDate}
										onChange={(e) => setFinishDate(dayjs(e.$d))}
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
									() => pollName.length === 0 ? open_snackbar('You must give a name for your poll') : 
									(isPrivate && password.length === 0) ? open_snackbar('Your private pool needs a password') : 
									setStep('second')
								}
							>
								NEXT
							</Button>
						</div>
					</div>
				</div>
			}
		
		{step === 'second' &&
			<div className='new-poll-second-step-background'>
				{/* Make the title and add button a fixed component */}
				{!createBetCard &&
					<div className='new-poll-second-step-header'>
						<div className='new-poll-second-step-header-title'>CREATE NEW BET</div>
						<div className='new-poll-second-step-header-button'>
							<Button fullWidth variant="contained" onClick={() => setCreateBetCard(true)}>
								<span className="material-icons">add</span>
							</Button>
						</div>
					</div>
				}
				{/* If there's no bet yet, display a message */}
				{(bets.length === 0 && !createBetCard) &&
					<div className='new-poll-empty-bets-background'>
						<div className='new-poll-empty-bets-title'>Your poll has no bets yet.</div>
						<div className='new-poll-empty-bets-subtitle'>Create your first bet</div>
						<img className='new-poll-empty-bets-image' src={empty_list}/>
					</div>
				}
				{/* Everytime a user clicks to add button, open a card */}
				{createBetCard &&
					<React.Fragment>
						<div className='new-poll-second-step-card-close-button' onClick={() => {erase_all_fields(), setCreateBetCard(false)}}>
							<div className='new-poll-second-step-card-close-button-text'>Cancel</div>
							<span className='material-icons'>close</span>
						</div>
						<div className='new-poll-second-step-card'>
							<div className='new-poll-second-step-card-title'>New Bet</div>
							<div className='new-poll-second-step-card-header'>
								<div className='new-poll-second-step-card-header-icon' onClick={erase_all_fields}>
									<span className="material-icons">delete</span>
								</div>							
								<div className='new-poll-second-step-card-header-title' onClick={erase_all_fields}>Erase all fields</div>
							</div>
							<div className='new-poll-second-step-card-container'>
								<div className='new-poll-second-step-card-field'>
									<TextField 
										fullWidth 
										id="outlined-basic" 
										label="Bet name" 
										variant="outlined" 
										value={bet.bet_title}
										onChange={(event) => edit_bet('bet_title', event.target.value)}
									/>
								</div>
								<div className='new-poll-second-step-card-field'>
									<TextField
										fullWidth
										id="outlined-multiline-static"
										label="Description"
										multiline
										rows={4}
										value={bet.bet_description}
										onChange={(event) => edit_bet('bet_description', event.target.value)}
									/>
								</div>
								<div className='new-poll-second-step-card-field new-poll-selectfield-container'>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">Type</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={bet.bet_type}
											label="Type"
											onChange={(event) => edit_bet('bet_type', event.target.value)}
										>
										<MenuItem value={'radio'}>One answer only</MenuItem>
										<MenuItem value={'multiple'}>Multiple answer</MenuItem>
										</Select>
									</FormControl>	
								</div>
								<div 
									className='new-poll-second-step-card-field new-poll-datepicker-container' 
									style={{marginBottom: '0px'}}
									onClick={
										betFinishDateActive ?
										() => {setBet({...bet, bet_data: {...bet.bet_data, finish_date: false}}), setBetFinishDateActive(false)}
										:
										() => {setBet({...bet, bet_data: {...bet.bet_data, finish_date: dayjs(new Date())}}), setBetFinishDateActive(true)}
									}
								>
									<div className='new-poll-second-step-card-toggle-title'>Set deadline to make this bet</div>
									<div className='new-poll-first-step-field-toggle'>
										<Switch checked={betFinishDateActive}/>
									</div>
								</div>
								{betFinishDateActive &&
									<div className='new-poll-second-step-card-field new-poll-datepicker-container'>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DatePicker
												label="Bet finish date"
												value={bet.bet_data.finish_date}
												onChange={(e) => edit_bet('bet_finish_date', dayjs(e.$d))}
											/>
										</LocalizationProvider>	
									</div>
								}
								<div className='new-poll-second-step-card-field'>
									<div className='new-poll-second-step-card-toggle-container' onClick={correctAnswerConfirmed ? () => {} : () => {setCorrectAnswerSwitch(!correctAnswerSwitch)}}>
										<div className='new-poll-second-step-card-toggle-title'>Is there a answer already?</div>
										<div className='new-poll-second-step-card-toggle-button'>
											<Switch 
												disabled={correctAnswerConfirmed ? true : false} 
												checked={correctAnswerSwitch}
											/>
										</div>
									</div>
									{correctAnswerSwitch &&
										<div className='new-poll-second-step-card-field-textfield'>
											<div className='new-poll-second-step-card-field-textfield-description'>
												<TextField 
													disabled={correctAnswerConfirmed ? true : false} 
													fullWidth 
													id="outlined-basic" 
													label="Correct answer" 
													variant="outlined"
													value={bet.correct_answer}
													onChange={(event) => edit_bet('correct_answer', event.target.value)}
												/>
											</div>
											<div>
												<Button disabled={correctAnswerConfirmed ? true : false} fullWidth variant="contained" onClick={() => {save_answer(bet.correct_answer, 'add'), setCorrectAnswerConfirmed(true)}}>CONFIRM</Button>
												{correctAnswerConfirmed &&
													<Button 
														fullWidth variant="contained" 
														onClick={() => {
															save_answer(bet.correct_answer, 'remove'),
															setCorrectAnswerConfirmed(false),
															setBet({...bet, correct_answer: ''})
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
											<AnswerOptions bet={bet} save_answer={save_answer} answer_options={bet.bet_data.answer_options} open_snackbar={open_snackbar}/>
										</div>
									</div>
								</div>
							</div>
							<Divider variant="middle" />
							<div className='new-poll-second-step-card-button'>
								{bet.bet_hash ?
									<Button fullWidth variant="contained" onClick={update_bet}>UPDATE BET</Button>
									:
									<Button fullWidth variant="contained" onClick={add_bet}>ADD BET</Button>
								}
							</div>
						</div>
					</React.Fragment>
				}
				{!createBetCard &&
					<React.Fragment>
						{(bets.length > 0) &&
							<React.Fragment>
								<div className='new-poll-second-step-list'>
									<div className='new-poll-second-step-list-title'>List of Bets</div>
									{bets.map((bet) => {
										return(
											<div key={bet.bet_hash} className='new-poll-second-step-list-card' onClick={() => set_bet(bet)}>
												<div className='new-poll-second-step-list-card-title'>{bet.bet_title}</div>
												<div className='new-poll-second-step-list-card-icon' onClick={() => remove_bet(bet)}>
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
				{!createBetCard &&
					<div className='new-poll-second-step-buttons-container'>
						<div className='new-poll-second-step-button' onClick={() => setStep('first')}>
							<Button fullWidth variant="contained">BACK</Button>
						</div>
						{bets.length !== 0 &&
							<div className='new-poll-second-step-button' onClick={() => setStep('third')}>
								<Button fullWidth variant="contained">NEXT</Button>
							</div>
						}
					</div>
				}
			</div>
		}
		{step === 'third' &&
			<div className='new-poll-third-step-background'>
				<div className='new-poll-third-step-photo'>
					<div className='new-poll-third-step-photo-title'>Last step...</div>
					<div className='new-poll-third-step-photo-subtitle'>Upload an image for your poll (OPTIONAL)</div>
					<UploadImageComponent setImage={setImage} image={image}/>
				</div>
				<div className='new-poll-third-step-buttons-container'>
					<div className='new-poll-third-step-button' onClick={() => setStep('second')}>
						<Button fullWidth variant="contained">BACK</Button>
					</div>
					{bets.length !== 0 &&
						<div className='new-poll-third-step-button new-poll-third-step-button-confirm' onClick={() => setStep('finish')}>
							<Button fullWidth variant="contained" onClick={create_poll}>SAVE POLL</Button>
						</div>
					}
				</div>
			</div>
		}
		<Snackbar
			autoHideDuration={2000}
			open={snackbarOpen}
			message={snackbarMessage}
			onClose={() => setSnackbarOpen(false)}
		/>
		<Backdrop
			open={loading}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
		</React.Fragment>
	)
}
export default NewPoll;
