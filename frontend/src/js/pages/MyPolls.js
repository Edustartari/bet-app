import React, { Component } from 'react'
import 'styles/pages/MyPolls.css';
import new_baby from 'images/new-baby.jpg'
import default_poll_image from 'images/default_poll_image.png';

/* INCLUDE OPTIONS AT HEADER: 3 DOTS AT RIGHT TO DISPLAY: ACTIVE POLLS, ALL, FINISHED POLLS */

const MyPolls = ({ content }) => {
	console.log(content.poll_list)
	if (content.poll_list.length === 0){
		return (
			<div className="my-polls-background-empty">No bets yet...</div>
		)
	} else {
		return (
			<div className="my-polls-background">
				<div className="my-polls-container">
					{content.poll_list.map((element) => {

						let poll_image = "";
						try {
							poll_image = require('images//' + element.image + '.jpg');
							poll_image = poll_image.default;
						} catch (error) {
							poll_image = default_poll_image;
						}

						return(
							<a key={element.hash_id} href={"/" + element.hash_id} className="my-polls-card">
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
							</a>
						)
					})}
				</div>
			</div>
		)
	}
}
export default MyPolls;