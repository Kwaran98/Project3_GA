import React, { useState } from "react";
import { Link } from "react-router-dom";

//Authors
import Avatar1 from "../Images/Coding_Women.png";
import Avatar2 from "../Images/EuropeanWomen.png";
import Avatar3 from "../Images/Coporate_Women.png";
import Avatar4 from "../Images/ChineseWomen.jpg";
import Avatar5 from "../Images/Latin_Man.jpg";

const authorsData = [
  { id: 1, avatar: Avatar1, name: "Ernest Achiever", posts: 3 },
  { id: 2, avatar: Avatar2, name: "Jane Green", posts: 5 },
  { id: 3, avatar: Avatar3, name: "Osmane Dembele", posts: 2 },
  { id: 4, avatar: Avatar4, name: "Anne Hathway", posts: 1 },
  { id: 5, avatar: Avatar5, name: "Normandie", posts: 0 },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ id, avatar, name, posts }) => {
            return (
              <Link key={id} to={`/posts/users/${id}`} className="author">
                <div className="author__avatar">
                  <img src={avatar} alt={`Image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No Users Or Authors Found.</h2>
      )}
    </section>
  );
};

export default Authors;
