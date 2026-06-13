const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../services/AuthService");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await authService.register(username, email, password);
      res.status(201).json({
        message: "User created",
        user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authService.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await authService.saveRefreshToken(user._id, refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        accessToken,
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async refresh(req, res) {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.sendStatus(401);
      }

      const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
      const user = await authService.findById(decoded.id);

      if (!user) {
        return res.sendStatus(403);
      }

      const accessToken = generateAccessToken(user);

      res.json({
        accessToken,
      });
    } catch {
      res.sendStatus(403);
    }
  }

  async logout(req, res) {
    try {
      const token = req.cookies.refreshToken;
      if (token) {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        await authService.removeRefreshToken(decoded.id);
      }

      res.clearCookie("refreshToken");
      res.json({
        message: "Logged out",
      });
    } catch {
      res.sendStatus(200);
    }
  }
}

module.exports = new AuthController();
