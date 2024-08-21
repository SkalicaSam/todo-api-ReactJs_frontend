import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const CreateUser = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        nickName: '',
        email: '',
        age: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

         // Overenie, či sú údaje neprázdne (not null)
         if (!user.name || !user.surname || !user.nickName || !user.email || !user.age || !user.password) {
            setError('Všetky polia sú povinné.');
            return;
        }

        // Overenie, či e-mail je platný
        const isValidEmail = (email) => {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailRegex.test(email);
        };

        if (!isValidEmail(user.email)) {
            setError('Neplatná e-mailová adresa.');
            return;
        }

        // Overenie, či je vek číslo
        if (isNaN(user.age)) {
            setError('Age must be a number.');
            return; // Zastaví odoslanie formulára, ak vek nie je číslo
        }

        // Ak je vek číslo, pokračujeme v odoslaní údajov
        axios.post('http://localhost:8080/users', user)
            .then(response => {
                console.log('User created successfully:', response.data);
                setError(null); // Vymaže predchádzajúce chyby
                
                // Zobrazenie alertu a reload stránky
                alert('User was created');
                window.location.reload(); // Reload stránky po potvrdení alertu
            })
            .catch(error => {
                console.error('There was an error creating the user!', error);
                setError('There was an error creating the user');
            });
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

                <button type="submit" className='btn btn-primary btn-lg btn-block'>CREATE USER</button>
            </form>
        </div>
    );
};

export default CreateUser;

