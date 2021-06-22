import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Register = () => {
	const [nameInput, setNameInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [passwordMatch, setPasswordMatch] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const submitted = { name: nameInput, email: emailInput, password: passwordInput };

		try {
			if (passwordMatch !== passwordInput) {
				throw new Error("Password do not match");
			} 
			
			if (!nameInput || !emailInput || !passwordInput) {
				throw new Error("Empty field");
			}

			const response = await fetch("http://localhost:5000/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Origin": "http://localhost:3000"
				},
				body: JSON.stringify(submitted)
			});

			setNameInput("");
			setEmailInput("");
			setPasswordInput("");
			setPasswordMatch("");

			if (response.status !== 200) {
				const error = await response.json();
				throw new Error(error.error.sqlMessage);
			}

			// const data = await response.json();
			setError("");
			setRedirect(true);
		} catch (Error) {
			setError(Error);
		}
	}

	const display = () => {
		if (error) {
			return <p>Registration Failed! <br />{error.toString()}</p>
		} else if (redirect) {
			return <Redirect to="/login"/>
		}
	}

	return (
		<div className="container">
			<h1>Register</h1>
			<form onSubmit={handleSubmit} className="container-form">
				<input type="text"
					name="name"
					placeholder="Enter your name here"
					className="bar"
					value={nameInput}
					onChange={(e) => { setNameInput(e.target.value) }} />
				<input type="text"
					name="email"
					placeholder="Enter your email here"
					className="bar"
					value={emailInput}
					onChange={(e) => { setEmailInput(e.target.value) }} />
				<input type="password"
					name="password"
					placeholder="Enter your password here"
					className="bar"
					value={passwordInput}
					onChange={(e) => { setPasswordInput(e.target.value) }} />
				<input type="password"
					name="passwordMatch"
					placeholder="Enter your password again"
					className="bar"
					value={passwordMatch}
					onChange={(e) => { setPasswordMatch(e.target.value) }} />
				<input type="submit" name="submit" className="form-button" value="Submit" />
			</form>
			{display()}
			<p className="login-text">Already have an account: <Link to="/login" className="link-text">Login here!</Link></p>
		</div>
	);
}

export default Register;