import React from 'react';
import { Link } from 'react-router-dom';
import IndianCoder from "../Images/IndianCoder.png";

const PostAuthor = () => {
  return (
    <div>
      <Link to={`/posts/users/sdfsdf`} className="post__author">
        <div className="post__author-avatar">
            <img src={IndianCoder} alt="" />
        </div>
        <div className="post__author-details">
            <h5>By: Leonard Ang</h5>
            <small>Just Now</small>
        </div>
      </Link>
    </div>
  )
}

export default PostAuthor
