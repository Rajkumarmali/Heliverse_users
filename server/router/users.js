const express = require('express');
const { postUserController, getUserController, getUserByIdController, updateUserController, deletUserController } = require('../controller/UserController');
const router = express.Router();


router.post('/users', postUserController)
router.get('/users', getUserController)
router.get('/users/:id', getUserByIdController)
router.put('/users/:id', updateUserController)
router.delete('/users/:id', deletUserController)



module.exports = router