import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskEdit () {
    const [task, setTask] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();  // Na presmerovanie po uložení

    useEffect(() => {    //se spustí po načtení komponenty
        axios.get(`http://localhost:8080/tasks/${id}`)
            .then(res => {
                const task = res.data;
                setTask(task);
            })
            .catch(error => {
                console.error('There was an error fetching the taskedit!', error);
            });
    }, [id]);

    const handleChange = (event) => {

        console.log(event);
        const { name, value } = event.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        console.log('Name:', event.target.name);
        event.preventDefault();
        
        axios.put(`http://localhost:8080/tasks/${id}`, task)
            .then(res => {
                console.log('Task updated successfully');
                navigate(-1);  // Presmerovanie na predchádzajúcu stránku
            })
            .catch(error => {
                console.error('There was an error updating the task!', error);
            });
            alert('Task was submitted');
            window.location.reload(); // Reload stránky po potvrdení alertu
    };


    return(
        <>
            TaskEdit
            <div className="container mt-4">
                <h2>Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Task Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={task.name || ''}  // Ak údaje nie sú načítané, zobrazí sa prázdny reťazec
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
                        value={task.status || ''}
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
                        value={task.category || ''}
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
                        value={task.description || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>


        </>
    );
};

export default TaskEdit;