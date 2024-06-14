const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../Middleware/jwtMiddleware")
const userController=require("../Controller/userContrtoller")

router.post('/signup',userController.register)

router.post('/login',userController.login)

router.get('/users', jwtMiddleware, userController.listUsers);

router.get('/users/:id', jwtMiddleware, userController.getUserDetails);




module.exports = router