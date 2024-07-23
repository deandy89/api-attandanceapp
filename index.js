const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let employees = []; // In-memory database for demonstration

// Create a new employee
app.post('/employees', (req, res) => {
  const { emp_id, emp_name, emp_nik } = req.body;
  employees.push({ emp_id, emp_name, emp_nik });
  res.status(201).json({ message: 'Employee created successfully' });
});

// Read all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Read a specific employee by emp_id
app.get('/employees/:emp_id', (req, res) => {
  const employee = employees.find(e => e.emp_id === parseInt(req.params.emp_id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Update a specific employee by emp_id
app.put('/employees/:emp_id', (req, res) => {
  const { emp_id } = req.params;
  const { emp_name, emp_nik } = req.body;
  const employeeIndex = employees.findIndex(e => e.emp_id === parseInt(emp_id));

  if (employeeIndex !== -1) {
    employees[employeeIndex] = { emp_id: parseInt(emp_id), emp_name, emp_nik };
    res.json({ message: 'Employee updated successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Delete a specific employee by emp_id
app.delete('/employees/:emp_id', (req, res) => {
  const { emp_id } = req.params;
  const employeeIndex = employees.findIndex(e => e.emp_id === parseInt(emp_id));

  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    res.json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
