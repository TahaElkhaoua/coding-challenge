import React, { Component } from 'react'
import {Routes} from './routes'
import {Layout} from './hoc/Layout/Layout'

import { BrowserRouter } from 'react-router-dom'


class App extends Component {
    render (){
        return(
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        )
    }
}

export default App