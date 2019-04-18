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
                    <div className="col s6 offset-s3 card cardRegister">
                        <div className="card-content">
                            
                            <img src={ logo } alt="" className="col s4" />
                            <h3 className="col s8"><strong>Box Files M42</strong></h3>
                        

                            <form onSubmit = { this.handleSubmit } className="col s12">
                                <h5 className="col s12 center-align">Registrar-se:</h5>
                                
                                <div className="input-field col s12">
                                    <input id="Nome" type="text" className="validate" value={ this.state.nome } onChange={ this.handleNomeChange }/>
                                    <label htmlFor="Nome">Nome</label>
                                </div>

                                <div className="input-field col s12">
                                    <input id="Email" type="text" className="validate" value={ this.state.email } onChange={ this.handleEmailChange }/>
                                    <label htmlFor="Email">E-mail</label>
                                </div>

                                <div className="input-field col s12">
                                    <input id="Senha" type="password" className="validate" value={ this.state.senha } onChange={ this.handleSenhaChange }/>
                                    <label htmlFor="Senha">Senha</label>
                                </div>

                                <button type="submit" className="btn blue col s12" > Criar conta </button> 
                            </form>
                            
                            <div className="col s12">&nbsp;</div>
                            
                            <div className="register col s12 center-align">
                                <Link to={'/'}>
                                    Voltar
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