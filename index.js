const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a new employee
app.post('/employees', (req, res) => {
  const { emp_id, emp_name, emp_nik } = req.body;
  const sql = 'INSERT INTO employees (emp_id, emp_name, emp_nik) VALUES (?, ?, ?)';
  connection.query(sql, [emp_id, emp_name, emp_nik], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create employee', error: err });
    }
    res.status(201).json({ message: 'Employee created successfully', data: result });
  });
});

// Read all employees
app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch employees', error: err });
    }
    res.json(results);
  });
});

// Read a specific employee by emp_id
app.get('/employees/:emp_id', (req, res) => {
  const sql = 'SELECT * FROM employees WHERE emp_id = ?';
  connection.query(sql, [req.params.emp_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch employee', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(results[0]);
  });
});

// Update a specific employee by emp_id
app.put('/employees/:emp_id', (req, res) => {
  const { emp_name, emp_nik } = req.body;
  const sql = 'UPDATE employees SET emp_name = ?, emp_nik = ? WHERE emp_id = ?';
  connection.query(sql, [emp_name, emp_nik, req.params.emp_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to update employee', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully' });
  });
});

// Delete a specific employee by emp_id
app.delete('/employees/:emp_id', (req, res) => {
  const sql = 'DELETE FROM employees WHERE emp_id = ?';
  connection.query(sql, [req.params.emp_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete employee', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
