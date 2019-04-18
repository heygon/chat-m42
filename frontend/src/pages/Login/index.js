import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import logo from '../../assets/m42.png';
import './styles.css';

export default class Login extends Component {
    state = {
        email: "",
        senha: "",
        logado: []
    };

    handleSubmit = async e => {
        e.preventDefault();

        const response = await api.post('login', {
            email: this.state.email,
            senha: this.state.senha,
        });

        this.setState({ logado: response.data });
        
    };

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
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
                    <h3>Acessar a plataforma: &nbsp;</h3>
                    <input placeholder="E-mail" value={ this.state.email } onChange={ this.handleEmailChange }/>
                    <input placeholder="Senha" type="password" value={ this.state.senha } onChange={ this.handleSenhaChange }/>
                    { 
                        this.state.logado && this.state.logado.map(logado => (
                            this.props.history.push(`/home/${logado._id}`)
                        ))
                    }            
                    <button type = "submit" > Entrar < /button> 
                </form>
                <br/>
                
                
                <div className="register">
                    <Link to={'/register'}>
                        Cadastre-se
                    </Link>
                </div>
                
            </div>


        );
    }
}