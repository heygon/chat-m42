import React, { Component } from 'react';
import api from '../../services/api';
import { Link} from 'react-router-dom';
import M from 'materialize-css';

import { MdFolder,MdRotateLeft,MdMoreVert,MdMenu } from 'react-icons/md';
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

    componentDidMount(){
        const elems     = document.querySelectorAll('.sidenav');
        const instances = M.Sidenav.init(elems, '');
    }


    render() {
        const { folder } = this.state.folder;
        return (

            <div className="container containerHome">
                <div className="row">

                    <ul id="slide-out" className="sidenav">
                        <li><div className="user-view">
                        <div className="background">
                            <img src="images/office.jpg"/>
                        </div>
                        <a href="#user"><img className="circle" src="images/yuna.jpg"/></a>
                        <a href="#name"><span className="white-text name">John Doe</span></a>
                        <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div></li>
                        <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                        <li><a href="#!">Second Link</a></li>
                        <li><div className="divider"></div></li>
                        <li><a className="subheader">Subheader</a></li>
                        <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                    </ul>


                    <nav className="blue lighten-3">
                        <MdMenu className="icon col s1 sidenav-trigger" size = { 40 } data-target="slide-out"  />
                        <div className="col s1">
                            <img src = { logo } width={ 60 } />
                        </div>
                        <h4 className="col s4">Box Files M42</h4>
                    </nav>

                    <form onSubmit = { this.handleSubmit }>
                        <h3>Criar nova pasta: &nbsp;</h3>
                        <input placeholder = "Nome da pasta" value = { this.state.newFolder } onChange = { this.handleInputChange }/>
                        <button type = "submit" > Criar < /button> 
                    </form>

                    <div className="col s12 listaFolder">
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
            </div>

        );
    }
}