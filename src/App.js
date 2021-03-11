import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import routes from './routes';
import { GlobalHistory } from './helpers/history'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <GlobalHistory/>
                        {routes}
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
