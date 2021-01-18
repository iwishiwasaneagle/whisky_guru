import React from 'react';
import Container from 'react-bootstrap/Container';

import classes from './FlavourButtons.module.scss';

import { FlavourButton } from './FlavourButton';

/**
 * @deprecated 
 */
export class FlavourButtons extends React.Component {
    constructor(props) {
        super(props);

        this.onClickCallback = props.onClick;
        this.state = { flavours: {} };

        this.getButtons.bind(this);
    }

    updateParentSelected(){

    }

    componentDidMount() {
        fetch('http://localhost:5000/api/v1/flavours')
            .then(response => response.json())
            .then((response) => {
                const flavours = {};
                Object.values(response.flavours).map(d => {
                    flavours[d] = 0;
                    return 1
                })
                this.setState((prev) => ({ ...prev, flavours: flavours }));
            })
    }


    flavourButtonIncrement(flavour) {
        if (this.state.flavours[flavour] < 100) {
            this.setState(prev => {
                const c = prev.flavours[flavour] + 1;
                return { ...prev, flavours: { ...prev.flavours, [flavour]: c } };
            }
            )
        }
    }
    flavourButtonDecrement(flavour) {
        if (this.state.flavours[flavour] > 0) {
            this.setState(prev => {
                const c = prev.flavours[flavour] - 1;
                return { ...prev, flavours: { ...prev.flavours, [flavour]: c } };
            }
            )
        }
    }

    getButtons() {
        return Object.keys(this.state.flavours).map(d => (
            <FlavourButton className={classes.flavourButton} key={'flavour_button_' + d} flavour={d} counter={this.state.flavours[d]} increment={this.flavourButtonIncrement.bind(this)} decrement={this.flavourButtonDecrement.bind(this)} />))
    }

    render() {
        return <div className={classes.flavourButtonsContainer}>{this.getButtons()}</div>
    }
}