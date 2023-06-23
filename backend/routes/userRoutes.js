const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getEmployees,
} = require('../controllers/userController');
const { protect, adminProtect } = require('../middlewares/jwtAuth');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.get('/employees', adminProtect, getEmployees);
router.route('/:id')
    .put(protect, updateUser)
    .delete(adminProtect, deleteUser);

module.exports = router;
