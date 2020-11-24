import React, { Component } from 'react'
import axios from 'axios'

import { URL } from '../../config/config'

import RepoTemplate from './template/RepoTemplate'
import './DataList.css'


class DataList extends Component {
    state = {
        page: (this.props.match.params.page) ? this.props.match.params.page : 0, //page number
        displayedRepos: [], // An Array to hold all the displayed repos
        error: false, //Error Detector
        errorMsg: ``,
        showNext: false
    }
    repos = [] 

    //Getting the JSON Data through axios
    UNSAFE_componentWillMount(){
        //Data will be fetched here before the component renders
        this.loadRepos()
    }

    loadRepos(){
        //the actual data fetch code
        axios.get(`${URL}/page`)
        .then(result => { //Data Retrieved Successfuly
            this.repos = result.data.items
            this.setState({
                displayedRepos: [...this.repos.slice(0, 10)]
            })
        })
        .catch(err=>this.setState({
            error: true,
            errorMsg: err.message
        }))

        this.renderRepos(this.state.displayedRepos)
    } 
    //render the repositories into a list
    renderRepos(reposData){
    return ((this.state.error) ?  //check if there s an error if not display data through template
    (<div className="error-danger">{this.state.errorMsg}</div>)
     : this.state.displayedRepos.map((repo, i) => {
        return (
            <RepoTemplate key={i}
                owner={repo.owner.login}
                ownerImg={repo.owner.avatar_url}
                name={repo.name}
                description={repo.description}
                stars={repo.stargazers_count}
                hasIssues={repo.has_issues}
                openIssues={repo.open_issues}
            /> // A repo template to keep code seperated and cleaner
        )
        }))
    }
    render(){
        return (
            <div className={`content`}>
                <div className={`data-list data-list-${(this.repos.length === 0) ? 'loaded' : 'loading'}`}> {/* different classes for when components are loading */}
                    <div className="loader"></div> {/* Loader box */}
                    <div className="data-list-content">
                        {this.renderRepos()}
                        {(this.state.showNext) ? (
                            <button>Next Page</button>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default DataList