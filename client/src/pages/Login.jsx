import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form">
          <p className="form__error-message">This is an error message</p>
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
          <button type="submit" className='btn blue'>Login</button>
        </form>
        <small>Don't Have An Account? <Link to="/register">Sign Up!</Link></small>
      </div>
    </section>
  );
}

export default Login
