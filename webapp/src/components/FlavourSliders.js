import React from 'react';
import classes from './FlavourSliders.module.scss';


export class FlavourSliders extends React.PureComponent {

    constructor(props){
        super(props)
        this.onFlavourSlidersChange = props.onChange;
        this.state = {flavours:props.flavours};

        // this.classes =  makeStyles({
        //     root: {
        //         height: 300,
        //     },
        //     });
    }

    static getDerivedStateFromProps = (props,state) => ({...state,flavours:props.flavours})

    render (){
        return (<div className={classes.sliderRow}>
                    {Object.keys(this.state.flavours).map(d=>
                    (
                    <div className={classes.sliderDiv}>
                        <p>{d}</p>
                        <p>{this.state.flavours[d]}</p>
                    <input     
                        type='range'
                        value={this.state.flavours[d]} 
                        max='1' 
                        min='0' 
                        step='0.01'  
                        orient="vertical"  
                        width='100px'
                        className={classes.flavourSlider}
                        id={'range'+d} 
                        onChange={(e)=>this.onFlavourSlidersChange(d,e.target.value)}
                        /></div>))}
                        </div>)
    }
}
