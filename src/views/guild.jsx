import React from 'react'
import PropTypes from 'prop-types'
import { Button, Collection, CollectionItem } from 'react-materialize'
import Channel from "./channel";
import { getHistory } from '../helpers/history'

export default class Guild extends React.Component {
    static propTypes = {
        channels: PropTypes.objectOf(PropTypes.shape(Channel.propTypes)).isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    };

    render() {
        return (
            <div>
                <p className="flow-text" style={{wordWrap: "break-word"}}>{this.props.name} ({this.props.id})</p>
                <Collection header="Text Channels">
                    {Object.getOwnPropertyNames(this.props.channels).map(p=>
                        <CollectionItem key={p}>
                            <Button onClick={()=>getHistory().push(`/${p}`)}>{this.props.channels[p].name}</Button>
                        </CollectionItem>
                    )}
                </Collection>
            </div>
        )
    }
}