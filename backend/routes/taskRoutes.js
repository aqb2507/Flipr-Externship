const express = require("express");
const router = express.Router();
const { addTask, getTasks } = require('../controllers/taskController')
const { protect } = require('../middlewares/jwtAuth')

router.post('/',protect, addTask)
router.get('/:empId', protect, getTasks)

module.exports = router;