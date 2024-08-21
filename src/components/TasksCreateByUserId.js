import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function TaskCreate() {
    const { userId } = useParams();  // Získanie userId z URL
    const navigate = useNavigate();  // Na presmerovanie po vytvorení

    console.log(userId);

    // Počiatočný stav formulára s prázdnymi hodnotami
    const [task, setTask] = useState({
        name: '',
        status: '',
        category: '',
        description: '',
        createdAt: ''
    });

    // Funkcia na spracovanie zmien vo formulári
    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    // Funkcia na odoslanie údajov na server
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!Number.isInteger(Number(task.status))) {
            alert('Status musí byť celé číslo!');
            return; // Zastaví odoslanie formulára, ak status nie je celé číslo
        }

        const taskData = {
            ...task,
            userId: userId  // Pridanie userId do odosielaných údajov
        };
        // console.log(taskData);
        // console.log("Sending task data:", taskData);  // Debugging
 
        axios.post(`http://localhost:8080/tasks?userId=${userId}`, taskData)
            .then(res => {
                console.log('Task created successfully');
                navigate(-1);  // Presmerovanie na predchádzajúcu stránku po úspešnom vytvorení
            })
            .catch(error => {
                console.error('There was an error creating the task!', error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={task.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createdAt">Created At</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="createdAt"
                        name="createdAt"
                        value={task.createdAt}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Task</button>
            </form>
        </div>
    );
}

export default TaskCreate;