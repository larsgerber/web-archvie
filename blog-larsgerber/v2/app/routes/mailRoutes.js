const { Router } = require('express');
const mailController = require('../controllers/mailController');

const router = Router();

router.post('/send', mailController.send_mail_post);

module.exports = router;