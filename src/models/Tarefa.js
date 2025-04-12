const db = require('../database/Database')

class Tarefa{
    static async create(titulo, horario, data, estado, id_usuario){
        const result = await db.query('INSERT INTO tasks (titulo, horario, data, estado, id_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *', [titulo, horario, data, estado, id_usuario]);
        return result[0];
    }

    static async read(id_usuario, ontem, hoje, amanha){
        const result = await db.query('SELECT * FROM tasks WHERE id_usuario = $1 AND data IN ($2, $3, $4)', [id_usuario, ontem, hoje, amanha]);
        return result;
    }

    static async update(id, titulo, horario, data, id_usuario){
        const result = await db.query('UPDATE tasks SET titulo = $1, horario = $2, data = $3 WHERE id = $4 AND id_usuario = $5 RETURNING *', [titulo, horario, data, id, id_usuario])
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

    static async atrasadas(id_usuario) {
        try {
            // Atualizar tarefas pendentes para atrasadas, se o horário for no passado (considerando fuso horário)
            await db.query(`
                UPDATE tasks 
                SET estado = 'atrasada'
                WHERE id_usuario = $1 
                AND estado = 'pendente' 
                AND TO_TIMESTAMP(data || ' ' || horario, 'YYYY-MM-DD HH24:MI') < NOW()
            `, [id_usuario]);
    
            // Atualizar tarefas atrasadas para pendente, se o horário for no futuro (considerando fuso horário)
            await db.query(`
                UPDATE tasks
                SET estado = 'pendente'
                WHERE id_usuario = $1
                AND estado = 'atrasada'
                AND TO_TIMESTAMP(data || ' ' || horario, 'YYYY-MM-DD HH24:MI') > NOW()
            `, [id_usuario]);
    
            return { mensagem: 'Tarefas atualizadas com sucesso.' };
    
        } catch (error) {
            console.error('Erro ao atualizar tarefas:', error);
            throw new Error('Erro ao atualizar tarefas');
        }
    }    
    
}

module.exports = Tarefa