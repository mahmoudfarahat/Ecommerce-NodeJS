const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const usersRepo = require('./repositories/users')

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieSession({
    keys:['dsadsadsadsadsa']
}))
app.get('/',(req,res)=>{
    res.send(`
            <div>
                <form method="POST">
                    <input name="email" placeholder="email" />
                    <input name="password" placeholder="password" />
                    <input name="passwordConfirmation" placeholder="password confirmation" />
                    <button>Sign Up</button>
                </form>
            </div>
        `);
});
// const bodyParser = (req, res , next) => {
//     if(req.method === 'POST'){
//         req.on('data',data =>{
//             const parsed = data.toString('utf8').split('&');
//             const formData = {};
//             for (let pair of parsed){
//                 const [ key, value]  = pair.split('=');
//                 formData[key] = value
//             }
//            req.body =formData
//            next()
//         })
//     }else{
//         next()
//     }
// }
app.post('/', async (req,res)=>{
    console.log(req.body)
    const {email , password , passwordConfirmation } = req.body

    const existingUser = await usersRepo.getOneBy({email: email})
 if(existingUser){
    return res.send('Email in use');
 }
if(password !== passwordConfirmation ){
    return res.send('Passwords must Match');
}

  const user =  await usersRepo.create({email , password});


    req.session.userId = user.id

    res.send('Account created!!')
})

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})