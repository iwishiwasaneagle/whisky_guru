import React from 'react';
import classes from './FlavourSliders.module.scss';
import Form from 'react-bootstrap/Form'
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

export class FlavourSliders extends React.PureComponent {

    constructor(props){
        super(props)
        this.onFlavourSlidersChange = props.onChange;
        this.state = {flavours:props.flavours};
    }

    static getDerivedStateFromProps = (props,state) => ({...state,flavours:props.flavours})

    render (){
        return (<Form className={classes.sliderrow}>
                    {Object.keys(this.state.flavours).map(d=>
                    (
                    <Form.Group controlId={'range'+d} className={classes.sliderdiv}>
                        <Form.Label>{d}</Form.Label>
                        <Form.Label>{this.state.flavours[d]}</Form.Label>
                        <Slider
                            vertical
                            min={0}
                            max={1}
                            step={0.01}
                            trackStyle={{ backgroundColor: 'gray'}}
                            handleStyle={{ backgroundColor: classes.primary, borderColor: 'transparent', boxShadow: 'transparent'}}
                            onChange={(e)=>this.onFlavourSlidersChange(d,e)}
                            />
                    </Form.Group>))}
                </Form>)
    }
}
