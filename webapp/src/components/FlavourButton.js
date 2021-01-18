import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import classes from './FlavourButton.module.scss';

/**
 * @deprecated
 */
export class FlavourButton extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            flavour: props.flavour,
            counter: props.counter
        }
        this.increment = () => props.increment(this.state.flavour);
        this.decrement = () => props.decrement(this.state.flavour);
    }

    static getDerivedStateFromProps = (props, state) => ({ ...state, flavour: props.flavour, counter: props.counter })

    render() {
        return (
            <div className={classes.flavourButtonContainer}>
                <Button onClick={this.decrement} className={classes.custButton}>-</Button>
                <div className={classes.flavourButtonGrid}>
                        <div className={classes.flavourText}>{this.state.flavour}</div>
                        <div className={classes.counterText}>{this.state.counter}</div>
                    </div>
                <Button onClick={this.increment} className={classes.custButton}>+</Button>
            </div>
        );

    }
}