import React from 'react';

import {Row} from 'react-bootstrap';
import classes from './Title.module.scss';
import logo from '../images/logo-text.svg'


export function Title (){

    return (
                <Row className={classes.logoRow}>
                    <img
                        src={logo} 
                        alt='Logo'/>
                </Row>
                )
}