// userStore.js
let users = [];

const addNewUser = (username, socketId) => {
  if (username) {
    console.log("addded");
    !users.some((user) => user.username === username) &&
      users.push({ username, socketId });
    // console.log("Added inner");
    // console.log(username);
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return users?.find((user) => user.username === username);
};

module.exports = {
  addNewUser,
  users,
  removeUser,
  getUser,
};
