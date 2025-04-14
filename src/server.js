const express = require('express');
const routes = require('./routes/userRoutes');
const Database = require('./database/Database');
const cors = require('cors');
const helmet = require('helmet');
const swaggerConfig = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '1mb' }));

app.use('/api', routes);

swaggerConfig(app);

app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
});

//FUnção que fecha qualquer conexão restante com o banco de dados quando o servidor for encerrado
process.on('SIGINT', async () => {
  await Database.close();
  process.exit(0);
});
