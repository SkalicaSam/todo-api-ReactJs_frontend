import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const [user, setUser] = useState([]);
    const { id } = useParams();

    useEffect(() => {    //se spustí po načtení komponenty
        axios.get(`http://localhost:8080/users/${id}`)
            .then(res => {
                const user = res.data;
                setUser(user);
            })
            .catch(error => {
                console.error('There was an error fetching the userDetail!', error);
            });
    }, [id]);

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-5 align-center'>
                    <div className='card mb-3'>
                        <div className='card-header bg-success text-white'>User Details</div>
                        <div className='card-body'>
                            <div className='table-responsive'>
                                <table className='table table-striped table-responsive-sm'>
                                    <tbody>
                                        <tr>
                                            <th scope='row'>ID</th>
                                            <td><i href="#">{user.id}</i></td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Name</th>
                                            <td><i href="#">{user.name}</i></td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Surname</th>
                                            <td><i href="#">{user.surname}</i></td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Nickname</th>
                                            <td><i href="#">{user.nickname}</i></td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Age</th>
                                            <td><i href="#">{user.age}</i></td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Password</th>
                                            <td><i href="#">{user.password}</i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
