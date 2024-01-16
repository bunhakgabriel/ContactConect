const moduloContato = require('../models/contatoModel')

exports.index = (req, res) => {
    if(!req.session.user){
        req.flash('error', 'Você precisa fazer login')
        return res.redirect('/')
    }

    res.render('criarContato')
}

exports.contato = async (req, res) => {
    const user = req.session.user

    const contato = new moduloContato.Contato(req.body, user.ident)
    await contato.cadastrar()

    if(contato.messageErros.length > 0){
        req.flash('error', contato.messageErros)
        return res.redirect('/criarContato')
    }

    req.flash('success', 'Contato criado com sucesso')
    res.redirect('/criarContato')
}
