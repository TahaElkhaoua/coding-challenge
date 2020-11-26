//Main app routes & elements

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {Layout} from './hoc/Layout/Layout'
import DataList from './components/DataList/DataList'

export const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/:page?' component={DataList}/>
                {/* <Route path='/' component={DataList}/> */}
            </Switch>
        </Layout>
    )
} 