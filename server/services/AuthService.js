const User = require("../models/User");
const bcrypt = require("bcryptjs");

class AuthService {
  async register(username, email, password) {
    const exists = await User.findOne({ email });

    if (exists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async saveRefreshToken(userId, token) {
    await User.findByIdAndUpdate(userId, {
      refreshToken: token,
    });
  }

  async removeRefreshToken(userId) {
    await User.findByIdAndUpdate(userId, {
      refreshToken: "",
    });
  }

  async findById(id) {
    return await User.findById(id);
  }
}

module.exports = new AuthService();
