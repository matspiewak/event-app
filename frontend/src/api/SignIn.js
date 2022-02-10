import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [response, setResponse] = useState(); 

  async function handleSubmit(e) {
    e.preventDefault();

    const browserLanguage = navigator.language.slice(0, 2);
    await fetch(`https://eventplannerapi.azurewebsites.net/${browserLanguage}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((response) => setResponse(response.message))
      .catch((err) => {
        setError(err);
      });
  }
  function handleInputChange(e) {
    e.preventDefault();
    const { id, value } = e.target;
    id === "email" ? setEmail(value) : setPassword(value);
  }

  const signUpPage = `/${navigator.language.slice(0, 2)}/signup`;
  return (
    <div className="container">
      <img className="signSVG" src="/signInImage.svg" alt="girl drawing dreamer" />
      <div className="form-container">
        <h1>Sign in</h1>
        <h2>
          Don't have an account? <Link to={signUpPage}>Sign up</Link>
        </h2>
        <form>
          <label htmlFor="email">email</label>
          <input type="text" id="email" onChange={handleInputChange} />
          <label htmlFor="password">password</label>
          <input type="password" id="password" onChange={handleInputChange} />
          <input type="submit" onClick={handleSubmit} value="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
