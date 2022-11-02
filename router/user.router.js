const router = require("express").Router()

const UserController = require('../controller/user.controller')


router.post('/create', UserController.createUser)
router.post('/findalluser', UserController.findAllUser)
router.post('/findoneuser/:id', UserController.findoneUser)
router.delete('/deleteuser/:id', UserController.deleteUser)
router.put('/updateuser/:id', UserController.updateUser)


module.exports = router;