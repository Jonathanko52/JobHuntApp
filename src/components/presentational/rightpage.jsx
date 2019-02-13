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
            <b href>Link:</b> <a href = {cur.linkInput} target="_blank">{cur.linkInput}</a>
            <br></br>
            <button class ='btn btn-primary' onClick={()=>{
                console.log("BUtton for sheet pressed")
                let emptyRow;
                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: '1pLaxif0Ryvzs28ZqKTJRySdDWEdVRRrSreaja4L0FEw',
                    range: 'Sheet2!A1:A1000'
                }).then((response) => {
                    var result = response.result;
                    console.log(result.values.length)
                    emptyRow = result.values.length + 1
                }).then(()=>{
                    gapi.client.sheets.spreadsheets.values.update({
                        spreadsheetId: '1pLaxif0Ryvzs28ZqKTJRySdDWEdVRRrSreaja4L0FEw',
                        range:`Sheet2!A${emptyRow}:J${emptyRow}`,
                        valueInputOption:'RAW',
                        resource:{
                            values: [
                                [
                                    cur.websiteInput, 
                                    cur.companyInput,
                                    cur.titleInput, 
                                    cur.recruiterInput, 
                                    `${new Date().getMonth()+1}/${new Date().getDate()}`,
                                    cur.locationInput,
                                    cur.coverInput,
                                    'no',
                                    '',
                                    cur.linkInput
                                ]
                            ]
                        }
                    }).then((response) => {
                        var result = response.result;
                        console.log(result);
                    }).catch((err)=>{
                        console.log('inner error',err.result.error.message)
                    });

                }).catch((err)=>{
                    console.log('outter error', err.result.error.message)
                });

            }}> Done
            </button>
            <button 
                class ='btn btn-primary'
                onClick = {()=>{
                    props.removeFromList(ind)
                }}>
                Cancel
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