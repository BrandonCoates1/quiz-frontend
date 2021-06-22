import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Account = ({ user, setUser }) => {
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState("");

  const deleteAccount = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "http://localhost:3000"
        },
        body: JSON.stringify({ email: user.email })
      });
      
      if (response.status !== 200) {
        throw new Error("Server failed, retry");
      }
  
      let data = await response.json();
      if (data.response.affectedRows === 0) {
        throw new Error("Failed to delete");
      }
      setUser("");
    } catch (Error) {
      setError(Error);
    }
  } 

  if (!user) {
    return (
      <Redirect to="/login"/>
    )
  }

  if (redirect) return <Redirect to="/quiz"/>
  if (error) {
    console.log(error);
  }

  return (
    <div className="account">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button type="button" onClick={() => setRedirect(true)}>Go to quiz</button>
      <button type="button" onClick={() => setUser("")}>Logout</button>
      <button type="button" onClick={deleteAccount}>Delete Account</button>
      {error ? <p>{error.toString()}</p> : null}
    </div>
  )
}

export default Account;