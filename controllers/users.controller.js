import { pool } from '../config/db.js';

// Obtener todos los prestamos [ En su defecto todas las tablas ]
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users;');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'error al obtener prestamos', error: error.message });
  }
};

export const getUserId = async (req, res) => {
  // Consulta por parametro
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id_user = $1;', [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'error al obtener prestamos', error: error.message });
  }
};