import React, { Component } from 'react'
import './styles/MyPolls.css';
import new_baby from '../../static/img/new-baby.jpg'
import f1 from '../../static/img/f1.jpg'
import oscar from '../../static/img/oscar.jpg'
import recipe from '../../static/img/recipe.jpg'

/* INCLUDE OPTIONS AT HEADER: 3 DOTS AT RIGHT TO DISPLAY: ACTIVE POLLS, ALL, FINISHED POLLS */

export default class MyPolls extends Component {
	render() {
		return (
			<div className="my-polls-background">
				<div className="my-polls-container">
					<div className="my-polls-card">
						<div className="my-polls-card-left">
							<div className="my-polls-card-left-image">
								<img src={recipe}/>
							</div>
							<div className="my-polls-card-left-title">Best recipe</div>
						</div>
						<div className="my-polls-card-right">
							<div className="my-polls-card-right-number">12º</div>
							<div className="my-polls-card-right-icon">
								<span className="material-icons">chevron_right</span>
							</div>
						</div>
					</div>
					<div className="my-polls-card">
						<div className="my-polls-card-left">
							<div className="my-polls-card-left-image">
								<img src={new_baby}/>
							</div>
							<div className="my-polls-card-left-title">Boy or girl?</div>
						</div>
						<div className="my-polls-card-right">
							<div className="my-polls-card-right-number"></div>
							<div className="my-polls-card-right-icon">
								<span className="material-icons">chevron_right</span>
							</div>
						</div>
					</div>
					<div className="my-polls-card">
						<div className="my-polls-card-left">
							<div className="my-polls-card-left-image">
								<img src={f1}/>
							</div>
							<div className="my-polls-card-left-title">F1 championship</div>
						</div>
						<div className="my-polls-card-right">
							<div className="my-polls-card-right-number">8º</div>
							<div className="my-polls-card-right-icon">
								<span className="material-icons">chevron_right</span>
							</div>
						</div>
					</div>
					<div className="my-polls-card">
						<div className="my-polls-card-left">
							<div className="my-polls-card-left-image">
								<img src={oscar}/>
							</div>
							<div className="my-polls-card-left-title">Oscar prize</div>
						</div>
						<div className="my-polls-card-right">
							<div className="my-polls-card-right-number">4º</div>
							<div className="my-polls-card-right-icon">
								<span className="material-icons">chevron_right</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
