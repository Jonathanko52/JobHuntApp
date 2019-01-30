import React from 'react';

const RightPage = (props) => {
    let Array = []
    props.tasks.forEach((cur,ind)=>{
        Array.push(
        <li key = {ind}>
            <b>Source Website:</b> {cur.websiteInput}
            <br></br>
            <b>Company Name:</b> {cur.companyInput}
            <br></br>
            <b>Job Title:</b> {cur.titleInput}
            <br></br>
            <b>Recruiter Input:</b> {cur.recruiterInput}
            <br></br>
            <b>Location Input:</b> {cur.locationInput}
            <br></br>
            <b>Cover Letter:</b> {cur.coverInput}
            <br></br>
            <b>Link:</b> {cur.linkInput}
            <br></br>
            <button 
                class ='btn btn-primary'
                onClick = {()=>{
                    props.removeFromList(ind)
                }}>
                Done
            </button>
        </li>)
    })

    return(<div class='rightBar col-md-6'>
        <h3>List of Jobs</h3>
        <ol class='TaskTable'>
            {Array}
        </ol>

    </div>)
};

export default RightPage