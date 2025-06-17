import React, { Component, useState, useEffect } from 'react'
import 'styles/pages/MyPolls.css';
import new_baby from 'images/new-baby.jpg'
import default_poll_image from 'images/default_poll_image.png';
import LoadingComponent from '../components/LoadingComponent.js'
import { Link } from "react-router-dom";

/* INCLUDE OPTIONS AT HEADER: 3 DOTS AT RIGHT TO DISPLAY: ACTIVE POLLS, ALL, FINISHED POLLS */

const MyPolls = (props) => {
	const [loading, setLoading] = useState(true);	
	const [pollList, setPollList] = useState([]);	

	console.log('MyPolls component props:', props);

	useEffect(() => {
		const fetch_data = async () => {
			try {
				let response = await fetch('/my-polls');
				console.log('response:', response);
				if(response.status === 200){
					let data = await response.json();
					console.log('Fetched data:', data);
					setPollList(data.poll_list);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		}
		fetch_data()
	}, [])

	return (
		<>
			{loading && <LoadingComponent />}
			{pollList.length === 0 &&
				<div className="my-polls-background-empty">No bets yet...</div>
			}
			{pollList.length > 0 &&
				<div className="my-polls-background">
					<div className="my-polls-container">
						{pollList.map((element) => {

							let poll_image = "";
							try {
								poll_image = require('images/' + element.image + '.jpg');
								poll_image = poll_image.default;
							} catch (error) {
								poll_image = default_poll_image;
							}

							return(
								<Link key={element.hash_id} to={"/poll/" + element.hash_id} className="my-polls-card">
									<div className="my-polls-card-left">
										<div className="my-polls-card-left-image">
											<img src={poll_image}/>
										</div>
										<div className="my-polls-card-left-title">{element.name}</div>
									</div>
									<div className="my-polls-card-right">
										<div className="my-polls-card-right-number">{element.position ? element.position + 'º' : '-'}</div>
										<div className="my-polls-card-right-icon">
											<span className="material-icons">chevron_right</span>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				</div>
			}
		</>
	)
}
export default MyPolls;