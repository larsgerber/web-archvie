const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/create', requireAuth, blogController.blog_create_get);
router.get('/update/:id', requireAuth, blogController.blog_update_get);
router.put('/update/:id', requireAuth, blogController.blog_update_put);
router.get('/', blogController.blog_index);
router.post('/create', requireAuth, blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', requireAuth, blogController.blog_delete);

module.exports = router;