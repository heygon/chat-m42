import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import { MdFolder, MdRotateLeft, MdMoreVert } from 'react-icons/md';

import logo from '../../assets/m42.png';
import './styles.css';

export default class Login extends Component {
    state = {
        login: "",
        senha: "",
        recebeLogin: []
    };

    /*
    async componentDidMount() {
        const response = await api.get(`listfolder/`);
        this.setState({ folder: response.data });

        console.log(this.state.folder);
    }
    */


    realizarLogin = async e => {
        e.preventDefault();

        const response = await api.post('realizarLogin', {
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

            <div id="main-container">
                <header>
                    <img src={logo} alt="" />
                    <br/>
                    <h1>Box Files M42</h1>
                </header>

                <form onSubmit={this.realizarLogin}>
                    <h3>Acessar plataforma: &nbsp;</h3>
                    <br/>
                    <input class="loginInput" placeholder="Login" value={this.state.login} onChange={this.handleLoginChange} />
                    <input class="SenhaInput" placeholder="Senha" value={this.state.senha} onChange={this.handleSenhaChange} />
                    <button type="submit" > Entrar < /button> 
                </form>
            </div>

        );
    }
}