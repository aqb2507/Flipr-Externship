const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser, getEmployees } = require('../controllers/userController')
const { protect, adminProtect } = require('../middlewares/jwtAuth')

router.post('/',registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
router.get('/employees', adminProtect, getEmployees)

module.exports = router;