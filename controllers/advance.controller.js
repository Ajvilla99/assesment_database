import { pool } from "../config/db.js";

export const getTotalMounts = async (req, res) => {
  try {
    const result = await pool.query("SELECT u.full_name, SUM(it.transaction_amount) as total_mount, it.transaction_status FROM users u JOIN billings b ON u.id_user = b.id_user JOIN info_transactions it ON b.invoice_number = it.invoice_number WHERE it.transaction_status = 'completada' GROUP BY full_name, it.transaction_status");

    if (result.rows.length === 0) {
      res.status(200).json({
        message: "Transactions not found",
      });
    }

    res.status(200).json(result.rows);

  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error getting transactions", error: error.message });
  }
};

export const getBillingPending = async (req, res) => {
  try {

    const sql = "SELECT u.full_name, it.transaction_amount, it.transaction_status FROM users u JOIN billings b ON u.id_user = b.id_user JOIN info_transactions it ON b.invoice_number = it.invoice_number WHERE it.transaction_status = 'pendiente';"

    const result = await pool.query(sql);

    if (result.rows.length === 0) {
      res.status(200).json({
        message: "billing not found",
      });
    }

    res.status(200).json(result.rows);

  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error getting billings", error: error.message });
  }
};

export const getTransactionPlatform = async (req, res) => {
  try {

    const sql = "SELECT u.full_name, b.platform_use, it.transaction_amount FROM users u JOIN billings b ON u.id_user = b.id_user JOIN info_transactions it ON b.invoice_number = it.invoice_number ORDER BY b.platform_use DESC;"

    const result = await pool.query(sql);

    if (result.rows.length === 0) {
      res.status(200).json({
        message: "Transactions not found",
      });
    }

    res.status(200).json(result.rows);

  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error getting transactions", error: error.message });
  }
};