const sg = require('@sendgrid/mail')
require('dotenv').config();
sg.setApiKey(process.env.SENDGRID_KEY)

module.exports = {
  
   sendWelcomeMail(user,pass){    
        const msg = {
            to: `${user.email}`, 
            from: `${process.env.SENDGRID_EMAIL_SENDER}`,
            subject: 'New registration in DisneyApi AlkemyChallenge',
            html: `<p>Welcome to DisneyApi ${user.name}. Your account is ready to use the api.
            Account Credentials: Email: ${user.email} - Password: ${pass}  - AlkemyChallenge.<p> <br>
            <strong>Alkemy Challenge 2021.</strong>`,
          }

        sg.send(msg).then().catch(error=>console.log(error))

    }

}