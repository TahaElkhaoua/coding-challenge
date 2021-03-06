import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


import { URL } from '../../config/config'

import RepoTemplate from './template/RepoTemplate'
import './DataList.css'

import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BiError } from "react-icons/bi"



class DataList extends Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()   // Create a ref object 
    }

    state = {
        page: (this.props.match.params.page) ? this.props.match.params.page : 0, //page number,
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
        this.loadRepos((this.state.page) ? this.state.page : 0)
    }

    UNSAFE_componentWillReceiveProps(props){ // handle page update
        this.myRef.current.scrollTo(0, 0);
        this.repos = [] 
        this.setState({
                page: (props.match.params.page) ? props.match.params.page : 0, //page number,
                displayedRepos: [], // An Array to hold all the displayed repos
                error: false, //Error Detector
                errorMsg: ``,
                showNext: false,
                currentSlice: 0
            })
            this.loadRepos((props.match.params.page) ? props.match.params.page : 0) //because set state is an asyncronous functions
    }

    loadRepos(page){
        //check if repos is already Fetched
        if(this.repos.length !== 0){
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
        axios.get(`${URL}&page=${page}`)
        .then(result => { //Data Retrieved Successfuly
            this.repos = result.data.items
            this.setState({
                displayedRepos: [...this.repos.slice(0, 5)],
                currentSlice: 5
            })
        }).catch(err=>{
            this.setState({
                error: true,
                errorMsg: err.message
            })
        })
    } 
    //render the repositories into a list
    renderRepos(){
         //check if there s an error if not display data through template
        return ((this.state.error) ? (<div className="error-danger">
            {this.state.errorMsg} <BiError /> 
                <div>
                    <Link  to="/"><button className="home-page">Load home page?</button></Link>
                </div>
            </div>)
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
                        timestamp={repo.created_at}
                    /> // A repo template to keep code seperated and cleaner
                )
            }))
    }

    handleScroll(event){
         //Detect when user hits list bottom and load more elements into UI
        const target = event.target
        if(((target.scrollHeight - target.scrollTop ) <= (target.clientHeight + 200)) && this.repos.length !== 0 && !this.state.showNext){
            this.loadRepos()
        }
    }

    render(){
        return (
            <div className={`content`} onScroll={(e) => this.handleScroll(e)} ref={this.myRef}>
                <div className={`data-list data-list-${(this.repos.length === 0 && !this.state.error) ? 'loading' : 'loaded'}`}> {/* different classes for when components are loading */}
                    <div className="loader">
        <AiOutlineLoading3Quarters className="loader-rotate"></AiOutlineLoading3Quarters>    
                    </div> {/* Loader box */}
                    <div className="data-list-content">
                            {(this.state.error) ? null : (
                                <div>
                                    <h1 className="title">Have a wonderful experience 👽</h1>
                                    <p className="paragraph">the most starred Github repos that were created in the last 30 days :</p>
                                </div>
                            )}
                            {this.renderRepos()}
                    </div>
                    {(this.state.showNext) ? (
                            <Link  to={`/${(parseInt(this.state.page)+1)}`}><button className="next-page">Load next page?</button></Link>
                        ) : null}
                </div>
            </div>
        )
    }
}

export default DataList