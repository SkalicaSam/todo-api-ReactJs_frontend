import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function TaskDetails() {
    const [task, setTask] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);  // Stav pre načítavanie

    useEffect(() => {    //se spustí po načtení komponenty
        axios.get(`http://localhost:8080/tasks/${id}`)
            .then(res => {
                const task = res.data;
                setTask(task);
                setLoading(false);  // Nastavenie načítania na false
            })
            .catch(error => {
                console.error('There was an error fetching the userDetail!', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;  // Zobrazenie načítavania, kým sa údaje nenačítajú
    }

    if (!task) {
        return <div>No task details found</div>;  // Ak sa úloha nenašla, zobraziť túto správu
    }



    return(
        <>
            <div className="container mt-4">
                <h2>Task Details</h2>
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title"><strong>Task Name: </strong>{task.name}</h5>
                    <p className="card-text"><strong>ID:</strong> {task.id}</p>
                    <p className="card-text"><strong>Status:</strong> {task.status}</p>
                    <p className="card-text"><strong>Category:</strong> {task.category}</p>
                    <p className="card-text"><strong>Description:</strong> {task.description}</p>
                    <p className="card-text"><strong>Created At:</strong> {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}</p>
                    </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => window.history.back()}>Back</button>  {/* Tlačidlo na návrat */}
            </div>
        </>
    );
};

export default TaskDetails;