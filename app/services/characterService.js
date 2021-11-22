const { Character } = require('../models/index')
const validationService = require('./validationService')

module.exports = {



    async processArray(characters) {

        /* This method generates 2 arrays, one with the new Characters 
        to create and other with existent Characters to verify and 
        calls respective methods in this module to verify or create Characters.
        When that methods have a response return an array of verified/created characters
        or return an specific error. 
        Gabi - 22/11/2021.
        */
        const newCharacters = [];
        const existentCharacters = [];
        let error = {};
        characters.map(c => {
            if (c.id) {
                existentCharacters.push(c)
            } else {
                newCharacters.push(c)
            }
        })

        const existentCharactersVerified = await this.existentCharactersVerify(existentCharacters);

        
        if (!existentCharactersVerified.error) {

            const newCharactersVerified = await this.newCharactersVerifyandCreate(newCharacters)

            if (!newCharactersVerified.error) {

                return {existentVerified:existentCharactersVerified,newCharacters:newCharactersVerified}

            } else {
                return newCharactersVerified
            }

        } else {
            return { error: "One or many existing characters passed with id were not found in the database." }
        }



    },


    async newCharactersVerifyandCreate(charArray) {

        const promises = [];

        let error;
        let result=[];

        for (let i = 0; i < charArray.length; i++) {
            const validateChar = validationService.validateCharacter(charArray[i])
            if (!validateChar.error) {
                promises.push(
                    Character.findOrCreate({
                        where: {
                            name: charArray[i].name,                                                      
                            imageURL: charArray[i].imageURL,                        
                        },
                        defaults:{
                            age: charArray[i].age,
                            weight: charArray[i].weight,
                            history: charArray[i].history
                        }
                    }))
            } else {
                error = validateChar
                break;
            }
        }



        const charactersReturned = await Promise.all(promises).then(p => p)

        for (let i = 0; i < charactersReturned.length; i++) {

            
            if (!charactersReturned[i][1]) {
                
                error = { duplicatedEntryError: `This character already exists in database => [name:${charactersReturned[i][0].name},imageURL: ${charactersReturned[i][0].imageURL}] please refer directly with ID: ${charactersReturned[i][0].id} for associate.` }
                break;

                
            }else{            
               result.push(charactersReturned[i][0])
            }
        }

        if (result && error) {
            return {created:result,error}
        }else if(error){
            return {error:error}
        }else{
            return {added:result}
        }


     

    },


    async existentCharactersVerify(char) {
        const promises = [];
        let error;
        char.forEach(c =>
            promises.push(Character.findOne({ where: { id: c.id } }))
        )
        const promResolved = await Promise.all(promises).
            then(characterArrayVerified => {

                characterArrayVerified.forEach(p => {
                    if (p == null) {
                        error = true;
                    }
                })
                if(error){
                     return {error:error}
                }else{
                    return characterArrayVerified
                }
               
            })

            
        return promResolved




    }


}