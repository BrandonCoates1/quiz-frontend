import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = ({ setUser }) => {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [error, setError] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const submitted = { email: emailInput, password: passwordInput };

		try {
			const response = await fetch("/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Origin": "http://localhost:3000"
				},
				body: JSON.stringify(submitted)
			});

			setEmailInput("");
			setPasswordInput("");

			if (response.status !== 200) {
				throw new Error("Failed to login");
			}

			const data = await response.json();
			setUser(data.user);
			setError("");
			setRedirect(true);
		} catch (Error) {
			setError(Error);
		}
	}

	const display = () => {
		if (error) {
			return <p>Login Failed!</p>
		} else if (redirect) {
			return <Redirect to="/account"/>
		}
	}

	return (
		<div className="container">
			<h1>Login</h1>
			<form onSubmit={handleSubmit} className="container-form">
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
				<input type="submit" name="submit" className="form-button" value="Submit" />
			</form>
			{display()}
			<p className="register-text">Don't have an account yet: <Link to="/register" className="link-text">Register here!</Link></p>
		</div>
	);
}

export default Login;