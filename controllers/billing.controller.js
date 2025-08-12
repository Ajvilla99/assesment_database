import { pool } from "../config/db.js";

export const getBillings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM billings;");

    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "Billings no encontrado",
      });
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error getting billing", error: error.message });
  }
};

export const getBillingId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM billings WHERE invoice_number = $1 LIMIT 1;",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "Billings no encontrado",
      });
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "error getting invoices", error: error.message });
  }
};

export const createBilling = async (req, res) => {

  const { id_user, invoice_number, platform_use, amount_invoice,amount_paid ,billing_period } = req.body;
  try {
    // Validación mínima
    if (!id_user || !invoice_number || !platform_use || !amount_invoice || !amount_paid || !billing_period) {
      // Conflict
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Verificar si ya existe
    const isExistBilling = await pool.query(
      "SELECT * FROM billings WHERE invoice_number = $1",
      [invoice_number]
    );

    if (isExistBilling.rows.length > 0) {
      return res.status(400).json({ mensaje: "El libro ya existe" });
    }

    const result = await pool.query(
      "INSERT INTO billings(id_user, invoice_number, platform_use, amount_invoice,amount_paid ,billing_period ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id_user,invoice_number,platform_use,amount_invoice,amount_paid,billing_period]
    );
    return res.status(201).json({
      message: "Successfully created",
      data: result.rows[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "error getting invoice", error: error.message });
  }
};

export const editBilling = async (req, res) => {
  const { id } = req.params;

  const { platform_use, amount_invoice, amount_paid, billing_period } = req.body;

  try {
    const existingBook = await pool.query(
      "SELECT * FROM billings WHERE invoice_number = $1",
      [id]
    );

    if (existingBook.rows.length === 0) {
      return res.status(404).json({
        message: "Billing not found",
      });
    }

 // Build dynamic query to update only the fields sent
    const updates = [];
    const values = [];
    let index = 1;

    if (platform_use) {
      updates.push(`platform_use = $${index++}`);
      values.push(platform_use);
    }
    if (amount_invoice) {
      updates.push(`amount_invoice = $${index++}`);
      values.push(amount_invoice);
    }    
    if (amount_paid) {
      updates.push(`amount_paid = $${index++}`);
      values.push(amount_paid);
    }
    if (billing_period) {
      updates.push(`billing_period = $${index++}`);
      values.push(billing_period);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        message: "No fields were sent for update",
      });
    }

    // Add id at the end of values
    values.push(id);

    const result = await pool.query(
      `UPDATE billings SET ${updates.join(
        ", "
      )} WHERE invoice_number = $${index} RETURNING *`,
      values
    );

    res.status(200).json({
      message: "invoice updated correctly",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating invoice",
      error: error.message,
    });
  }
};

export const deleteBilling = async (req, res) => {
  const { id } = req.params; // id = invoice_number o id del libro en la BD
  try {
    const existingBook = await pool.query(
      "SELECT * FROM billings WHERE invoice_number = $1",
      [id]
    );

    console.log(existingBook.rows[0]);
    

    if (existingBook.rows.length === 0) {
      return res.status(200).json({
        message: "Billing not found",
      });
    }

    // Soft Delete
    await pool.query("UPDATE billings SET is_active = $1 WHERE invoice_number = $2",
        [false, id]
    );

    res.status(200).json({
      message: "Billing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the billing",
      error: error.message,
    });
  }
};
