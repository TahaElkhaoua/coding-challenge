import React from 'react';
import './RepoTemplate.css'

const RepoTemplate = (props) => {
    const {owner, ownerImg, name, description, stars, hasIssues, openIssues} = props //destructoring props data
    return (
        <div className="repository">
                        {owner}
        </div>
    );
};

export default RepoTemplate;