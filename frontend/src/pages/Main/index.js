import React, { Component } from 'react';
import api from '../../services/api';
import { Link} from 'react-router-dom';

import { MdFolder,MdRotateLeft,MdMoreVert } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import logo from '../../assets/m42.png';
import './styles.css';

export default class Main extends Component {
    state = {
        newFolder: "",
        folder: []
    };

    async componentDidMount() {
        const response = await api.get(`listfolder/`);
        this.setState({ folder: response.data });

        console.log(this.state.folder);
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


    render() {
        const { folder } = this.state.folder;
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


                <div className="listaFolder">
                    <h2>Suas pastas</h2>
                    <br/>
                    <ul> 
                        { folder && folder.map(folders => ( 
                            
                            <li key={folders._id}>
                                <Link to={`/folder/${folders._id}`}>
                                    <div className = "folderInfo" >
                                        <MdFolder className = "icon" size = { 40 } />
                                        <strong> { folders.title }</strong>
                                        <br/>
                                        <span className="criadoA"> há { " " }
                                            { distanceInWords(folders.createdAt, new Date(), {
                                                locale: pt
                                            })}
                                        </span>
                                    </div>
                                </Link>

                                <MdMoreVert className = "icon-actions" size = { 30 } />
                            </li>
                        ))}
                    </ul>
                </div>

            </div>


        );
    }
}