const validationService = require('./validationService')
const CharacterRepository = require('../repositories/CharacterRepository')
const rp = new CharacterRepository();
const responseHandler = require('./responseHandler');
const errorService = require('./errorService');

    const createCharacter = async(character) => {
        try{
        const response = await createCharacters([character]);
        if(response.error.duplicatedEntryError) return responseHandler.sendResponse(409,response.error)
        if (response.error) return responseHandler.sendResponse(400, response.error)
        if (response.added) return responseHandler.sendResponse(201, response.added[0])
        }catch(err){
            return responseHandler.sendResponse(500,err)
        }
    }

    const getCharacter = async (id) => {
        if (isNaN(Number.parseInt(id))) return responseHandler.sendResponse(400, `Invalid ID.`)
        const repoResponse = await rp.findById(id)
        if (!repoResponse) return responseHandler.sendResponse(404, `Character with ID: ${id} not found.`)
        return responseHandler.sendResponse(200, repoResponse)
    }

    const updateCharacter = async (character) => {
        try {
            const validation = validationService.validateCharacter(character)
            if (!character.id) return responseHandler.sendResponse(400, "ID is required.")
            if (validation.error) return responseHandler.sendResponse(400, validation.error)
            const resp = await rp.update(character)
            if (resp == 0) return responseHandler.sendResponse(400, `Nothing to update or error in ID.`,)
            if (resp > 0) return responseHandler.sendResponse(200, { response:`Character with ID:${character.id} updated correctly.`})
        } catch (err) {
            return responseHandler.sendResponse(500, errorService.sequelizeErrorParser(err))
        }
    }

    const  getCharacters = async (params) => {
       const resp = await rp.findWithParams(params)
        return responseHandler.sendResponse(200, resp)
    }

    const processArray = async (characters) => {
        /* This method generates 2 arrays, one with the new Characters 
        to create and other with existent Characters to verify and 
        calls respective methods in this module to verify or create Characters.
        When that methods have a response return an array of verified/created characters
        or return an specific error. 
        Gabi - 22/11/2021.
        */
        const newCharacters = [];
        const existentCharacters = [];
        characters.map(c => { if (c.id) existentCharacters.push(c); else newCharacters.push(c); })
        const existentCharactersVerified = await verifyIfExistsIdArray(existentCharacters);
        if (existentCharactersVerified.error) return { error: `This characters ID doesn't exists on database:${existentCharactersVerified.inexistentIds}` }
        const createCharResponse = await createCharacters(newCharacters)
        if (createCharResponse.error) return createCharResponse;
        else return { existentVerified: existentCharactersVerified.arr, newCharacters: createCharResponse }
    }

    const createCharacters = async (charArray) => {
        const promises = [];
        let error;
        let result = [];
        for (let i = 0; i < charArray.length; i++) {
            const validateChar = validationService.validateCharacter(charArray[i])
            if (validateChar.error) { error = {CharacterValidation:validateChar.error}; break; }
            else {
                promises.push(rp.findOrCreate(charArray[i]))
            }
        }
        const charactersReturned = await Promise.all(promises).then(p => p)
        for (let i = 0; i < charactersReturned.length; i++) {
            if (!charactersReturned[i][1]) {
                error = { duplicatedEntryError: `This character already exists in database => [name:${charactersReturned[i][0].name},imageURL: ${charactersReturned[i][0].imageURL}] please refer directly with ID: ${charactersReturned[i][0].id}` }
                break;
            } else {
                result.push(charactersReturned[i][0])
            }
        }

        if (result && error) return { created: result, error };
        else if (error) return { error: error };
        else return { added: result };

    }

    const verifyIfExistsIdArray = async (arr) => {
        let arrOfIds = [];
        arr.map(c => { if (c.id) arrOfIds.push(c.id)})  // Duplicate object array in flat id numbers array
        const res = await rp.verifyIdsArray(arrOfIds)
        let result = { error: false, inexistentIds: [] };
        // if any id doesn't exist, res contains that ID.
        arrOfIds.forEach(c => {
            if (!res.some(char => char.id === c)) { result.error = true; result.inexistentIds.push(c) }
        })
        if(!result.error) result.arr = arrOfIds;
        return result;
    }

    const deleteById = async (id) => {
        if (isNaN(Number.parseInt(id))) return responseHandler.sendResponse(400, `Invalid ID.`)
        const res = await rp.deleteById(id)
        if (res == 0) return responseHandler.sendResponse(404, `Can't find character with ID:${id}`)
        if (res.error) return responseHandler.sendResponse(500, res.error)
        return responseHandler.sendResponse(200, { response: `Character with ID:${id} deleted.` })
    }

    const characterService = {
        createCharacter,
        getCharacter,
        updateCharacter,
        getCharacters,
        processArray,
        createCharacters,
        verifyIfExistsIdArray,
        deleteById
    }
    
    module.exports = characterService;


