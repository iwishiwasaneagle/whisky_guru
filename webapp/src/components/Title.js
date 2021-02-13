import React from 'react';
import {Row} from 'react-bootstrap';
import classes from './Title.module.scss';
import logo from '../images/logo-text.svg'

export function Title (){
    // const TITLE='WHISKY GURU'
    // const SUBTITLE='DATA·DRIVEN·WHISKY·RECOMMENDATIONS'
    // const AUTHOR='By Jan-Hendrik Ewers'
    // const AUTHOR_GITHUB='https://github.com/iwishiwasaneagle'

    return (
                <Row className={classes.logoRow}>
                    <img
                        src={logo} 
                        alt='Logo'/>
                </Row>
                )
}