const Database = require('./Database');

async function testDatabase() {
    try {
        const db = Database;

        // Testar conexão
        await db.connect();

        // Executar query de teste
        const result = await db.query('SELECT 1 + 1 AS solution');

        console.log('Resultado da query:', result[0].solution); // Deve retornar 2

        // Fechar conexão
        await db.close();
    } catch (error) {
        console.error('Teste falhou:', error);
    }
}

testDatabase();