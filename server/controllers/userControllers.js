//=====================REGISTER A NEW USER===================//
//POST : api/users/register
//UNPROTECTED
const registerUser = async (req, res, next) => {
  res.json("Register User");
};

//=====================LOGIN A REGISTERED USER===================//
//POST : api/users/login
//UNPROTECTED
const loginUser = async (req, res, next) => {
  res.json("Login User");
};

//=====================USER PROFILE===================//
//POST : api/users/:id
//PROTECTED
const getUser = async (req, res, next) => {
  res.json("User Profile");
};

//=====================CHANGE USER AVATAR (profile picture)===================//
//POST : api/users/change-avatar
//PROTECTED
const changeAvatar = async (req, res, next) => {
  res.json("Change user Avatar");
};

//=====================EDIT USER DETAILS (from profile)===================//
//POST : api/users/edit-user
//PROTECTED
const editUser = async (req, res, next) => {
  res.json("Edit User Details");
};

//=====================GET AUTHORS===================//
//POST : api/users/authors
//PROTECTED
const getAuthors = async (req, res, next) => {
  res.json("Get all users/authors");
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  getAuthors,
  editUser,
};
