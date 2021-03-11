import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, MenuItem } from 'react-materialize'

const defaultTransformer = ({urlParts, part, index}) => {
    return {
        href: "/" + urlParts.slice(0, index + 1).join("/"),
        name: part
    };
};

export default class LocationBreadcrumb extends React.Component {
    static title = ({part}) => ({
        name: part.split(/ /g).map(s=>s[0].toUpperCase() + s.slice(1)).join(" ")
    });

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        transformer: PropTypes.func
    };

    render() {
        const url = this.props.pathname;
        const urlParts = url.split(/\//g).filter(x=>x !== "");
        const transformer = this.props.transformer || defaultTransformer;
        const elements = urlParts.map((part, i)=>{
            const transformerArgs = {urlParts, part, index: i, defaultTransformer};
            const transformed = transformer(transformerArgs);
            const defaults = transformer === defaultTransformer ? null : defaultTransformer(transformerArgs);
            if(transformed.hide) return null;
            return (
                <MenuItem href={transformed.href || defaults.href} key={`url-slice-${i}`}>
                    {transformed.name || defaults.name}
                </MenuItem>
            )
        }).filter(x=>x != null);
        return (
            elements.length > 0 && <Breadcrumb>
                <MenuItem href="/">{this.props.homeName || "Home"}</MenuItem>
                {elements}
            </Breadcrumb>
        )
    }
}