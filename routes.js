var express = require('express')
var route = express.Router()

const loginController =  require('./src/controllers/loginController')
const registerController = require('./src/controllers/registerController')
const logoutController = require('./src/controllers/logoutController')
const criarContatoController = require('./src/controllers/criarContatoController')
const deletarContatoController = require('./src/controllers/deletarContatoController')

//Rota de login (home)
route.get('/', loginController.index)
route.post('/', loginController.login)


//Rota de cadastro
route.get('/register', registerController.index)
route.post('/register', registerController.register)

//Rota de logout
route.get('/logout', logoutController.logout)

//Rota de criação dos contatos
route.get('/criarContato', criarContatoController.index)
route.post('/criarContato', criarContatoController.contato)

//Rota de deletar contatos
route.get('/deletar/:id', deletarContatoController.delete)

module.exports = route