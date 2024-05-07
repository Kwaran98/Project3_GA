import { useContext, useEffect, useState } from "react";
import React from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";


const DeletePost = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  //You have this token when you are logged in and you do not have the token when you are logged out

  //redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return <Link className="btn sm danger">Delete</Link>;
};

export default DeletePost;
