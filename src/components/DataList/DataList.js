import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        showNext: false,
        currentSlice: 0
    }
    repos = [] //only gets updated once no need to be in state

    //Getting the JSON Data through axios
    UNSAFE_componentWillMount(){
        //Data will be fetched here before the component renders
        this.loadRepos()
    }

    isB

    loadRepos(){
        //check if repos is already Fetched
        console.log(this.state.displayedRepos)
        if(this.repos.length != 0){
            (this.state.displayedRepos.length === this.repos.length) ? //check if all repos are displayed 
            this.setState({showNext: true}) : //if yes display next page button
            this.setState(prevState => {
                return {
                    displayedRepos: [...prevState.displayedRepos, ...this.repos.slice(prevState.currentSlice, prevState.currentSlice + 5)],
                    currentSlice: prevState.currentSlice + 5
                }
            })

            return true; // stop here if data already exists
        }
        //the actual data fetch code
        axios.get(`${URL}/page`)
        .then(result => { //Data Retrieved Successfuly
            this.repos = result.data.items
            this.setState({
                displayedRepos: [...this.repos.slice(0, 5)],
                currentSlice: 5
            })
        })
        .catch(err=>this.setState({
            error: true,
            errorMsg: err.message
        }))
    } 
    //render the repositories into a list
    renderRepos(){
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

    handleScroll(event){
        const target = event.target
        // console.log(target.scrollHeight, target.scrollTop, target.clientHeight)
        if(((target.scrollHeight - target.scrollTop ) <= (target.clientHeight + 200)) && this.repos.length != 0 && !this.state.showNext){
            this.loadRepos()
        }
    }

    render(){
        return (
            <div className={`content`} onScroll={(e) => this.handleScroll(e)}>
                <div className={`data-list data-list-${(this.repos.length === 0) ? 'loading' : 'loaded'}`}> {/* different classes for when components are loading */}
                    <div className="loader"></div> {/* Loader box */}
                    <div className="data-list-content">
                        {this.renderRepos()}
                    </div>
                    {(this.state.showNext) ? (
                            <Link className="next-page" to={`/${this.state.page + 1}`}>Next Page</Link>
                        ) : null}
                </div>
            </div>
        )
    }
}

export default DataList