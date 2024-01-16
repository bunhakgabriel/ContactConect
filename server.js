require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const app = express()

mongoose.connect(process.env.STRINGMONGODB)
    .then( () => {
        console.log('CONEXÃO A BASE DE DADOS REALIZADA COM SUCESSO')
        app.emit('pronto')
    })
    .catch( (e) =>{
        console.log(`FALHA NA CONEXÃO: ${e}`)
    })

app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        }
    })
)

app.use(flash())

const middlewareGlobal = require('./src/middlewares/middleware')
app.use(middlewareGlobal.Message)

const routes = require('./routes')
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.set('view engine', 'ejs')
app.set('views', path.resolve('./src/views'))
app.use(express.static('public'))

app.on('pronto', () => {
    app.listen(2500, function(){
        console.log('http://localhost:2500')
    })    
})


