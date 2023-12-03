const express = require('express');
const { createTeamConteroller, getTeamDetailController } = require('../controller/TeamController');
const router = express.Router();

router.post('/create', createTeamConteroller)
router.get('/deatil', getTeamDetailController)

module.exports = router