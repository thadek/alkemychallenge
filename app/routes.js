const express = require('express');
const router = express.Router();

//Controllers
const AuthController = require('./controllers/AuthController');
const MoviesController = require('./controllers/MoviesController');
const CharacterController = require('./controllers/CharacterController');

//Middleware
const auth = require('./middlewares/auth');

//Home
router.get('/',(req,res)=> res.json({ msg:"App Working - Alkemy Challenge NodeJs - Gabriel Pamich", documentationURL:"https://documenter.getpostman.com/view/15080099/UVJWrfnM"}));

// Auth routes
router.post('/auth/login',AuthController.login);
router.post('/auth/register', AuthController.register);

/* Movie Routes */
//GET
router.get('/movies', auth ,MoviesController.findAll)
router.get('/movies/:id', auth ,MoviesController.findById)
//POST
router.post('/movies',auth,MoviesController.createMovie)
//PUT
router.put('/movies',auth,MoviesController.updateMovie)
//DELETE
router.delete('/movies',auth,MoviesController.deleteMovie)


/* Character Routes */
//GET
router.get('/characters', auth ,CharacterController.findAll)
router.get('/characters/:id',auth,CharacterController.findById)
//POST
router.post('/characters', auth, CharacterController.createCharacter)
//PUT
router.put('/characters',auth,CharacterController.updateCharacter)
//DELETE
router.delete('/characters',auth,CharacterController.deletebyId)

module.exports = router;