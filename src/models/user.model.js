const pool = require('../config/db.config');

const User = {
    findAll: async () => {
        let conn;
        try {
            conn = await pool.getConnection();
            return await conn.query("SELECT id, username, full_name, role FROM users");
        } finally { if (conn) conn.end(); }
    },

    findById: async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT id, username, full_name, role FROM users WHERE id = ?", [id]);
            return rows[0];
        } finally { if (conn) conn.end(); }
    },

    findByUsername: async (username) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
            return rows[0];
        } finally { if (conn) conn.end(); }
    },

    create: async (newUser) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query(
                "INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)",
                [newUser.username, newUser.password, newUser.full_name, newUser.role]
            );
            return { id: res.insertId, ...newUser };
        } finally { if (conn) conn.end(); }
    },

    deleteById: async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            return await conn.query("DELETE FROM users WHERE id = ?", [id]);
        } finally { if (conn) conn.end(); }
    }
};

module.exports = User;