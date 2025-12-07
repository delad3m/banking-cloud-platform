const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.APP_PORT || 3000;

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "customer-service" });
});

// Create customer
app.post("/customers", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const result = await db.query(
      `INSERT INTO customers (name, email, kyc_status)
       VALUES ($1, $2, 'PENDING')
       RETURNING id, name, email, kyc_status`,
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get customer by id
app.get("/customers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid customer id" });
    }

    const result = await db.query(
      `SELECT id, name, email, kyc_status
       FROM customers
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching customer:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`customer-service listening on port ${PORT}`);
});