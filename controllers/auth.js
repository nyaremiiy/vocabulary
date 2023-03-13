import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config.js';

export const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`email: ${email}\npassword: ${password}`);

    const isUsedEmail = await User.findOne({ email });

    if (isUsedEmail) {
      return res
        .status(300)
        .json({ message: 'Такий email уже зареєстрований, спробуйте інший.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email,
      password: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.secret,
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, wordList, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося зареєструвати користвача.',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: 'Даний email не зареєстрований.',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: 'Неправильний пароль.',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.secret,
      {
        expiresIn: '30d',
      }
    );

    res.json({
      token,
      user,
      message: 'Ви ввійшли в систему.',
    });
  } catch (error) {
    res.json({
      message: 'Помилка при авторизації.',
    });
  }
}