import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import { MdFolder,MdRotateLeft,MdMoreVert } from 'react-icons/md';

import logo from '../../assets/m42.png';
import './styles.css';

export default class Register extends Component {
    state = {
        nome: "",
        email: "",
        senha: "",
    };

    handleSubmit = async e => {
        e.preventDefault();

        const response = await api.post('register', {
            nome   : this.state.nome,
            email  : this.state.email,
            senha  : this.state.senha,
            perfil : 1,
            status : 1
        });

        this.props.history.push(`home/${response.data._id}`);        
    };

    handleNomeChange = e => {
        this.setState({ nome: e.target.value });
    };
    handleSenhaChange = e => {
        this.setState({ senha: e.target.value });
    };
    handleEmailChange = e => {
        this.setState({ email: e.target.value });
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
                    <input placeholder="Nome" value={ this.state.nome } onChange={ this.handleNomeChange }/>
                    <input placeholder="E-mail" value={this.state.email} onChange={this.handleEmailChange} />
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