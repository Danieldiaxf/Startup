// src/services/leadService.js
const crypto = require("crypto"); // Apenas se quiser ID manual
const db = require("../db");

const leadService = {

    // Cadastrar Lead
    createLead: async (data) => {
        const { nome, email, telefone, cidade, estado, categoria } = data;

        // Validação
        if (!nome || !email || !telefone) {
            const e = new Error("Campos obrigatórios: Nome, Email e Telefone.");
            e.statusCode = 400;
            throw e;
        }

        const query = `
            INSERT INTO leads (id, nome, email, telefone, cidade, estado, categoria)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const id = crypto.randomUUID(); // Gerar ID

        const values = [id, nome, email, telefone, cidade, estado, categoria];

        const result = await db.query(query, values);

        return result.rows[0];
    },

    // Listar Leads
    getAllLeads: async () => {
        const result = await db.query("SELECT * FROM leads ORDER BY data_cadastro DESC");
        return result.rows;
    }
};

module.exports = leadService;
