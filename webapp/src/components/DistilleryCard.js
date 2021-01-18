import React from 'react';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { RadarPlot } from './RadarPlot';

export class DistilleryCard extends React.Component{   
    
    
    renderDistilleryTooltip = (props,percentage) => (
        <Tooltip {...props}>{percentage}%</Tooltip>
    );

    render(){
        const {name, flavours, max, position, percentage, selected} = this.props;

        console.log(selected)

        return (<Card>
            <Card.Header>
                        <OverlayTrigger 
                            placement='top' 
                            overlay={(props) => <Tooltip {...props}>{Math.round(percentage*10000)/100}%</Tooltip>}>
                            <ul>#{position}: {name}</ul>
                        </OverlayTrigger>                
            </Card.Header>
            <Card.Body>
            <RadarPlot name={name} flavours={flavours} max={max} selected={selected}/>
            </Card.Body>
        </Card>)


    }
}