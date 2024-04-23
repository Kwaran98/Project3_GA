import React from "react";
import { Link } from "react-router-dom";
import Avatar8 from "../Images/Coporate_Women.png";
import { useState } from "react";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar8);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/sdfsdf`} className="btn">
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar_wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            {/* {Form to update avatar} */}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg"
              />           
            </form>
          </div>
          <h1 className="profile__name">Mario Barber</h1>

          {/* Form to update user details */}
          <form action="" className="form profile_form">
            <p className="form__error-message">This is an error message</p>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            ></input>
            <button type="submit" className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
