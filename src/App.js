import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Information from "./components/information";
import QuizChoice from "./components/quizChoice";
import Score from "./components/quizScore";
import Quiz from "./components/quizPlay";
import Account from "./components/account";
import './App.css';

const App = () => {
  const [user, setUser] = useState("");
  const [quiz, setQuiz] = useState("");
  const [answersGiven, setAnswersGiven] = useState([]);
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    toggleDarkmode();
  });

  const toggleDarkmode = () => {
    let root = document.documentElement;
    if (darkmode) {
      root.style.setProperty("--bgr-color", "rgb(17, 17, 17)");
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--border-bottom", "rgba(255, 255, 255, 0.5)");
      root.style.setProperty("--placeholder-text", "rgba(255, 255, 255, 0.5)");
      root.style.setProperty("--button-bgr-color", "rgb(41, 41, 41)");
    } else {
      root.style.setProperty("--bgr-color", "white");
      root.style.setProperty("--text-color", "black");
      root.style.setProperty("--border-bottom", "rgba(0, 0, 0, 0.5)");
      root.style.setProperty("--placeholder-text", "rgba(0, 0, 0, 0.5)");
      root.style.setProperty("--button-bgr-color", "rgb(220, 220, 220)");
    }
  }

  return (
    <div className="main">
      <Router>
        <div className="navbar">
          <button type="button" onClick={() => setDarkmode(!darkmode)} className="darkmode">{darkmode ? "lightmode" : "darkmode"}</button>
          <ul>
            <li>
              <Link to="/" className="navbar-item"  onClick={() => { setQuiz(""); setAnswersGiven([]) }}>Home</Link>
            </li>
            {user ?
              <>
                <li>
                  <Link to="/quiz" className="navbar-item" onClick={() => { setQuiz(""); setAnswersGiven([]) }}>Quiz</Link>
                </li>
                <li>
                  <Link to="/account" className="navbar-item">Account</Link>
                </li> 
              </> :
              <>
                <li>
                  <Link to="/login" className="navbar-item">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="navbar-item">Register</Link>
                </li>
              </>}
          </ul>
        </div>

        <Switch>
          <Route path="/quiz/play">
            <Quiz quiz={quiz} answersGiven={answersGiven} setAnswersGiven={setAnswersGiven}/>
          </Route>
          <Route path="/quiz/score">
            <Score quiz={quiz} setQuiz={setQuiz} answersGiven={answersGiven} setAnswersGiven={setAnswersGiven}/>
          </Route>
          <Route path="/quiz">
            <QuizChoice setQuiz={setQuiz}/>
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/account">
            <Account user={user} setUser={setUser} />
          </Route>
          <Route path="/">
            <Information user={user}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
