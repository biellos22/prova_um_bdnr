const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;