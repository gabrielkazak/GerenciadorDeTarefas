const db = require('../database/Database')

class Tarefa{
    static async create(titulo, horario, data, estado, id_usuario){
        const result = await db.query('INSERT INTO tasks (titulo, horario, data, estado, id_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *', [titulo, horario, data, estado, id_usuario]);
        return result[0];
    }

    static async read(id_usuario){
        const result = await db.query('SELECT * FROM tasks WHERE id_usuario = $1', [id_usuario]);
        return result;
    }

    static async update(id, titulo, horario, data, estado, id_usuario){
        const result = await db.query('UPDATE tasks SET titulo = $1, horario = $2, data = $3, estado = $4 WHERE id = $5 AND id_usuario = $6 RETURNING *', [titulo, horario, data, estado, id, id_usuario])
        return result;
    }

    static async delete(id, id_usuario){
        const result = await db.query('DELETE FROM tasks where id = $1 AND id_usuario = $2 RETURNING *', [id, id_usuario]);
        if (result.length === 0) {
            return null;
        }
        return "Tarefa Deletada"
    }

    static async patch(id, id_usuario, estado){
        const result = await db.query('UPDATE tasks SET estado = $1 WHERE id = $2 AND id_usuario = $3 RETURNING *', [estado, id, id_usuario]);
        return result
    }
}

module.exports = Tarefa