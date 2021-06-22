import React, { useEffect, useState } from "react";
import { decode } from "html-entities";
import { Redirect } from "react-router-dom";

const Quiz = ({ quiz, answersGiven, setAnswersGiven }) => {
  const [quizData, setQuizData] = useState([{}]);
  const [question, setQuestion] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getApi = async () => {
      setError("");
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${quiz.category}&type=boolean`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch the questions");
        }
  
        const data = await response.json();
        setQuizData(data.results);
      } catch (Error) {
        setError(Error);
      }
    }

    getApi();
  }, [quiz]);

  const handleAnswerButton = (item, event) => {
    setAnswersGiven([...answersGiven, {question: item.question, answer: event.target.value, actualAnswer: item.correct_answer}]);
    if (question === 9) {
      return setRedirect(true)
    }
    setQuestion(question + 1);
  }

  const displayQuestion = () => {
    return (
      quizData.filter((item, index) => index === question).map((item, index) => {
        return (
          <div className="container-question" key={index}>
            <h2 className="question">{`Q${question + 1}. `}{decode(item.question)}</h2>
            <button type="button" className="answer-true" value="True" onClick={(event) => handleAnswerButton(item, event)}>True</button>
            <button type="button" className="answer-false" value="False" onClick={(event) => handleAnswerButton(item, event)}>False</button>
          </div>
        );
      })
    );
  }

  if (error) {
    return <p>Error</p>
  }

  if (redirect) {
    return <Redirect to="/quiz/score"/>
  }

  return (
    <div className="container-play">
      <h1 className="quiz-title">{quiz.name}</h1>
      {displayQuestion()}
    </div>
  )
}

export default Quiz;