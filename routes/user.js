const express = require("express")
const routes = express.Router();

const userController = require("../controller/user")


routes.post('/signup', userController.signUp)
routes.post('/login', userController.login)
routes.get('/getuser', userController.getUser)
routes.get('/getuserpagination', userController.getUserPagination)
routes.get('/edit', userController.sendUniqueBaseddata)
routes.put('/update', userController.updateUniqueBaseddata)
routes.delete('/delete', userController.deleteUniqueBaseddata)
routes.get('/search', userController.searchData)

module.exports = routes
