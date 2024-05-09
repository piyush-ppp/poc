import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', position: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
    };

    const handleAdd = async () => {
        if (!editFormData.name || !editFormData.position) return;
        await axios.post('http://localhost:5000/api/employees', editFormData);
        setEditFormData({ name: '', position: '' });
        fetchEmployees();
    };

    const handleEdit = (employee) => {
        setEditingId(employee.id);
        setEditFormData({ name: employee.name, position: employee.position });
    };

    const handleUpdate = async () => {
        await axios.put(`http://localhost:5000/api/employees/${editingId}`, editFormData);
        setEditingId(null);
        setEditFormData({ name: '', position: '' });
        fetchEmployees();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        fetchEmployees();
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    return (
        <div>
            {editingId ? (
                <div>
                    <input
                        name="name"
                        placeholder="Name"
                        value={editFormData.name}
                        onChange={handleFormChange}
                    />
                    <input
                        name="position"
                        placeholder="Position"
                        value={editFormData.position}
                        onChange={handleFormChange}
                    />
                    <button onClick={handleUpdate}>Update Employee</button>
                </div>
            ) : (
                <div>
                    <input
                        name="name"
                        placeholder="Name"
                        value={editFormData.name}
                        onChange={handleFormChange}
                    />
                    <input
                        name="position"
                        placeholder="Position"
                        value={editFormData.position}
                        onChange={handleFormChange}
                    />
                    <button onClick={handleAdd}>Add Employee</button>
                </div>
            )}
            <ul>
                {employees.map(emp => (
                    <li key={emp.id}>
                        {emp.name} - {emp.position}
                        <button onClick={() => handleEdit(emp)}>Edit</button>
                        <button onClick={() => handleDelete(emp.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Employee;
