const express = require('express');
const router = express.Router();

//Controllers
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController');
const MoviesController = require('./controllers/MoviesController');
const CharacterController = require('./controllers/CharacterController');
const RoleController = require('./controllers/RoleController')

//Middleware
const auth = require('./middlewares/auth');
const hasRoles = require('./middlewares/hasRoles')

//Home
router.get('/',(req,res)=> {res.json({ msg:"Hi! App Working - Alkemy Challenge NodeJs - Gabriel Pamich", 
Documentation:{
    Swagger: "http://localhost:9116/docs",
    PostMan:"https://documenter.getpostman.com/view/15080099/UVJWrfnM"
}})});

// Auth routes
router.post('/auth/login',AuthController.login);
router.post('/auth/register', AuthController.register);

/* Movie Routes */
//GET
router.get('/movies', auth ,MoviesController.findAll)
router.get('/movies/:id', auth ,MoviesController.findById)
//POST
router.post('/movies',auth,hasRoles('admin'),MoviesController.createMovie)
//PUT
router.put('/movies',auth,hasRoles('admin'),MoviesController.updateMovie)
//DELETE
router.delete('/movies/:id',auth,hasRoles('admin'),MoviesController.deleteMovie)


/* Character Routes */
//GET
router.get('/characters', auth,CharacterController.findAll)
router.get('/characters/:id',auth,CharacterController.findById)
//POST
router.post('/characters', auth,hasRoles('admin'), CharacterController.createCharacter)
//PUT
router.put('/characters',auth,hasRoles('admin'),CharacterController.updateCharacter)
//DELETE
router.delete('/characters/:id',auth,hasRoles('admin'),CharacterController.deletebyId)


/* Role Routes */ 
//GET
router.get('/roles',auth,hasRoles('admin'),RoleController.getRoles)
//POST
router.post('/roles',auth,hasRoles('admin'),RoleController.createRole)
//PUT
router.put('/roles',auth,hasRoles('admin'),RoleController.modifyRole)
//DELETE
router.delete('/roles/:id',auth,hasRoles('admin'),RoleController.deleteRole)

/*User Routes*/
//GET
router.get('/users',auth,hasRoles('admin'),UserController.getUsers)
//Get User Roles
router.get('/users/:id/roles',auth,hasRoles('admin'),UserController.getUserRoles)
//PUT User Roles
router.put('/users/:id/roles',auth,hasRoles('admin'),UserController.setUserRoles)

module.exports = router;