import React from 'react';
import './RepoTemplate.css'

import { GiRoundStar, GiAnimalSkull } from 'react-icons/gi'

const RepoTemplate = (props) => {
    const {owner, ownerImg, name, description, stars, hasIssues, openIssues} = props //destructoring props data
    return (
        <div className="repository">
            <div className="image" style={{
                backgroundImage: `radial-gradient(rgba(215,131,65,.5),  rgba(42,46,61,.8)), url(${ownerImg})`
            }}></div>
            <div className="rep-content">
                <h3 className="name">{name}</h3>
                <p className="description">{description}</p>
                <div className="info">
                    <div className="stars" title="Stars"><GiRoundStar /><GiRoundStar /><GiRoundStar />: {stars}</div>
                    <div className="issues" title="Issues"><GiAnimalSkull />: {(hasIssues) ? openIssues: 0}</div>
                    <div className="date">Submitted 30days ago by {name}</div>
                </div>
            </div>
        </div>
    );
};

export default RepoTemplate;