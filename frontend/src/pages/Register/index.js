import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import { MdFolder,MdRotateLeft,MdMoreVert } from 'react-icons/md';

import logo from '../../assets/m42.png';
import './styles.css';

export default class Register extends Component {
    state = {
        login: "",
        senha: "",
        rash : ""
    };

    handleSubmit = async e => {
        e.preventDefault();

        console.log(this.state.login+' - '+this.state.senha);
        const response = await api.post('login', {
            title: this.state.newFolder
        });

        this.props.history.push(`/folder/${response.data._id}`);
        
    };

    handleLoginChange = e => {
        this.setState({ login: e.target.value });
    };

    handleSenhaChange = e => {
        this.setState({ senha: e.target.value });
    };


    render() {
        return (

            <div id = "main-container">
                <header>
                    <img src = { logo } alt = "" />
                    <br/>
                    <h1>Box Files M42</h1>
                </header>

                <form onSubmit = { this.handleSubmit }>
                    <h3>Registrar-se: &nbsp;</h3>
                    <input placeholder="Login" value={ this.state.login } onChange={ this.handleLoginChange }/>
                    <input placeholder="Senha" value={ this.state.senha } onChange={ this.handleSenhaChange }/>
                    <button type = "submit" > Criar conta < /button> 
                </form>
                <br/>
                
                
                <div className="register">
                    <Link to={'/login'}>
                        Voltar
                    </Link>
                </div>
                
            </div>


        );
    }
}