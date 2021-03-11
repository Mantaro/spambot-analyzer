import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavItem } from 'react-materialize'

const routes = [
    {name: "Home", path: "/"},
    {name: "Settings", path: "/settings"},
    {name: "Format", path: "/format"},
];

export default class Nav extends React.Component {
    static propTypes = {
        current: PropTypes.string,
        remove: PropTypes.string,
    };

    render() {
        const shouldKeep = ({name}) => {
            if(!this.props.remove) return true;
            if(typeof this.props.remove === "string") {
                return this.props.remove.toLowerCase() !== name.toLowerCase();
            }
            return this.props.remove.filter(n=>n.toLowerCase() === name.toLowerCase()).length === 0;
        };

        return (
            <Navbar brand="Spambot Analyzer" right>
                {routes.filter(shouldKeep).map(route =>
                    <NavItem href={route.path}
                             key={`navbar-item-${route.path}`}
                             className={(this.props.current || "").toLowerCase() === route.name.toLowerCase() ? "active" : ""}>
                        {route.name}
                    </NavItem>
                )}
            </Navbar>
        )
    }
}