const express = require('express');
const {registerUser, loginUser, testController} = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');
const authorizeRole = require('../Middleware/authorizationMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


router.get("/test", authMiddleware, authorizeRole('admin'), testController)

//protected route path for user
router.get("/auth-user", authMiddleware, (req, res) => {
    res.status(200).send({ ok: true });
  });

// Protected route path for admin users
router.get("/auth-admin", authMiddleware, authorizeRole('admin'), (req, res) => {
    res.status(200).send({ ok: true });
});

module.exports = router;