import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import './Login.css';

import { useFetch } from "../../hooks/useFetch";

// async function loginUser(credentials) {
//     let url = 'http://localhost:3000/login';

//     const { data: items, loading, error } = useFetch(credentials, "POST", url); 
// }

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        let url = 'http://localhost:3000/login';
        const { data: feadback, loading, error } = await useFetch({ email, senha }, "POST", url); 

        if(error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error', 
                title: error
            }) 
        }

        setToken(feadback.token);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuário logado com sucesso!',
            showConfirmButton: false, 
            timer: 1500
        })
    }

    return (
        <div className="login-wrapper">
            <h1>Login</h1> 
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setSenha(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};