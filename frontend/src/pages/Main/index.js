import React, { Component } from 'react';
import api from '../../services/api';

import { MdInsertDriveFile,MdRotateLeft } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import logo from '../../assets/m42.png';
import './styles.css';

export default class Main extends Component {
    state = {
        newFolder: "",
        folder: {}
    };

    async componentDidMount() {
        const response = await api.get(`listfolder/`);
        this.setState({ folder: response.data });
    }


    handleSubmit = async e => {
        e.preventDefault();

        const response = await api.post('newFolder', {
            title: this.state.newFolder
        });

        this.props.history.push(`/folder/${response.data._id}`);
    };

    handleInputChange = e => {
        this.setState({ newFolder: e.target.value });
    };

    handleUpload = (files) => {
        files.forEach(file => {
            const data = new FormData();
            const box  = this.props.match.params.id; 
            
            data.append('file', file);
            api.post(`folder/${box}/files`, data);
        });
    }



    render() {
        return (

            <div id = "main-container">
                <header>
                    <img src = { logo } alt = "" />
                    <h1>Box Files M42</h1>
                </header>

                <form onSubmit = { this.handleSubmit }>
                    <h3>Criar nova pasta: &nbsp;</h3>
                    <input placeholder = "Nome da pasta" value = { this.state.newFolder } onChange = { this.handleInputChange }/>
                    <button type = "submit" > Criar < /button> 
                </form>


                <ul> 
                    { this.state.folder && this.state.folder.map(folder => ( 
                        <li key={folder._id}>
                            <a className = "fileInfo" href = { `folder/${folder._id}/files` } target = "_blank">
                            
                            <MdInsertDriveFile className = "icon" size = { 24 } color = "#a5cfff" />
                            <strong> { folder.title } </strong>
                            </a>
                            <span> há { " " }
                                    { distanceInWords(folder.createdAt, new Date(), {
                                        locale: pt
                                    })}
                            </span>
                        </li>
                    ))}
                </ul>

            </div>


        );
    }
}