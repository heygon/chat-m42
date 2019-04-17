import React, { Component } from 'react';

import { MdInsertDriveFile } from 'react-icons/md';

import logo from '../../assets/m42.png';
import './styles.css';

export default class Box extends Component {
    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt="" />
                    <h1>M42</h1>
                </header>

                <ul>
                    <li>
                        <a href="#">
                            <MdInsertDriveFile size={24} color="#A5CFFF" />
                            <strong>M42</strong>
                        </a>
                        <span>criado a 3 minutis atrás</span>
                    </li>
                    <li>
                        <a href="#">
                            <MdInsertDriveFile size={24} color="#A5CFFF" />
                            <strong>M42</strong>
                        </a>
                        <span>criado a 3 minutis atrás</span>
                    </li>

                </ul>
            </div>
        );
    }
}