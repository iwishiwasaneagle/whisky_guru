import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Title.module.scss';

export function Title (){
    const TITLE='WHISKY GURU'
    const SUBTITLE='DATA·DRIVEN·WHISKY·RECOMMENDATIONS'
    const AUTHOR='By Jan-Hendrik Ewers'
    const AUTHOR_GITHUB='https://github.com/iwishiwasaneagle'


    return (<Container className={classes.container}>
                <Col className={classes.column}>
                    <Row className={classes.mainTitle}>{TITLE}</Row>
                    <Row className={classes.subTitle}>{SUBTITLE}</Row>
                    <a className={classes.authorText} href={AUTHOR_GITHUB}>{AUTHOR}</a>
                </Col></Container>)
}