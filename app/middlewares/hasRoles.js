const userRepository = require('../repositories/UserRepository');
const uRepo = new userRepository();
const hasRoles = (...rolNames) =>{
    return (req,res,next)=>{   
        uRepo.hasRoles(req.user.id,rolNames).then(response=>{
            if(response){
              next();
            }else{
                res.status(403).json({error:"Unauthorized - Insufficient permissions"})
            }
    })
}
}

module.exports = hasRoles;