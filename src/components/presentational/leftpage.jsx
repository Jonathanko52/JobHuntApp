import React from 'react';

const LeftPage = (props) => (
    <div className='leftBar col-md-6'>
            <h4>Website</h4>
            <input 
            className='WebsiteInput TaskInput'
            onChange={(e)=>{
                console.log('CHANGING')
                props.handleChangeWebsite(e)
            }
            }></input>
            <h4>Company</h4>
            <input 
            className='CompanyInput TaskInput'
            onChange={(e)=>{
                console.log('CHANGING')
                props.handleChangeCompany(e)
            }
            }></input>
            <h4>Title</h4>
            <input 
            className='TitleInput TaskInput'
            onChange={(e)=>{
                console.log('CHANGING')
                props.handleChangeTitle(e)
            }
            }></input>
            <h4>Recruiter</h4>
            <form>
                <input type='radio'
                name = 'RecruiterRadio'
                className='RecruiterInput RadioInput'
                onChange={(e)=>{
                    props.handleChangeRecruiter(e)
                }
                }
                value = 'Yes'
                ></input>Yes            
                <input type='radio'
                name = 'RecruiterRadio'
                className='RecruiterInput RadioInput'
                onChange={(e)=>{
                    props.handleChangeRecruiter(e)
                }
                }
                value = 'No'
                ></input>No
            </form>
            <h4>Location</h4>
            <input 
            className='LocationInput TaskInput'
            onChange={(e)=>{
                console.log('CHANGING')
                props.handleChangeLocation(e)
            }
            }></input>
            <h4>Cover Letter?</h4>
            <form>
                <input type = 'radio'
                name = 'CoverLetter'
                className='CoverInput RadioInput'
                onChange={(e)=>{
                    console.log('CHANGING')
                    props.handleChangeCover(e)
                }}
                value = 'Yes'
                ></input>Yes
                <input type = 'radio'
                name = 'CoverLetter'
                className='CoverInput RadioInput'
                onChange={(e)=>{
                    console.log('CHANGING')
                    props.handleChangeCover(e)
                }}
                value = 'No'
                ></input>No
            </form>
            <h4>Link</h4>
            <input 
            className='LinkInput TaskInput'
            onChange={(e)=>{
                console.log('CHANGING')
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
            }}
            
            >Done</button>
    </div>
);

export default LeftPage