const express = require('express');
const routes = require('./routes/userRoutes')
const Database = require('./database/Database');
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json())

app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
  });


process.on("SIGINT", async () => {
    await Database.close();
    process.exit(0);
});
