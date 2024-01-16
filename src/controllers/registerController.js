const Register = require('../models/loginModel')

exports.index = (req, res) => {
    res.render('cadastro')
}

exports.register = async (req, res) => {
    try{
        const register = new Register(req.body)
        await register.register()
    
        if(register.messageErros.length > 0){
            req.flash('error', register.messageErros)
            return res.redirect('/register')
        }
    
        req.flash('success', 'cadastro realizado com successo')
        res.redirect('/')
    } catch(error){
        console.log(`ERROR:${error}`)
    }
}

