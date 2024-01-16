const mongoose = require('mongoose')

const contatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    ident: {type: Number, required: true}
})

const contatoModel = mongoose.model('dados', contatoSchema)

module.exports.Contato = class Contato{
    constructor(body, ident){
        this.nome = body.nome,
        this.sobrenome = body.sobrenome,
        this.email = body.email,
        this.telefone = body.telefone
        this.ident = ident
        this.messageErros = new Array
    }

    async cadastrar(){
        this.valida()
        if(this.messageErros.length > 0) return

        await contatoModel.create({
            nome: this.nome,
            sobrenome: this.sobrenome,
            email: this.email,
            telefone: this.telefone,
            ident: this.ident
        })

    }

    valida(){
        if(this.nome == '' || this.sobrenome == '' || this.email == '' || this.telefone == ''){
            this.messageErros.push('Todos os campos devem estar preenchidos')
            return
        }

        if(!(/\S+@\S+\.\S+/).test(this.email)){   //Essa linha faz a validação do email
            this.messageErros.push('O email deve ser valido')
        }
    }

}

module.exports.carregarContatos = async (ident) => {
    return await contatoModel.find({ ident })
}

module.exports.deletarContatos = async (id) => {
    await contatoModel.deleteOne({ _id: id })
}
