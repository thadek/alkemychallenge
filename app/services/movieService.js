const MovieRepository = require('../repositories/MovieRepository')
const rp = new MovieRepository();
const vs = require('./validationService')
const responseHandler = require('./responseHandler')
const cs = require('./characterService');
const { sequelizeErrorParser } = require('./errorService');


const createMovie = async (movie) => {
    try {
    const validation = vs.validateMovie(movie);
    if (validation.error) return responseHandler.sendResponse(400, validation.error)
    const validatedCharArray = await cs.processArray(movie.Characters)
    if (validatedCharArray.error) return responseHandler.sendResponse(400, { msg: "Movie not created. CharacterService has detected a problem with CharactersArray.", CharacterServiceResponse: validatedCharArray })
    const repoResponse = await rp.findOrCreate(movie).catch(error => { return { error: sequelizeErrorParser(error) } });
    if (repoResponse.error) return responseHandler.sendResponse(500, repoResponse.error)
    if (!repoResponse[1]) {
        if (validatedCharArray.newCharacters.added.length) { return responseHandler.sendResponse(500, { msg: `The movie with title ${movie.title} already exists in database with id: ${repoResponse[0].id}, however the characterArray processing has been created new Characters.`,CharacterServiceResponse: validatedCharArray.newCharacters }) }
        return responseHandler.sendResponse(500, { msg: `The movie with title ${movie.title} already exists in database with id: ${repoResponse[0].id}.` })
    }
    const movieCreated = repoResponse[0];
    if (validatedCharArray.existentVerified) await movieCreated.addCharacters(validatedCharArray.existentVerified)
    if(validatedCharArray.newCharacters.added.length) await movieCreated.addCharacters(validatedCharArray.newCharacters.added)
    const movReturned = await rp.findById(movieCreated.id)
    return responseHandler.sendResponse(200, movReturned)
    } catch (err) { return responseHandler.sendResponse(500, err) }
    
}

const findById = async (id) => {
    if (isNaN(Number.parseInt(id))) return responseHandler.sendResponse(400, "Invalid ID")
    const res = rp.findById(id).then(repoResponse => {
        if (repoResponse.error) return responseHandler.sendResponse(repoResponse.errorCode || 500, repoResponse.error)
        return responseHandler.sendResponse(200, repoResponse)
    }).catch(err => { return responseHandler.sendResponse(500, err) })
    return res;
}

const getMovies = async (params) =>{
  const resp = await rp.findWithParams(params)
  if(resp.error) return responseHandler.sendResponse(resp.errCode,resp.error)
  return responseHandler.sendResponse(200, resp)
}

const updateMovie = async (movie) =>{
    if(!movie.id) return responseHandler.sendResponse(400,"ID of movie is a required value to update.")
    const validation = vs.validateMovie(movie)
    if(validation.error) return responseHandler.sendResponse(400,validation.error)
    const charValidation = await cs.verifyIfExistsIdArray(movie.Characters)
    if(charValidation.error) return responseHandler.sendResponse(404,`Character IDs not found on database: ${charValidation.inexistentIds}`)
    const mov = await rp.findById(movie.id);
    if(mov.error) return responseHandler.sendResponse(mov.errorCode,mov.error)
    const char = await mov.setCharacters(charValidation.arr)
    const res = await rp.update(movie)
    if(res>0 || char.length) return responseHandler.sendResponse(200,{ response: `Changed movie ${movie.title} with id: ${movie.id}.` })
    else return responseHandler.sendResponse(200,{response:`No changes in movie.`})
}

const deleteById = async (id) => {
    if (isNaN(Number.parseInt(id))) return responseHandler.sendResponse(400, "Invalid ID")
    const res = rp.deleteById(id).then(repoResponse => {
        if (repoResponse == 0) return responseHandler.sendResponse(404, `Can't find movie with ID:${id}.`)
        return responseHandler.sendResponse(200, { response: `Movie with ID ${id} deleted.` })
    }).catch(err => { return responseHandler.sendResponse(500, err) })
    return res;
}

const movieService = {
    createMovie,
    getMovies,
    updateMovie,
    findById,
    deleteById
}

module.exports = movieService;