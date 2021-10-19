const router = require('express').Router()
const controller = require('../controllers/post')

router.get('/get-all-post', controller.getAllPost)
router.post('/insert-new-post', controller.insertNewPost)
router.put('/update-post', controller.updatePost)
router.put('/delete-post', controller.deletePost)
router.post('/upload-image', controller.uploadImage)

module.exports = router
