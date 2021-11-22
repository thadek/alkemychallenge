require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { user } = require('../models/index')
const validatorService = require('../services/validationService')
const sg = require('@sendgrid/mail')
sg.setApiKey(process.env.SENDGRID_KEY)


module.exports = {

    
    login(req, res) {
       const { email, password} = req.body;

       //FindUser
       user.findOne({
           where:{
               email:email
           }
       }).then(user=>{

        if(!user){
            res.status(404).json({Error:`Cannot find user with email: ${email}`});
        }else{

            if(bcrypt.compareSync(password,user.password)){
             //Login correcto -> genero y envio token
             let token = jwt.sign({ user: user }, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES
            });

            res.json({
                response:"Login success",
                token:token
            })

            }else{
                //Login incorrecto
                res.status(401).json({Error:"Incorrect Password."})
            }
        }
           
       }).catch(error =>{
           res.status(500).json(error);
       })
    },

    
    register(req, res) {
        const validatePassword = validatorService.validatePassword(req.body.password)

        if (validatePassword.error == false) {
            let password = bcrypt.hashSync(req.body.password, Number.parseInt(process.env.AUTH_ROUNDS));
            user.create({
                name: req.body.name,
                email: req.body.email,
                password: password
            }).then(user => {
                let token = jwt.sign({ user: user }, process.env.AUTH_SECRET, {
                    expiresIn: process.env.AUTH_EXPIRES
                });

                const msg = {
                    to: `${req.body.email}`, 
                    from: `${process.env.SENDGRID_EMAIL_SENDER}`,
                    subject: 'New registration in DisneyApi AlkemyChallenge',
                    html: `<p>Welcome to DisneyApi - AlkemyChallenge.<p> <br>
                    <strong>Alkemy Challenge November 2021.</strong>`,
                  }

                  sg.send(msg).then(()=>console.log(`Welcome mail sent.`)).catch(error=>console.log(error))


                res.json({
                    user: user,
                    token: token
                });

            }).catch(error => {
                res.status(500).json(error);

            })
        } else {
            res.status(500).json({validatePassword})
        }




    }

}