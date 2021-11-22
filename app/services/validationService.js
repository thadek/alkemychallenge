module.exports= {

validatePassword(password){
    if(password.length<6){
        return {error:true,msg:"Minimal length of password: 6"}
    }else{
        return {error:false}
    }
},

validateCharacter(char){

    if(!char.name){
        return {error:"Character must have a Name."}
    }else if(!char.imageURL){
        return {error:"Character must have a imageURL."}
    }else if(!char.age){
        return {error:"Character must have a Age"}
    }else if(!char.weight){
        return {error:"Character must have a Weight"}
    }else if(!char.history){
        return {error:"Character must have a History."}
    }else{
        return {error:false}
    }

},

validateMovie(movie){

    if(!movie.title){
        return {error:"Movie must have a Title."}
    }else if(!movie.imageURL){
        return {error:"Movie must have a imageURL."}
    }else if(!movie.creationDate){
        return {error:"Movie must have a Creation Date"}
    }else if(!movie.rating){
        return {error:"Movie must have a rating (1-5)"}
    }else if(!movie.Characters){
        return {error:"Movie must have Characters."}   
    }else if(!movie.GenreId){
        return {error:"Movie must have a genreId."}   
    }else if(isNaN(Date.parse(movie.creationDate))){
        return {error:"An error occurred parsing date. Valid format YYYY-MM-DD"}    
    }else if(isNaN(movie.GenreId)){
        return {error:"Invalid genreId type. Only numbers."}
    }else if(isNaN(movie.rating)){
       return {error:"Invalid rating type. Only numbers. 1-5"}       
    }else if(!Array.isArray(movie.Characters)){  
        return {error:"Characters must be an Array Type."}  
    }else{
        return {error:false}
    }
}

}



