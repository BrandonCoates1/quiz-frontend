import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const QuizChoice = ({ setQuiz }) => {
  const [redirect, setRedirect] = useState(false);
  const [category, setCategory] = useState([]);
  const [showAmount, setShowAmount] = useState([0, 8]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories();
  });

  const getCategories = async () => {
    setError(false);
    try {
      let response = await fetch("https://opentdb.com/api_category.php");
      if (response.status !== 200) {
        throw new Error("failed to fetch categories");
      }

      let data = await response.json();
      setCategory(data.trivia_categories);

    } catch (Error) {
      console.log(Error);
      setError(Error);
    }
  }

  const handleButton = (event) => {
    setQuiz({
      name: event.target.name,
      category: event.target.value
    });
    setRedirect(true);
  }

  const handleNavRight = () => {
    if (showAmount[1] !== 24) {
      setShowAmount(showAmount.map((item) => {
          return item + 8;
        })
      );
    } else {
      setShowAmount([0, 8]);
    }
  }

  const handleNavLeft = () => {
    if (showAmount[1] !== 8) {
      setShowAmount(showAmount.map((item) => {
          return item - 8;
        })
      );
    } else {
      setShowAmount([16, 24]);
    }
  }

  const eachQuiz = () => {
    if (error) {
      getCategories();
    }
    return (
      category.filter((item, index) => index >= showAmount[0] && index < showAmount[1]).map((item, index) => {
        return (
          <button className="card" onClick={handleButton} name={item.name} value={item.id} key={index}>
            <div className="card-content">
              <h2>{item.name}</h2>
              <p>This is a quiz topic</p>
              <p>Click to select {item.name}</p>
            </div>
          </button>
        );
      })
    );
  }

  if (redirect) {
    return (
      <Redirect to="/quiz/play" />
    )
  }

  return (
    <>
      <h1 className="quiz-title">Select a quiz</h1>
      <div className="container-choice">
        <button type="button" className="scroll-button" onClick={handleNavLeft}>{"<"}</button>
        <div className="quiz-choice">
          {eachQuiz()}
        </div>
        <button type="button" className="scroll-button" onClick={handleNavRight}>{">"}</button>
      </div>
    </>
  )
}

export default QuizChoice;