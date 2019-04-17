import React, { Component } from 'react';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import { MdInsertDriveFile, MdRotateLeft } from 'react-icons/md';
import logo from '../../assets/m42.png';

import './styles.css';

export default class Box extends Component {
    state = { box: {} }

    async componentDidMount() {
        this.subscribeToNewFiles();

        const box = this.props.match.params.id;
        const response = await api.get(`folder/${box}`);

        this.setState({ box: response.data });
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;
        const io = socket('http://localhost:3333');

        io.emit("connectRoom", box);

        io.on("file", data => {
            this.setState({ box: { ...this.state.box, files:[data, ...this.state.box.files, ] } });
        })
    }

    handleUpload = (files) => {
        files.forEach(file => {
            const data = new FormData();
            const box  = this.props.match.params.id; 
            
            data.append('file', file);
            api.post(`folder/${box}/files`, data);
        });
    }

    goback = () =>{
        this.props.history.push('/');
    }

    render() {
        return (             
            <div id = "box-container">
                <header>
                    <img src = { logo } alt = "" className = "logo" />
                    <h1> { this.state.box.title } </h1>

                    <div className="Voltar">Voltar para pastas <MdRotateLeft size = { 28 } color = "#000" onClick={this.goback} /></div>
                </header>


                <div className="content">
                    <Dropzone onDropAccepted = { this.handleUpload } > 
                        {({ getRootProps, getInputProps }) => ( 
                            <div className = "upload" {...getRootProps() } >
                                <input {...getInputProps() } />
                                <p> arraste arquivos ou clique para enviar </p> 
                            </div>
                        )}
                    </Dropzone>


                    <ul> 
                        { this.state.box.files && this.state.box.files.map(file => ( 
                            <li key={file._id}>
                                <a className = "fileInfo" href = { file.url } target = "_blank">
                                
                                <MdInsertDriveFile className = "icon" size = { 24 } color = "#a5cfff" />
                                <strong> { file.title } </strong>
                                </a>
                                <span> há { " " }
                                        { distanceInWords(file.createdAt, new Date(), {
                                            locale: pt
                                        })}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}