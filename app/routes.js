const express = require('express');
const router = express.Router();

//Controllers
const UserController = require('./controllers/UserController');
const MoviesController = require('./controllers/MoviesController');
const CharacterController = require('./controllers/CharacterController');
const RoleController = require('./controllers/RoleController')

//Middleware
const auth = require('./middlewares/auth');
const hasRole = require('./middlewares/hasRole')

//Home
router.get('/',(req,res)=> res.json({ msg:"App Working - Alkemy Challenge NodeJs - Gabriel Pamich", documentationURL:"https://documenter.getpostman.com/view/15080099/UVJWrfnM"}));

// Auth routes
router.post('/auth/login',UserController.login);
router.post('/auth/register', UserController.register);

/* Movie Routes */
//GET
router.get('/movies', auth ,MoviesController.findAll)
router.get('/movies/:id', auth ,MoviesController.findById)
//POST
router.post('/movies',auth,hasRole('admin'),MoviesController.createMovie)
//PUT
router.put('/movies',auth,hasRole('admin'),MoviesController.updateMovie)
//DELETE
router.delete('/movies/:id',auth,hasRole('admin'),MoviesController.deleteMovie)


/* Character Routes */
//GET
router.get('/characters', auth,CharacterController.findAll)
router.get('/characters/:id',auth,CharacterController.findById)
//POST
router.post('/characters', auth,hasRole('admin'), CharacterController.createCharacter)
//PUT
router.put('/characters',auth,hasRole('admin'),CharacterController.updateCharacter)
//DELETE
router.delete('/characters/:id',auth,hasRole('admin'),CharacterController.deletebyId)


/* Role Routes */ 
//GET
router.get('/roles',auth,hasRole('admin'),RoleController.getRoles)
//POST
router.post('/roles',auth,hasRole('admin'),RoleController.createRole)
//PUT
router.put('/roles',auth,hasRole('admin'),RoleController.modifyRole)
//DELETE
router.delete('/roles/:id',auth,hasRole('admin'),RoleController.deleteRole)

/*User Routes*/
//GET
router.get('/users',auth,hasRole('admin'),UserController.getUsers)
//Roles
router.get('/users/:id/roles',auth,hasRole('admin'),UserController.getUserRoles)

module.exports = router;