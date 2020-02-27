const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  tokenResponse(user, 200, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter email and password" });
  }

  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (!user) {
    return res.status(401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401);
  }
  tokenResponse(user, 200, res);
};

const tokenResponse = (user, statusCode, res) => {
  const token = user.getJWToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env_NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token
    });
};
