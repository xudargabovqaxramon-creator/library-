const UserSchema = require("../schema/user.schema");
const bcrypt = require("bcryptjs");
const tokenGenerete = require("../utils/create.token");

const Registr = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const exists = await UserSchema.findOne({ email });

    if (exists) {
      return res.status(409).json({ message: "User allaqachon mavjud" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await UserSchema.create({ user_name, email, password: hashPassword });

    res.status(201).json({
      message: "registered",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    const decode = await bcrypt.compare(password, user.password);
    if (!decode) {
      return res.status(401).json({ message: "parol not'ogri" });
    }

    const payload = { id: user._id, role: user.role };
    const token = tokenGenerete(payload);

    res.status(200).json({
      message: "Login muvaffaqiyatli",
      token,
      user: {
        id: user._id,
        user_name: user.user_name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  Registr,
  Login,
};
