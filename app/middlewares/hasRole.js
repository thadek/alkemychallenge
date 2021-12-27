const userRepository = require('../repositories/UserRepository');
const uRepo = new userRepository();
const hasRole = (rolName) =>{
    return (req,res,next)=>{
        uRepo.hasRole(req.user.id,rolName).then(response=>{
            if(response){
              next();
            }else{
                res.status(403).json({error:"Unauthorized - Insufficient permissions"})
            }
    })
}
}

module.exports = hasRole;