import React from 'react'
import PropTypes from 'prop-types'
import Message from "./message";
import { Button, Modal } from 'react-materialize'
import {getSettings} from "../helpers/data";

export default class Channel extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)).isRequired,
        stats: PropTypes.shape({
            delays: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired
        }).isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string,
        guildId: PropTypes.string,
        guildName: PropTypes.string
    };

    state = {
        includedMessages: []
    };

    generateReportText() {
        return `
            Guild ID: ${this.props.guildId}
            Guild Name: ${this.props.guildName}
            
            Channel ID: ${this.props.id}
            Channel Name: ${this.props.name}
            
            Message IDs:
            ${this.state.includedMessages.sort().join("\n")}`
            .split(/\n/g).map(s=>s.trim()).slice(1).join("\n")
    }

    render() {
        const {messages, stats: {delays}} = this.props;
        const suspiciousMessageIds = [];
        const {periodic: settings} = getSettings();
        for(const k of Object.getOwnPropertyNames(delays)) {
            let repeated = 0;
            let i = 0;
            for(const delay of delays[k]) {
                if(delay > settings.maxDelay) {
                    repeated = 0;
                    i++;
                    continue;
                }
                repeated++;
                if(repeated === settings.minRepeated) {
                    for(let j = i; j >= 0; j--) {
                        suspiciousMessageIds.push(
                            messages.filter(m=>m.author.id === k)[j].id
                        )
                    }
                } else if(repeated > settings.minRepeated) {
                    suspiciousMessageIds.push(
                        messages.filter(m=>m.author.id === k)[i].id
                    )
                }
                i++;
            }
        }

        return (
            <div>
                {messages.map(m=>
                    <Message {...m}
                             key={m.id}
                             suspicious={!m.author.bot && suspiciousMessageIds.includes(m.id)}
                             include={(id, include) => {
                                 this.setState({
                                     includedMessages:
                                        include ? [...this.state.includedMessages.filter(i => i !== id), id] :
                                            this.state.includedMessages.filter(i => i !== id)
                                 });
                             }}
                    />
                )}
                <Button floating fab='vertical' icon='send' className='red' fabClickOnly large style={{bottom: '45px', right: '24px'}}>
                    <Modal trigger={<Button floating icon='notes' className='green'/>}>
                        <pre>
                            {this.generateReportText()}
                        </pre>
                    </Modal>
                    <Button floating icon='attach_file' className='blue' onClick={()=>{
                        const tag = document.createElement("a");
                        const file = new Blob([this.generateReportText()], {type: "text/plain"});
                        tag.href = URL.createObjectURL(file);
                        tag.download = "report.txt";
                        tag.click();
                    }}/>
                </Button>
            </div>
        )
        //<Button floating icon='email' className='yellow darken-1'/>
    }
}