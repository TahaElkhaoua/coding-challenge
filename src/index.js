import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import {Layout} from './hoc/Layout/Layout'

ReactDOM.render(Layout(<App />), document.querySelector('#root'))