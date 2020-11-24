import React, { Component } from 'react'
import axios from 'axios'

import { URL } from '../../config/config'

import './DataList.css'


class DataList extends Component {
    state = {
        page: (this.props.match.params.page) ? this.props.match.params.page : 1,
        repos: [],
        error: false, //Error Detector
        errorMsg: ``
    }
    displayedRepos = [] // An Array to hold all the displayed repos

    //Getting the JSON Data through axios
    UNSAFE_componentWillMount(){
        //Data will be fetched here before the component renders
        this.loadRepos()
    }

    loadRepos(){
        //the actual data fetch code
        axios.get(`${URL}`)
        .then(result => this.setState({
            repos: result.data.items
        }))
        .catch(err=>this.setState({
            error: true,
            errorMsg: err.message
        }))

        this.renderRepos()
    } 
    //render the repositories into a list
    renderRepos(reposData){
    return (this.state.error) ? (<div className="error-danger">{this.state.errorMsg}</div>) : (<div>Data Loaded</div>)
    }
    render(){
        return (
            <div className={`content`}>
                <div className={`data-list data-list-${(this.state.repos.length === 0) ? 'loaded' : 'loading'}`}> {/* different classes for when components are loading */}
                    <div className="loader"></div> {/* Loader box */}
                    <div className="data-list-content">
                        {this.renderRepos()}
                    </div>
                </div>
            </div>
        )
    }
}

export default DataList