import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskEdit() {
    const [task, setTask] = useState(null);  // Počiatočný stav je null
    const { id } = useParams();
    const navigate = useNavigate();  // Na presmerovanie po uložení

    useEffect(() => {
        // Načítanie údajov o úlohe po načítaní komponenty
        axios.get(`http://localhost:8080/tasks/${id}`)
            .then(res => {
                setTask(res.data);  // Nastavenie stavu task s údajmi z backendu
            })
            .catch(error => {
                console.error('There was an error fetching the task!', error);
            });
    }, [id]);

    // Funkcia na spracovanie zmien vo formulári
    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    // Funkcia na odoslanie aktualizovaných údajov na server
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8080/tasks/${id}`, task)
            .then(res => {
                console.log('Task updated successfully');
                navigate(`/tasks/${id}`);  // Presmerovanie na stránku s detailom úlohy
            })
            .catch(error => {
                console.error('There was an error updating the task!', error);
            });
    };

    // Ak údaje ešte nie sú načítané, zobrazí sa správa Loading...
    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(task).map(([key, value]) => (
                    key !== "id" && (  // Exclude the "id" field from the form
                    <div className="form-group" key={key}>
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <input
                            type="text"
                            className="form-control"
                            id={key}
                            name={key}
                            value={value || ''}  // Ak údaje nie sú načítané, zobrazí sa prázdny reťazec
                            onChange={handleChange}
                            required
                        />
                    </div>
                    )
                ))}
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default TaskEdit;