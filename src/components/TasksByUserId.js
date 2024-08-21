import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function deleteTask(id){
    if(window.confirm( 'Are you sure?')){
        fetch('http://localhost:8080/tasks/' + id,{
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
    }
}

const TasksByUserId = () => {
    const { id } = useParams(); // Získaš id z URL
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);  // Stav pre načítavanie
    
    useEffect(() => {
        // Nahradíš správne id do URL požiadavky
        axios.get(`http://localhost:8080/tasks/usertasks/${id}`)
          .then(response => {
            setTasks(response.data);
            setLoading(false);  // Nastavenie načítania na false
          })
          .catch(error => {
            console.error('There was an error fetching the tasks!', error);
            setLoading(false);  // Zastavenie načítania aj pri chybe
          });
      }, [id]);

      if (loading) {
        return <div>Loading...</div>;
    }

   
    return(
        <>
                <div className="container mt-4">
                    <h2>User Tasks</h2>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                    {tasks.length === 0 ? (
                        // Ak sú úlohy prázdne, zobrazí sa tento riadok
                        <tr>
                            <td colSpan="7" className="text-center">No task found</td>
                        </tr>
                    ) : (
                        // Ak sú úlohy dostupné, zobrazia sa tieto riadky
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>{task.status}</td>
                                <td>{task.category}</td>
                                <td>{task.description}</td>
                                <td>{task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}</td>
                                <td>
                                    <Link key='taskdetails' to={`/tasks/${task.id}`}>
                                        <i className='btn btn-sm btn-success'>Details<i className="far fa-edit ml-1"></i></i>
                                    </Link>
                                    <Link key='taskedit' to={`/tasks/${task.id}/edit`}>
                                        <i className='btn btn-sm btn-primary'>Edit Task<i className="far fa-edit ml-1"></i></i>
                                    </Link>
                                    <i key='delete' onClick={() => deleteTask(task.id)} className='btn btn-sm btn-danger'>
                                        Delete Task<i className="far fa-edit ml-1"></i>
                                    </i>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                    </table>
                    <Link to={`/users/user/${id}/taskCreate`} className="btn btn-primary mb-3">
                Create Task
            </Link>
             </div>
        </>
    );
};

export default TasksByUserId;