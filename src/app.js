import React, { Component } from 'react'
import {Routes} from './routes'

import { BrowserRouter } from 'react-router-dom'

import './app.css'

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