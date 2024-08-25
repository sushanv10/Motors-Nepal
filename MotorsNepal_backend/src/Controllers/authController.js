const User = require('../Models/authUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userProfile = require('../Models/userProfile');

dotenv.config(); // Load environment variables

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    // Create profile for the new user
    const newProfile = new userProfile({ user: user._id });
    await newProfile.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Generate JWT token and send the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ msg: 'Error generating token' });
        }

        res.status(201).json({
          msg: "User registered successfully",
          token,
          userDetails: user,
          userProfile: newProfile,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Generate JWT token and send the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ msg: 'Error generating token' });
        }

        res.json({
          msg: "User login successful",
          token,
          userDetails: user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
 const testController = (req, res) => {
  try {
  res.send('Protected Route');
} catch (error) {
  console.error(error);
  res.send({error});
  }
}

module.exports = {
  registerUser,
  loginUser,
  testController
};
