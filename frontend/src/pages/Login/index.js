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

            <div className="container">
                <div className="row">
                    <div className="col s6 offset-s3 card cardLogin">
                        <div className="card-content">
                            <img src={ logo } alt="" className="col s4" />
                            <h3 className="col s8"><strong>Box Files M42</strong></h3>
                        

                            <form onSubmit = { this.handleSubmit }>
                                <h5 className="col s12 center-align">Acessar a plataforma:</h5>

                                <div className="input-field col s12">
                                    <input id="Email" type="text" className="validate" value={ this.state.email } onChange={ this.handleEmailChange }/>
                                    <label htmlFor="Email">E-mail</label>
                                </div>

                                <div className="input-field col s12">
                                    <input id="Senha" type="password" className="validate" value={ this.state.senha } onChange={ this.handleSenhaChange }/>
                                    <label htmlFor="Senha">Senha</label>
                                </div>

                                { 
                                    this.state.logado && this.state.logado.map(logado => (
                                        this.props.history.push(`/home/${logado._id}`)
                                    ))
                                }
                                <div className="col s12">
                                    <button type="submit" className="col s12 btn blue" > Entrar </button> 
                                </div>
                            </form>
                            
                            <div className="col s12">&nbsp;</div>
                            
                            
                            <div className="register col s12 center-align">
                                <Link to={'/register'}>
                                    Cadastre-se
                                </Link>
                            </div>

                            <div className="col s12">&nbsp;</div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}