import React, { useEffect, useState } from "react";
import { decode } from "html-entities";
import { Redirect } from "react-router-dom";

const Score = ({ quiz, setQuiz, answersGiven, setAnswersGiven }) => {
  const [score, setScore] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getScore();
  });

  const getScore = () => {
    let num = 0;
    for (let i = 0; i < answersGiven.length; i++) {
      if (answersGiven[i].answer === answersGiven[i].actualAnswer) {
        num = num + 10;
      }
    }
    setScore(num);
  }

  const eachQuestion = () => {
    return (
      answersGiven.map((item, index) => {
        return (
          <div className="question-score" key={index}>
            <p className="question-p">{`Q${index + 1} - ${decode(item.question)}`}</p>
            <p>{`You chose: ${item.answer}`}</p>
            <p>{`Actual answer: ${item.actualAnswer}`}</p>
            <p>{`Score: ${item.answer === item.actualAnswer ? 10 : 0}`}</p>
          </div>
        );
      })
    );
  }

  const handleShowButton = () => {
    setHidden(!hidden);
  }

  if (redirect) {
    return <Redirect to="/quiz"/>
  }

  return (
    <div className="container-score" style={!hidden ? {justifyContent: "center"} : null}>
      <h1 className="score-title">Your score for {quiz.name} is {score} / 100</h1>
      <button type="button" onClick={handleShowButton} className="show-button">{hidden ? "hide results" : "show results"}</button>
      {hidden ? eachQuestion() : null}
      <button type="button" onClick={() => { setRedirect(true); setQuiz(""); setAnswersGiven([]) }} className="play-again-button" style={!hidden ? {position: "absolute", bottom: 0} : null}>Play again?</button>
    </div>
  );
}

export default Score;