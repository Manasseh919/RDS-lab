const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Top Customers by Spending
router.get('/top-customers', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.name, SUM(oi.quantity * oi.unit_price) AS total_spent
      FROM customers c
      JOIN orders o ON c.customer_id = o.customer_id
      JOIN order_items oi ON o.order_id = oi.order_id
      GROUP BY c.customer_id
      ORDER BY total_spent DESC;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Monthly Sales Report (Shipped/Delivered)
router.get('/monthly-sales', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE_FORMAT(o.order_date, '%Y-%m') AS month,
             SUM(oi.quantity * oi.unit_price) AS revenue
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      WHERE o.status IN ('Shipped', 'Delivered')
      GROUP BY month;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Products Never Ordered
router.get('/unsold-products', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.name
      FROM products p
      LEFT JOIN order_items oi ON p.product_id = oi.product_id
      WHERE oi.product_id IS NULL;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Average Order Value by Country
router.get('/avg-order-value-country', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.country,
             AVG(order_total) AS avg_order_value
      FROM (
        SELECT o.order_id, c.customer_id, c.country,
               SUM(oi.quantity * oi.unit_price) AS order_total
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        GROUP BY o.order_id
      ) AS order_summaries
      GROUP BY country;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Frequent Buyers (More Than One Order)
router.get('/frequent-buyers', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.name, COUNT(o.order_id) AS order_count
      FROM customers c
      JOIN orders o ON c.customer_id = o.customer_id
      GROUP BY c.customer_id
      HAVING COUNT(o.order_id) > 1;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/products-never-ordered', async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT p.name
        FROM products p
        LEFT JOIN order_items oi ON p.product_id = oi.product_id
        WHERE oi.order_item_id IS NULL;
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error fetching products never ordered:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
  router.get('/average-order-value-by-country', async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT c.country, AVG(oi.quantity * oi.unit_price) AS avg_order_value
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        WHERE o.status IN ('Shipped', 'Delivered')
        GROUP BY c.country;
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error fetching average order value by country:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });  

module.exports = router;
