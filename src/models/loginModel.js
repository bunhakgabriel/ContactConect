const mongoose = require('mongoose')
const validator = require('express-validator')

const registerSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    telefone: {type: String, required: false},
    ident: {type: Number, required: true}
})

const registerModel = mongoose.model('login', registerSchema)

class Register{
    constructor(body){
        this.email = body.email
        this.password = body.password
        this.confirmPassword = body.confirmPassword
        this.telefone = body.telefone
        this.messageErros = new Array
    }

    async register(){
        this.validar()
        if(this.messageErros.length > 0) return

        const user = await registerModel.findOne( {email: this.email} ) //Se o usuario existir ele vai ser retornado e atributio a const 'user', se ele não existir o valor 'null' vai ser retornado para a const 'user'
        if(user){ this.messageErros.push('Esse email ja esta sendo usado') }
        if(this.messageErros.length > 0) return

        this.ident = this.gerarIdent()

        this.usuario = await registerModel.create({
            email: this.email,
            password: this.password,
            telefone: this.telefone,
            ident: this.ident
        })

    }

    async logar(){
        this.validar()
        if(this.messageErros.length > 0) return

        const user = await registerModel.findOne( {email: this.email} ) //Esta verificando se o email digitado existe na base de dados
        if(!user){ this.messageErros.push('Esse email não esta cadastrado') } 
        if(this.messageErros.length > 0) return

        if(user.password != this.password){ this.messageErros.push('Senha incorreta')} //Esta verificando se a senha digitada bate com a senha da base de dados 
        if(this.messageErros.length > 0) return
        
        return user
    }

    validar(){

        if(!(/\S+@\S+\.\S+/).test(this.email)){   //Essa linha faz a validação do email
            this.messageErros.push('O email deve ser valido')
        }
        if(this.password.length < 6 || this.password.length > 12){  //Essa linha faz a validação da senha
            this.messageErros.push('A senha deve ter de 6 a 12 caracteres')
        }
        if(this.confirmPassword){
            if(this.confirmPassword != this.password){
                this.messageErros.push('As senhas devem ser iguais')
            }
        }

    }

    gerarIdent(){
        return Math.random()
    }
}

module.exports = Register
