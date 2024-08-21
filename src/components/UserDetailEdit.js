import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetailEdit = () => {
    const { id } = useParams(); // získanie ID z URL parametrov
    const [user, setUser] = useState({
        name: '',
        surname: '',
        nickName: '',
        email: '',
        age: '',
        password: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${id}`)
            .then(res => {
                const fetchedUser = res.data;
                setUser(fetchedUser);
            })
            .catch(error => {
                console.error('There was an error fetching the user!', error);
                setError('There was an error fetching the user');
            });
    }, [id]);

    const handleChange = (event) => {

        console.log(event);
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        console.log('Name:', event.target.name);
        event.preventDefault();
        // Overenie, či je vek číslo
        if (isNaN(user.age)) {
            setError('Age must be a number.');
            return; // Zastaví odoslanie formulára, ak vek nie je číslo
        }

        axios.put(`http://localhost:8080/users/${id}`, user)
            .then(response => {
                console.log('User updated successfully:', response.data);
            })
            .catch(error => {
                console.error('There was an error updating the user!', error);
            });
        alert('User was submitted');
        window.location.reload(); // Reload stránky po potvrdení alertu
    };

    return (
        <div className='container'>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='form-group row mt-3'>
                    <label htmlFor="colFormLabelLg" className='col-4 col-form-label col-form-label-lg text-left'>NAME</label>
                    <div className='col-8'>
                        <input 
                            name="name"
                            value={user.name}
                            className='form-5 form-control-lg ml-2'
                            id='colFormLabelLg'
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='form-group row mt-3'>
                    <label htmlFor="colFormLabelLg" className='col-4 col-form-label col-form-label-lg text-left'>SURNAME</label>
                    <div className='col-8'>
                        <input 
                            name="surname"
                            value={user.surname}
                            className='form-5 form-control-lg ml-2'
                            id='colFormLabelLg'
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='form-group row mt-3'>
                    <label htmlFor="colFormLabelLg" className='col-4 col-form-label col-form-label-lg text-left'>NICKNAME</label>
                    <div className='col-8'>
                        <input 
                            name="nickName"
                            value={user.nickName}
                            className='form-5 form-control-lg ml-2'
                            id='colFormLabelLg'
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='form-group row mt-3'>
                    <label htmlFor="colFormLabelLg" className='col-4 col-form-label col-form-label-lg text-left'>EMAIL</label>
                    <div className='col-8'>
                        <input 
                            name="email"
                            value={user.email}
                            className='form-5 form-control-lg ml-2'
                            id='colFormLabelLg'
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='form-group row mt-3'>
                    <label htmlFor="colFormLabelLg" className='col-4 col-form-label col-form-label-lg text-left'>AGE</label>
                    <div className='col-8'>
                        <input 
                            name="age"
                            value={user.age}
                            className='form-5 form-control-lg ml-2'
                            id='colFormLabelLg'
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='form-group row mt-3'>
                    <label htmlFor="colFormLabelLg" className='col-4 col-form-label col-form-label-lg text-left'>PASSWORD</label>
                    <div className='col-8'>
                        <input 
                            name="password"
                            value={user.password}
                            className='form-5 form-control-lg ml-2'
                            id='colFormLabelLg'
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className='btn btn-primary btn-lg btn-block'>SAVE CHANGES</button>
            </form>
        </div>
    );
};

export default UserDetailEdit;
