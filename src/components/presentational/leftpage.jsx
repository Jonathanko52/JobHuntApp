import React from 'react';

const LeftPage = (props) => {
    let total = 'N/A'
    if(props.totalJobsFromSheets > 0){
        total = props.totalJobsFromSheets + 150
    }    
    //Input boxes that take in input regarding relevant information to a job application.
    return<div className='leftBar col-md-6'>
            <h3>Total Jobs at this point: {total}</h3>
            <h4>Website</h4>
            <select 
                className='WebsiteInput TaskInput'
                onChange={(e)=>{
                props.handleChangeWebsite(e)
            }}>
                <option value="Indeed">Indeed</option>
                <option selected='selected' value="LinkedIn">LinkedIn</option>
            </select>
            <h4>Company</h4>
            <input 
            className='CompanyInput TaskInput'
            onChange={(e)=>{
                props.handleChangeCompany(e)
            }
            }></input>
            <h4>Title</h4>
            <input 
            className='TitleInput TaskInput'
            onChange={(e)=>{
                props.handleChangeTitle(e)
            }
            }></input>
            <h4>Location</h4>
            <input 
            className='LocationInput TaskInput'
            onChange={(e)=>{
                props.handleChangeLocation(e)
            }
            }></input>
            <h4>Link</h4>
            <input 
            className='LinkInput TaskInput'
            onChange={(e)=>{
                props.handleChangeLink(e)
            }
            }></input>
            <button 
            className='btn btn-primary'
            onClick={()=>{
                props.addToList()
                document.getElementsByClassName('WebsiteInput')[0].value=''
                document.getElementsByClassName('CompanyInput')[0].value=''
                document.getElementsByClassName('TitleInput')[0].value=''
                document.getElementsByClassName('LocationInput')[0].value=''
                document.getElementsByClassName('LinkInput')[0].value=''
                console.log('CLEARING')
            }}
            
            >Done</button>
    </div>
};

export default LeftPage