import React from 'react'
import { Button, Col, Input, Modal, Row, Section } from 'react-materialize';
import {getData, setData, clearData} from "../helpers/data";
import Guild from "../views/guild";
import LocationBreadcrumb from "../helpers/location-breadcrumb";
import Nav from "../helpers/nav";

export default class Home extends React.Component {
    state = {
        url: null,
        urlInvalid: true
    };

    onChange = (event, value) => {
        try {
            new URL(value);
            this.setState({urlInvalid: false, url: value});
        } catch(ignored) {
            this.setState({urlInvalid: true, url: value});
        }
    };

    loadFile() {
        const discordBase = "https://cdn.discordapp.com/attachments/";
        let url = this.state.url;
        if(url.startsWith(discordBase)) {
            url = "/cors-proxy/" + url.substring(discordBase.length);
        }
        fetch(url)
            .then(r=>r.json())
            .then(setData)
            .then(()=>window.location.reload())
            .catch(error=>{
                window.Materialize.toast('Error loading json: ' + error, 10000)
            })
    }

    render() {
        const stored = getData();

        const loadFile = (
            <Section>
                <Row>
                    <Input type='text' label={`URL${this.state.urlInvalid ? " (invalid)" : ""}`} s={12} className={this.state.urlInvalid ? "invalid" : ""} onChange={(event, value) => this.onChange(event, value)}/>
                    <Button disabled={this.state.urlInvalid} onClick={()=>this.loadFile()}>Load</Button>
                </Row>
            </Section>
        );

        if(stored == null) {
            return (
                <div>
                    <Nav remove="home"/>
                    <LocationBreadcrumb pathname={this.props.location.pathname}/>
                    <div className="container">
                        {loadFile}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Nav remove="home"/>
                <LocationBreadcrumb pathname={this.props.location.pathname}/>
                <div className="container">
                    <Guild {...stored} location={this.props.location}/>
                    <Row>
                        <Col s={4}>
                            <Modal trigger={
                                <Button>Load another file</Button>
                            }>
                                {loadFile}
                            </Modal>
                        </Col>
                        <Col s={4}/>
                        <Col s={4}>
                            <Button onClick={()=>{
                                clearData();
                                this.setState({});
                            }}>Clear data</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
