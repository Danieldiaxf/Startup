// db.js
const { Pool } = require("pg");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
    console.error("❌ ERRO FATAL: DATABASE_URL não configurada!");
    console.error("Crie um arquivo .env contendo:");
    console.error("DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco");
    process.exit(1); // Impede o backend de subir sem banco
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false // Para ambiente local NÃO use SSL, apenas em produção
});

console.log("🔥 Conectado ao banco PostgreSQL.");

module.exports = {
    query: (text, params) => pool.query(text, params),
    client: pool
};
