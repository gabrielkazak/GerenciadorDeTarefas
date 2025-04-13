const db = require('../database/Database')
const bcrypt = require('bcrypt')

class Usuario{

    //CRIA UM USUARIO COM ID, NOME, NOME_USUARIO, SENHA ENCRIPTADA COM BCRYPT, ROLE(USUARIO OU ADMIN) E EMAIL, RETORNANDO O ID DO USUARIO CRIADO
    static async create(nome, nome_usuario, senha, role, email){
        const hashedSenha = await bcrypt.hash(senha, 10);
        const result = await db.query('INSERT INTO usuarios (nome, nome_usuario, senha, role, email) VALUES ($1,$2,$3,$4,$5) RETURNING id', [nome, nome_usuario, hashedSenha, role, email])
        return result[0].id
    }

    static async buscaUsuario(email){
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email])

        if(!result || result.length === 0){
            console.log("Email nao encontrado")
            return null
        }
        return result[0]
    }

    static async verificaSenha(senha, hash){
        return await bcrypt.compare(senha, hash)
    }
}


module.exports = Usuario