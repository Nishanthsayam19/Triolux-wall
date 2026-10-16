const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    application: "TRIOLUX Wall Printer",
    message: "Backend API is running"
  });
});

app.post("/api/calculate", (req, res) => {
  const { width, height } = req.body;

  if (
    typeof width !== "number" ||
    typeof height !== "number" ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return res.status(400).json({
      error: "Enter valid positive wall dimensions"
    });
  }

  const area = width * height;
  const price = area * 400;

  res.json({
    area,
    pricePerSqFt: 400,
    totalPrice: price
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("TRIOLUX Backend running on port 3000");
});
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, phone, address, date, width, height } = req.body;

    const w = Number(width);
    const h = Number(height);

    if (
      !name || !phone || !address ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date || "") ||
      !Number.isFinite(w) || w <= 0 ||
      !Number.isFinite(h) || h <= 0
    ) {
      return res.status(400).json({
        error: "Invalid booking details"
      });
    }

    const area = Number((w * h).toFixed(2));
    const total = area * 400;

    const result = await pool.query(
      `INSERT INTO bookings
      (customer_name, phone, address, preferred_date,
       width, height, area, total_price)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id, area, total_price`,
      [name, phone, address, date, w, h, area, total]
    );

    res.status(201).json({
      message: "Booking successful",
      booking: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error"
    });
  }
});
