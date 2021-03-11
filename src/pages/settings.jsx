import React from 'react'
import { Button, Col, Row } from 'react-materialize'
import Nav from "../helpers/nav";
import {getSettings, saveSettings, clearSettings} from "../helpers/data";
import LocationBreadcrumb from "../helpers/location-breadcrumb";

export default class Settings extends React.Component {
    state = {
        d: getSettings(),
        renderKey: 0
    };

    render() {
        const {d: {periodic: {minRepeated, maxDelay}}, renderKey} = this.state;

        return (
            <div>
                <Nav current="settings"/>
                <LocationBreadcrumb pathname={this.props.location.pathname} transformer={LocationBreadcrumb.title}/>
                <div className="container">
                    <Row key={renderKey}>
                        <Col s={12}>
                            <p className="range-field">
                                <label htmlFor="min-repeated-messages">Minimum messages with low delay (default 10)</label>
                                <input
                                    defaultValue={minRepeated}
                                    name="min-repeated-messages"
                                    type="range" min="2" max="100"
                                    onChange={(event) => {
                                        saveSettings({
                                            ...this.state.d,
                                            periodic: {
                                                ...this.state.d.periodic,
                                                minRepeated: parseInt(event.target.value, 10)
                                            }
                                        });
                                        this.setState({d: getSettings()});
                                    }}
                                />
                            </p>
                        </Col>
                        <Col s={12}>
                            <p className="range-field">
                                <label htmlFor="max-delay">Maximum delay between consecutive messages (in ms, default 30000)</label>
                                <input
                                    defaultValue={maxDelay}
                                    name="max-delay"
                                    type="range" min="0" max="120000"
                                    onChange={(event) => {
                                        saveSettings({
                                            ...this.state.d,
                                            periodic: {
                                                ...this.state.d.periodic,
                                                maxDelay: parseInt(event.target.value, 10)
                                            }
                                        });
                                        this.setState({d: getSettings()});
                                    }}
                                />
                            </p>
                        </Col>
                        <Col s={4}/>
                        <Col s={4}>
                            <Button onClick={()=>{
                                clearSettings();
                                this.setState({d: getSettings(), renderKey: renderKey + 1});
                            }}>Clear settings</Button>
                        </Col>
                        <Col s={4}/>
                    </Row>
                </div>
            </div>
        )
    }
}
