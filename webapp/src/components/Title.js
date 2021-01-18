import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import classes from './Title.module.scss';
import logo from '../images/logo-tight.svg'

export function Title (){
    const TITLE='WHISKY GURU'
    const SUBTITLE='DATA·DRIVEN·WHISKY·RECOMMENDATIONS'
    const AUTHOR='By Jan-Hendrik Ewers'
    const AUTHOR_GITHUB='https://github.com/iwishiwasaneagle'


    return (<Container className={classes.container}>
                <Col>
                    <img className={classes.logo} src={logo} alt='Logo'/>
                </Col>
                <div className={classes.column}>
                    <h1 className={classes.mainTitle}>{TITLE}</h1>
                    <h2 className={classes.subTitle}>{SUBTITLE}</h2>
                    <a className={classes.authorText} href={AUTHOR_GITHUB}>{AUTHOR}</a>
                </div></Container>)
}