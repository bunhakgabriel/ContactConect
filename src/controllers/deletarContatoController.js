const moduloContato = require('../models/contatoModel')

exports.delete = async (req, res) => {
    const contato = await moduloContato.deletarContatos(req.params.id)

    req.flash('success', 'Contato excluido com sucesso')
    res.redirect('/')
}