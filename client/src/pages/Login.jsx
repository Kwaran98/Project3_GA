import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../context/userContext.js";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/users/login`,
        userData
      );
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://project3-ga-chi.vercel.app/login")
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          ></input>
          <button type="submit" className="btn blue">
            Login
          </button>
        </form>
        <small>
          Don't Have An Account? <Link to="/register">Sign Up!</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
