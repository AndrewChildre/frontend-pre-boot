import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { APIURL } from './config.js';

const Fitness = ({ match }) => {
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);
	const [fitness, setFitness] = useState(null);

	useEffect(() => {
		const url = `${APIURL}/results/${match.params.id}`;
		fetch(url)
			.then((response) => response.json())
			.then(setFitness)
			.catch(() => {
				// Update the state if there was an error
				// so we can give feedback to the user!
				setError(true);
			});
	}, []);

	const onDeleteFitness = (event) => {
		const url = `${APIURL}/results/${match.params.id}`;
		fetch(url, { method: 'DELETE' })
			.then((res) => {
				setDeleted(true);
			})
			.catch(console.error);
	};
	// If we deleted the movie, redirect back to the movies list
	if (deleted) {
		return <Redirect to='/results' />;
	}

	// Check if there was an error
	// If there is give the user feedback!
	if (error) {
		return <div>Sorry, there was a problem getting the movies</div>;
	}

	// Check if we have our movies
	// Display "Loading..." if not
	if (!fitness) {
		return <div>Loading...</div>;
	}

	// If none of the if statements ran
	return (
		<div>
			<h3>Title: {fitness.name}</h3>
			<p>Director: {fitness.pillups}</p>
			<button onClick={onDeleteFitness}>Delete Movie</button>
			<Link to={`/results/${match.params.id}/edit`}>Update Movie</Link>
		</div>
	);
};

export default Fitness;