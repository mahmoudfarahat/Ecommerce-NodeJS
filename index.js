const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const authRouter= require('./routes/admin/auth')
const productsRouter= require('./routes/admin/products')

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieSession({
    keys:['dsadsadsadsadsa']
}))

app.use(authRouter)
app.use(productsRouter)



app.listen(3000,()=>{
    console.log('http://localhost:3000/signup')
})





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
