const { Pool } = require("pg");
require("dotenv").config();

class Database {
    static instance;

    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.pool = new Pool({
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            port: 5432,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        Database.instance = this;
    }

    async connect() {
        try {
            this.client = await this.pool.connect();
            console.log("Conexão com o banco de dados estabelecida");
            return this.client;
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error);
            throw error;
        }
    }

    async query(sql, params = []) {
        console.log("Obtendo conexão do pool...");
        const client = await this.connect()

        try {
            console.log("Executando query...");
            const result = await client.query(sql, params);
            console.log("Query executada com sucesso!", result.rows);
            return result.rows;
        } catch (error) {
            console.error("Erro na query:", { sql, params, error });
            throw error;
        } finally {
            client.release();
            console.log("Conexão devolvida ao pool.");
        }
    }

    async close() {
        console.log("Conexões ativas antes de fechar:", this.pool.totalCount);
        console.log("Tentando fechar conexão...");
        try {
            await this.pool.end();
            console.log("Conexão fechada com sucesso!");
        } catch (error) {
            console.error("Erro ao fechar conexão:", error);
        } finally {
            console.log("Finalizando tentativa de fechamento.");
        }
    }
}


module.exports = new Database();