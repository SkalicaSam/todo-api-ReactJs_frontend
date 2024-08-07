import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function deleteUser(id){
    if(window.confirm( 'Are you sure?')){
        fetch('http://localhost:8080/users/' + id,{
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
    }
}



export default class User extends React.Component{

    // constructor(props)  standarne sa do neho ukladaju argumenty.
    constructor(users){
        super(users);
        this.state = { users: [], error: null };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users')
        
        .then(res => {
            const users = res.data;
            this.setState( {users});
        })
        .catch(error => {
            console.error('There was an error fetching the users!', error);
            this.setState({ error: 'There was an error fetching the users' });
        });
    }


   

    render (){
        const {  error, users } = this.state;
        return (
            <> 
            {error && <p>{error}</p>}
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4 className='text-center'> Users List</h4>
                                        <table className='table-responsive'>
                                            <table className='table table-triped'>
                                                <thead>
                                                    <tr>
                                                        <th scope='col'><strong>Id</strong></th>
                                                        <th scope='col'><strong>Nickname</strong></th>
                                                        <th scope='col'><strong>Name</strong></th>
                                                        <th scope='col'><strong>Surname</strong></th>
                                                        <th scope='col'><strong>Email</strong></th>
                                                        <th scope='col'><strong>Age</strong></th>
                                                        <th scope='col'><strong>Password</strong></th>
                                                        <th scope='col'></th>

                                                    </tr>
                                                </thead>
                                                {users.map(user => (
                                                    <tbody>
                                                        <tr key={user.id}>    {/* kluc ktory sa hlada v poli */}
                                                            <th scope='row'><Link to={`/user/${user.id}`}>{user.id}</Link> </th>  {/* tu pozor na spetny apostrof `` */}
                                                                <td>{user.nickname}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.surkname}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.age}</td>
                                                                <td>{user.password}</td>
                                                                <td>
                                                                    <Link to={`user/${user.id}/usertasks`}><i className='btn btn-sm btn-success' >Tasks<i class="far fa-edit ml-1"></i></i></Link>
                                                                    <Link to={`user/${user.id}/edit`}><i className='btn btn-sm btn-primary' >Edit user<i class="far fa-edit ml-1"></i></i></Link>
                                                                    <i onClick={()=>deleteUser(user.id)} className='btn btn-sm btn-danger'>Delete user<i class="far fa-edit ml-1"></i></i>
                                                                </td>
                                                        </tr>
                                                    </tbody>
                                                    
                                                    ))}

                                             </table>
                                             <div className='col-3 text-left'>
                                                <Link to={`user/create`}><i className='btn btn-sm btn-primary' >Create new user<i class="far fa-edit ml-1"></i></i></Link>
                                             </div>



                                        </table>
                                        
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}