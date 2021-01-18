import React, { useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { RadarPlot } from './RadarPlot';


const flavoursMaster = { body: 0, sweetness: 0, smoky: 0, medicinal: 0, tobacco: 0, honey: 0, spicy: 0, winey: 0, nutty: 0, malty: 0, fruity: 0, floral: 0 };


export function TempWhiskySelector() {
    const [flavours, setFlavours] = useState(flavoursMaster);
    const [whiskyResult, setWhiskyResult] = useState({});

    const onChange = (key, data) => {
        const input = data.target.value;
        const re = /^\d*\.{0,1}\d*$/
        if (re.test(input)) {
            setFlavours((prev) => ({ ...prev, [key]: parseFloat(input) }))
        }
    }

    const getWhisky = () => {
        var url = "http://localhost:5000/api/v1/whisky/recommend?N=5&"
        Object.keys(flavours).map(key => {
            url += key + "=" + flavours[key] + '&'
        });
        fetch(url)
            .then(response => response.json())
            .then(response => setWhiskyResult(response));
    }

    let resultComponent;
    if (Object.keys(whiskyResult).length === 0) {
        resultComponent = <h1></h1>;
    } else {
        resultComponent = Object.keys(whiskyResult).map(key => (<Row>{key} - {Math.round(whiskyResult[key] * 10000) / 100}%</Row>));
    }

    return (
        <Container fluid>
            <RadarPlot
                flavours={flavours}
            />
            <ul>{JSON.stringify(flavours)}</ul>
            <Container fluid><Row>
                <Col className="justify-content-md-center">

                    <form onSubmit={(e) => { e.preventDefault(); getWhisky(); }}>
                        {
                            Object.keys(flavours).map((d) => (
                                <Row>
                                    <h2 sm={2}>{d}: {10 * flavours[d]}% </h2><RangeSlider step={2} max='10' min='0' key={'flavor_' + d} value={flavours[d]} onChange={(value) => onChange(d, value)} />
                                </Row>))
                        }
                        <Row>
                            <Button type='submit'> Go </Button>
                        </Row>
                    </form>
                </Col>
                <br />
                <Col>
                    {resultComponent}
                </Col>
            </Row>
            </Container></Container>
    );
}