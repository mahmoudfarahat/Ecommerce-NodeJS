const express = require('express')
const { check  , validationResult} = require('express-validator')
const usersRepo = require('../../repositories/users')
const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')
const { requireEmail , requirePassword ,requirePasswordConfirmation , requireVaildPassword ,requireVaildEmail} = require('./validators')
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.send(signupTemplate({req}));
});

router.post('/signup', [
    requireEmail,
    requirePassword,
requirePasswordConfirmation
],async (req,res)=>{
   const errors = validationResult(req)
    const {email , password  } = req.body 
if(!errors.isEmpty()){
    return res.send(signupTemplate({req , errors}))
}

   

  const user =  await usersRepo.create({email , password});


    req.session.userId = user.id

    res.send('Account created!!')
})

router.get('/signout', (req,res)=>{
req.session = null;
res.send('You Are logged out')
})

router.get('/signin',(req,res)=>{
    res.send(signinTemplate({}))
})


router.post('/signin',[
    requireVaildEmail ,
    requireVaildPassword


], async (req,res)=>{
    const errors = validationResult(req)
     if(!errors.isEmpty()){
        return res.send(signinTemplate({errors}))
    }
    const {email } = req.body;
    const user = await usersRepo.getOneBy({email});
      req.session.userId = user.id;
    return res.send('You are signed in')

})


module.exports = router