const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = Router();

// //api/auth/register
router.post(
  "/register",
  [
    check("email", "Не корректный e-mail").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при регистрации",
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существет" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.statut(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, попробуй снова " });
    }
  }
);

// //api/auth/login
router.post("/login", 
[
    check
],
async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некоректные данные при входе в систему",
      });
    }

      
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуй снова " });
  }
});

module.exports = router;
