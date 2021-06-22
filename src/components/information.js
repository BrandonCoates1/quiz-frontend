import React from "react";
import { Link } from "react-router-dom";


const Information = ({ user }) => {
	return (
		<>
			<div className="info">
				<h1>Welcome to our trivia website!</h1>
				<p>Select from a variety of topics to test your knowledge. <br/>
				</p>
				{user ? 
				<Link to="/quiz"><button type="button" className="login-button">Select a quiz</button></Link> : 
				<Link to="/login"><button type="button" className="login-button">Login to continue</button></Link>}
			</div>
		</>
	);
}

export default Information;