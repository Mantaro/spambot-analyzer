import React from 'react'
import Nav from "../helpers/nav";
import LocationBreadcrumb from "../helpers/location-breadcrumb";
import Channel from "../views/channel";
import {getData} from "../helpers/data";
import {Redirect} from 'react-router-dom';

export default class ChannelView extends React.Component {
    render() {
        const id = this.props.location.pathname.split(/\//g).filter(f=>f !== "")[0];
        const stored = getData();
        const channel = ((stored || {}).channels || {})[id];

        return (
            <div>
                <Nav/>
                <LocationBreadcrumb pathname={this.props.location.pathname} transformer={()=>({
                    name: (channel || {}).name
                })}/>
                {channel == null ?
                    <Redirect to="/"/> :
                    <div className="container">
                        <Channel {...channel} id={id} guildId={stored.id} guildName={stored.name}/>
                    </div>
                }
            </div>
        )
    }
}