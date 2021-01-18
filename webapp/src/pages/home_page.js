import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { DistilleryCard } from '../components/DistilleryCard';
import { Title } from '../components/Title'

import classes from './home_page.module.scss';

import {FlavourSliders} from '../components/FlavourSliders';

export class HomePage extends React.PureComponent{

    constructor(props) {
        super(props)
        this.state = {
            flavours: {}}

        
    }
    
    componentDidMount() {
        console.log('Fetching flavours')
        fetch('https://europe-west2-whiskyguru.cloudfunctions.net/get_flavours')
            .then(response => response.json())
            .then((response) => {
                const flavours = {};
                Object.values(response.flavours).forEach(d => {
                    flavours[d] = 0
                })
                this.setState((prev) => ({ ...prev, flavours: flavours }));
                console.log(flavours)
                this.forceUpdate();
            }
            );
    }

    onSubmitClick(event) {
        event.preventDefault();
        if (this.state.flavours) {
            this.setState(p=>({...p,whisky_response:{loading:true}}))
            var url = "https://europe-west2-whiskyguru.cloudfunctions.net/get_whisky_recommendation?N=3&"
            Object.keys(this.state.flavours).forEach(flavour => {
                (url += flavour.toLowerCase()+ '=' + this.state.flavours[flavour] + '&')
            });
            url = url.slice(0, -1);
            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(response => this.setState((prev) => ({ ...prev, whisky_response: {...response,loading:false} })));
        }
    }

    onFlavourSlidersChange = (flavour,value) => this.setState((p)=>({...p,flavours:{...p.flavours,[flavour]:value}}))


    onResetButtonClick(){
        const state_save = this.state;
        delete state_save.whisky_response;
        this.setState(state_save);
        this.forceUpdate();
    }

    onDeleteAllButtonClick = () => this.setState((prev) => {
        const reset = {}
        Object.keys(prev.flavours).map(d => {
                    reset[d] = 0;
                    return 1
                })

        return {...prev,flavours:reset}})



    render() {
        let whisky_result_cards;
        if (this.state.whisky_response){
            if(!this.state.whisky_response.loading) {
            const data = this.state.whisky_response;
            var keys = Object.keys(data).filter(d=> d!=='loading')

            var max = 0;
            keys.forEach((key)=> {             
                Object.values(data[key].profile).forEach(d=>{
                    if(d>max){
                        max=d;
                    }
                });
            });
            max *= 1.1;

            keys = keys.filter(d=>d!=='custom');
            keys.sort((a,b)=> data[a].match > data[b].match ? -1 : 1)

            whisky_result_cards = 
                <Col>
                {keys.map((d,i)=>
                    (<div className={classes.whiskyCard}> 
                        <DistilleryCard  flavours={this.state.whisky_response[d].profile} name={d} max={max} position={i+1} percentage={data[d].match} selected={data.custom.profile}/>
                    </div>))}
                </Col>
        }else{
            whisky_result_cards = (<Col className={classes.responseProgressBar}><ProgressBar animated now={100}></ProgressBar></Col>)
        }
        }

        let reset_button, delete_all_button;
        if(this.state.whisky_response){
            reset_button = <Button onClick={this.onResetButtonClick.bind(this)}>Go again?</Button>
        }else{
            delete_all_button = <Button onClick={this.onDeleteAllButtonClick.bind(this)}>Delete All</Button>
        }
            
        return (
            <Container>
                <Col>
                    <Title/>
                    <Card>
                    <Card.Header>Select your desired flavours</Card.Header>
                    <Card.Body className={classes.cardBody}>
                        {this.state.flavours ?  <FlavourSliders flavours={this.state.flavours} onChange={this.onFlavourSlidersChange.bind(this)} />: <Spinner/>  }
                    </Card.Body>
                    <br />
                    <Card.Footer className={classes.controlButtons}>
                        <Button className='secondary' onClick={this.onSubmitClick.bind(this)} disabled={reset_button}>Submit</Button> {reset_button}{delete_all_button}
                    </Card.Footer>
                    </Card>
                    <Row>
                        {whisky_result_cards}
                    </Row>
                </Col>
            </Container>
        )
    }
}
