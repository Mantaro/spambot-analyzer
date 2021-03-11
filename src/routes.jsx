import React from 'react'
import { Route, Switch } from 'react-router';
import Home from "./pages/home";
import ChannelView from "./pages/channel-view";
import Settings from "./pages/settings";
import Format from "./pages/format";

export default (
    <Switch>
        <Route exact strict path="/settings" component={Settings}/>
        <Route exact strict path="/format" component={Format}/>
        <Route exact strict path="/:id" component={ChannelView}/>
        <Route component={Home}/>
    </Switch>
)