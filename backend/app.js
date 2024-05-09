const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let employees = [
    { id: 1, name: 'Alice', position: 'Developer' },
    { id: 2, name: 'Bob', position: 'Designer' }
];

app.get('/api/employees', (req, res) => {
    res.json(employees);
});

app.post('/api/employees', (req, res) => {
    const employee = req.body;
    employees.push({ ...employee, id: employees.length + 1 });
    res.status(201).send();
});

app.put('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let employee = employees.find(emp => emp.id === id);
    const index = employees.indexOf(employee);
    const keys = Object.keys(req.body);

    keys.forEach(key => {
        employee[key] = req.body[key];
    });

    employees[index] = employee;
    res.send(employee);
});

app.delete('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(emp => emp.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
