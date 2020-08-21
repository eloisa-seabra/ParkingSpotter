const User = require('./../models/user');

const deserializeUser = (request, response, next) => {
  // Make the user object available to any route handler or middleware
  // after this
  const id = request.session.userId;

  User.findById(id)
    .select('_id name email')
    .then(user => {
      request.user = user;
      next();
    })
    .catch(error => {
      next(error);
    });
};

module.exports = deserializeUser;
