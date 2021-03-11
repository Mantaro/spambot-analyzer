import React from 'react'
import Nav from "../helpers/nav";
import LocationBreadcrumb from "../helpers/location-breadcrumb";
import { Table } from 'react-materialize'

function entity(name, fields) {
    const f = [];
    for(const k of Object.getOwnPropertyNames(fields)) {
        f.push(
            <tr>
                <td>{k}</td>
                <td>{fields[k]}</td>
            </tr>
        )
    }
    return (
        <div>
            <h4 id={name.toLowerCase().replace(/\s+/g, "-")}>{name}</h4>
            <Table>
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {f}
                </tbody>
            </Table>
        </div>
    );
}

function anchor(to, text) {
    return <a href={"#" + to.replace(/\s+/g, "-")}>{text || to}</a>
}

const example = {
    id: "123",
    name: "my cool guild",
    channels: {
        "456": {
            name: "my channel 1",
            stats: {
                delays: {
                    "789": [
                        1000,
                        2000,
                        3000
                    ],
                    "012": [
                        1100,
                        2100,
                        3100
                    ]
                }
            },
            messages: [
                {
                    author: {
                        id: "789",
                        name: "spambot #1",
                        discriminator: "2424",
                        bot: false
                    },
                    raw: "!ping",
                    content: "!ping",
                    id: "1000",
                    timestamp: "2018-09-14T22:16:13.055Z"
                },
                {
                    author: {
                        id: "012",
                        name: "my poor little bot",
                        discriminator: "0001",
                        bot: true
                    },
                    raw: "Pong!",
                    content: "Pong!",
                    id: "1001",
                    timestamp: "2018-09-14T22:16:13.455Z"
                },
                {
                    author: {
                        id: "789",
                        name: "spambot #1",
                        discriminator: "2424",
                        bot: false
                    },
                    raw: "!ping",
                    content: "!ping",
                    id: "1002",
                    timestamp: "2018-09-14T22:16:14.055Z"
                },
                {
                    author: {
                        id: "012",
                        name: "my poor little bot",
                        discriminator: "0001",
                        bot: true
                    },
                    raw: "Pong!",
                    content: "Pong!",
                    id: "1003",
                    timestamp: "2018-09-14T22:16:14.555Z"
                },
                {
                    author: {
                        id: "789",
                        name: "spambot #1",
                        discriminator: "2424",
                        bot: false
                    },
                    raw: "!ping",
                    content: "!ping",
                    id: "1004",
                    timestamp: "2018-09-14T22:16:16.055Z"
                },
                {
                    author: {
                        id: "012",
                        name: "my poor little bot",
                        discriminator: "0001",
                        bot: true
                    },
                    raw: "Pong!",
                    content: "Pong!",
                    id: "1005",
                    timestamp: "2018-09-14T22:16:16.655Z"
                },
                {
                    author: {
                        id: "789",
                        name: "spambot #1",
                        discriminator: "2424",
                        bot: false
                    },
                    raw: "!ping",
                    content: "!ping",
                    id: "1006",
                    timestamp: "2018-09-14T22:16:19.055Z"
                },
                {
                    author: {
                        id: "012",
                        name: "my poor little bot",
                        discriminator: "0001",
                        bot: true
                    },
                    raw: "Pong!",
                    content: "Pong!",
                    id: "1007",
                    timestamp: "2018-09-14T22:16:19.755Z"
                },
            ]
        }
    }
};

export default class Format extends React.Component {
    render() {
        return (
            <div>
                <Nav current="format"/>
                <LocationBreadcrumb pathname={this.props.location.pathname} transformer={LocationBreadcrumb.title}/>
                <div className="container">
                    <h3>Entities</h3>
                    {entity("user", {
                        bot: "boolean",
                        name: "string",
                        discriminator: "string",
                        id: "string"
                    })}
                    {entity("message", {
                        author: anchor("user"),
                        id: "string",
                        timestamp: "string",
                        content: "string",
                        raw: "string"
                    })}
                    {entity("channel stats", {
                        delays: "object of user id -> array of delays between sequential messages"
                    })}
                    {entity("channel", {
                        name: "string",
                        stats: anchor("channel stats"),
                        messages: anchor("message", "message[]")
                    })}
                    {entity("guild", {
                        name: "string",
                        id: "string",
                        channels: <p>object of channel id -> {anchor("channel")}</p>
                    })}
                    <h3>Example</h3>
                    <pre><code>
                        {JSON.stringify(example, null, 2)}
                    </code></pre>
                </div>
            </div>
        )
    }
}