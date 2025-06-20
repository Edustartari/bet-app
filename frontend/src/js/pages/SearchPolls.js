import React, { useState, useEffect } from 'react';
import 'styles/pages/SearchPolls.css';
import new_baby from 'images/new-baby.jpg';
import f1 from 'images/f1.jpg';
import oscar from 'images/oscar.jpg';
import recipe from 'images/recipe.jpg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingComponent from '../components/LoadingComponent.js'

/* INCLUDE OPTIONS AT HEADER: 3 DOTS AT RIGHT TO DISPLAY: filter by date, by category, by active */
/* For each search, display only 20 first results, and then after user scrolls down an reach bottom load more 20 results and so on */

const SearchPolls = (props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(false);

	const fetch_data = async () => {
		setLoading(true);
		try {
			let response = await fetch('/search-polls');
			if(response.status === 200){
				let data = await response.json();
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			{loading && <LoadingComponent />}
			<div className="search-background">
				<div className="search-bar-container">
					<div className="search-bar">
						<TextField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} id="filled-basic" label="Search" variant="filled" />
					</div>
					<div className="search-button">
						<Button variant="contained" onClick={fetch_data}>SEARCH</Button>
					</div>
				</div>
				<div className="search-results-container">
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={new_baby}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">04-May-2022</div>
						</div>
					</div>
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={f1}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">27-Apr-2022</div>
						</div>
					</div>
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={oscar}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">19-Apr-2022</div>
						</div>
					</div>
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={recipe}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">17-Apr-2022</div>
						</div>
					</div>
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={new_baby}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">15-Apr-2022</div>
						</div>
					</div>
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={f1}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">10-Apr-2022</div>
						</div>
					</div>
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={oscar}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">08-Apr-2022</div>
						</div>
					</div>
					<div className="search-result-card">
						<div className="search-result-card-image">
							<img src={recipe}/>
						</div>
						<div className="search-result-card-info">
							<div className="search-result-card-info-title">Poll name</div>
							<div className="search-result-card-info-date">06-Apr-2022</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default SearchPolls;