import React, { Component } from 'react'
import './styles/MyPolls.css';
import new_baby from '../../static/img/new-baby.jpg'
import f1 from '../../static/img/f1.jpg'
import oscar from '../../static/img/oscar.jpg'
import recipe from '../../static/img/recipe.jpg'

/* INCLUDE OPTIONS AT HEADER: 3 DOTS AT RIGHT TO DISPLAY: ACTIVE POLLS, ALL, FINISHED POLLS */

export default class MyPolls extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render() {
		console.log(content.poll_list)
		return (
			<div className="my-polls-background">
				<div className="my-polls-container">
					{content.poll_list.map((element) => {
						return(
							<a key={element.hash_id} href={"/" + element.hash_id} className="my-polls-card">
								<div className="my-polls-card-left">
									<div className="my-polls-card-left-image">
										<img src={f1}/>
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
							// <a href={"/" + element.hash_id}>
							// 	<div key={element.hash_id} className="my-polls-card">
							// 		<div className="my-polls-card-left">
							// 			<div className="my-polls-card-left-image">
							// 				<img src={f1}/>
							// 			</div>
							// 			<div className="my-polls-card-left-title">{element.name}</div>
							// 		</div>
							// 		<div className="my-polls-card-right">
							// 			<div className="my-polls-card-right-number">{element.position}º</div>
							// 			<div className="my-polls-card-right-icon">
							// 				<span className="material-icons">chevron_right</span>
							// 			</div>
							// 		</div>
							// 	</div>
							// </a>
						)
					})}
				</div>
			</div>
		)
	}
}
