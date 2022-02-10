import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const browserLanguage = navigator.language.slice(0, 2);
    await fetch(`https://eventplannerapi.azurewebsites.net/${browserLanguage}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        lastName: lastName,
        dateOfBirth: birthDate,
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => {
        setError(err);
      });
  }
  function handleInputChange(e) {
    e.preventDefault();
    const { id, value } = e.target;
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "dateOfBirth":
        setBirthDate(value);
        break;
      default:
        break;
    }

    password === confirmPassword
      ? setError("passwords don't match")
      : setError("");
  }

  const signInPage = `/${navigator.language.slice(0, 2)}/signin`;
  return (
    <div className="container">
      <img
        className="signSVG"
        src="/signInImage.svg"
        alt="girl drawing dreamer"
      />
      <div className="form-container">
        <h1>Sign in</h1>
        <h2>
          Already registered? <Link to={signInPage}>Sign in</Link>
        </h2>
        <form>
          <label htmlFor="email">email</label>
          <input type="text" id="email" onChange={handleInputChange} />
          <label htmlFor="password">password</label>
          <input type="password" id="password" onChange={handleInputChange} />
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleInputChange}
          />
          <label htmlFor="name">name</label>
          <input type="text" id="name" onChange={handleInputChange} />
          <label htmlFor="lastName">lastname</label>
          <input type="text" id="lastName" onChange={handleInputChange} />
          <label htmlFor="dateOfBirth">birthdate</label>
          <input type="date" id="dateOfBirth" onChange={handleInputChange} />
          <input type="submit" onClick={handleSubmit} value="Sign up" />
        </form>
        <p>{error}</p>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default SignIn;
