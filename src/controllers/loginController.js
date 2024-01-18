//Rota de login (home)

const Register = require('../models/loginModel')
const moduloContato = require('../models/contatoModel')

exports.index = async (req, res) => {
    if(req.session.user){
        const contatos = await moduloContato.carregarContatos(req.session.user.ident)
        return res.render('logado', {contatos})
    }
    res.render('index')
}

exports.login = async (req, res) => {

    try{
        const login = new Register(req.body)
        const user = await login.logar()
    
        if(login.messageErros.length > 0){
            req.flash('error', login.messageErros)
            return res.redirect('/')
        }
        
        req.session.user = user
        res.redirect('/')
        
    } catch(error){
        console.log(`ERROR: ${error}`)
    }


}


