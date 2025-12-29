const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const bcrypt = require("bcryptjs");
const emailSender = require("../utils/email-sender,");
const { accessToken, refreshToken } = require("../utils/create.token");
const register = async (req, res, next) => {
  try {
    const { user_name, email, password } = req.body;

    const foundeduser = await AuthSchema.findOne({ email });

    if (foundeduser) {
      throw CustomErrorHandler.UnAuthorized(" User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const time = Date.now() + 120000;

    await AuthSchema.create({
      user_name,
      email,
      password: hashPassword,
      otp: randomNumbers,
      otpTime: time,
    });

    await emailSender(randomNumbers, email);

    res.status(201).json({
      message: "registerd!",
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const foundeduser = await AuthSchema.findOne({ email });

    if (!foundeduser) {
      throw CustomErrorHandler.NotFound(" user not found");
    }

    const time = Date.now();

    if (foundeduser.otpTime < time) {
      throw CustomErrorHandler.BadRequest("otp time expired");
    }

    if (foundeduser.otp !== otp) {
      throw CustomErrorHandler.BadRequest("Wrong otp");
    }

    await AuthSchema.findByIdAndUpdate(foundeduser._id, {
      isVerified: true,
    });

    const payload = {
      user_name: foundeduser.user_name,
      email: foundeduser.email,
      role: foundeduser.role,
      id: foundeduser._id,
    };

    const access_token = accessToken(payload);
    const refresh_token = refreshToken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 100 * 60 * 15,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 3600 * 1000 * 24 * 15,
    });

    res.status(200).json({
      message: "Success",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

// resend code
// restartVerify

const resendCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    await emailSender(randomNumbers, email);

    const otptime = Date.now() + 120000;

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      otp: randomNumbers,
      otptime,
    });
    console.log(randomNumbers, email);

    res.status(201).json({
      message: "Kod qayta yuborildi va u ikki daqiqada kuchga ega",
      randomNumbers,
    });
  } catch (error) {
    next(error);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundeduser = await AuthSchema.findOne({ email });

    if (foundeduser) {
      throw CustomErrorHandler.UnAuthorized(" User already exists");
    }

    const compare = await bcrypt.compare(password, foundeduser.password);

    if (compare && foundeduser.isVerified) {
      const payload = {
        user_name: foundeduser.user_name,
        email: foundeduser.email,
        role: foundeduser.role,
        id: foundeduser._id,
      };

      const access_token = accessToken(payload);
      const refresh_token = refreshToken(payload);

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 100 * 60 * 15,
      });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 3600 * 1000 * 24 * 15,
      });

      res.status(200).json({
        message: "Success",
        access_token,
      });
    } else {
      throw CustomErrorHandler.UnAuthorized("Invalid password");
    }
  } catch (error) {
    next(error);
  }};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  } catch (error) {
    next(error);
  }};

const forgotPassword = async (req, res, next) => {
  try {
    const { email, otp, new_password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    if (!foundedUser.isVerified) {
      throw CustomErrorHandler.UnAuthorized("User was not verified");
    }

    const hashPassword = await bcrypt.hash(new_password, 12);

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      password: hashPassword,
    });

    res.status(200).json({
      message: "Password successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  resendCode,
  Login,
  verify,
  logout,
};
