
const takeAmoUser = (userId) => {
  const managers = APP.constant('managers');

  const user = managers[userId];

  console.log(user);

  return user || null;
}

module.exports = takeAmoUser;