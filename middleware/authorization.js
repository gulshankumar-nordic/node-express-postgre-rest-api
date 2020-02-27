const jwt = require("jsonwebtoken");
const asynHandler = require("./async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const ENVCONFIG = require("../config/config");

exports.protect = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer ")
  ) {
    console.log("this is authorization " + req.headers.authorization);
    token = req.headers.authorization.split("Bearer ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  try {
    /*  //console.log(ENVCONFIG.jwt_secret);
    const decode = jwt.verify(token, ENVCONFIG.jwt_secret);
    console.log(decode.id);
    
    req.User = await User.findByPk(decoded.id);
    next(); */
    jwt.verify(token, ENVCONFIG.jwt_secret, async function(err, decoded) {
      if (err) {
        console.log(err);
      } else {
        req.user = await User.findByPk(decoded.id);
        next();
      }
    });
  } catch (err) {
    return next(new ErrorResponse("Not authorized", 401));
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User with rold ${req.user.role} is not authorize to access this action`,
          403
        )
      );
    }
    next();
  };
};
