import { useContext, useEffect, useState } from "react";
import React from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  //You have this token when you are logged in and you do not have the token when you are logged out

  //redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Could not delete the post");
    }
  };

  if(isLoading){
    return <Loader />
  }

  return (
    <Link className="btn sm danger" onClick={() => removePost(id)}>
      Delete
    </Link>
  );
};

export default DeletePost;
