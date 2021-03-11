import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Row } from 'react-materialize'

export default class Message extends React.PureComponent {
    static propTypes = {
        author: PropTypes.shape({
            bot: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            discriminator: PropTypes.string.isRequired
        }).isRequired,
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        raw: PropTypes.string.isRequired,
        suspicious: PropTypes.bool,
        include: PropTypes.func
    };

    render() {
        return (
            <div>
                <Row>
                    <Input
                        type="checkbox"
                        className='filled-in'
                        label="include?"
                        disabled={this.props.author.bot}
                        onChange={(_, value) => this.props.include(this.props.id, value)}
                    />
                    {this.props.suspicious && <Icon style={{verticalAlign: "middle", display: "inline", color: "red"}}>error_outline</Icon>}
                    <p><b>{this.props.author.name}#{this.props.author.discriminator}</b>{this.props.author.bot ? " (Bot)" : ""}: </p>
                    <p className="flow-text" style={{wordWrap: "break-word"}}>{this.props.content}</p>
                </Row>
            </div>
        )
    }
}