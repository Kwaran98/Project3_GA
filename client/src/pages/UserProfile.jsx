import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { FaCheckCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState();

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };

    getUser();
  }, []);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (e) => {
    try {
      e.preventDefault();
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("newConfirmPassword", newConfirmPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/users/edit-user`,
        userData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar_wrapper">
            <div className="profile__avatar">
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                alt=""
              />
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
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile__avatar_btn"
                onClick={changeAvatarHandler}
              >
                <FaCheckCircle />
              </button>
            )}
          </div>
          <h1 className="profile__name">{currentUser.name}</h1>

          {/* Form to update user details */}
          <form
            action=""
            className="form profile_form"
            onSubmit={updateUserDetails}
          >
            {error && <p className="form__error-message">{error}</p>}
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
              value={newConfirmPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            ></input>
            <button type="submit" className="btn primary">
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
