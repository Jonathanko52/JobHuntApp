import React from 'react';
import RightPage from './../presentational/rightpage.jsx'
import LeftPage from './../presentational/leftpage.jsx'


class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tasks: [],
        websiteInput: '',
        companyInput: '',
        titleInput: '',
        locationInput: '',
        linkInput:'',
      }
      //Event Listener Function Bindings
      this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
      this.handleChangeCompany = this.handleChangeCompany.bind(this)
      this.handleChangeTitle = this.handleChangeTitle.bind(this)
      this.handleChangeLocation = this.handleChangeLocation.bind(this)
      this.handleChangeLink = this.handleChangeLink.bind(this)

      //Add/Remove from list functions
      this.addToList = this.addToList.bind(this)
      this.removeFromList = this.removeFromList.bind(this)
    }

    //Event Listeners handling event changes on left(input) page
    handleChangeWebsite(event){
        this.setState({websiteInput:event.target.value})
    }
    handleChangeWebsite2(event){
        this.setState({websiteInput:event.target.value})
    }
    handleChangeCompany(event){
        this.setState({companyInput:event.target.value})
    }
    handleChangeTitle(event){
        this.setState({titleInput:event.target.value})
    }
    handleChangeLocation(event){
        this.setState({locationInput:event.target.value})
    }
    handleChangeLink(event){
        this.setState({linkInput:event.target.value})
    }

    //Adds item to task list
    addToList(){
        this.setState((state)=>{
            let newTasks = state.tasks.slice()
            newTasks.push({
                websiteInput:state.websiteInput,
                companyInput:state.companyInput,
                titleInput:state.titleInput,
                recruiterInput:state.recruiterInput,
                locationInput:state.locationInput,
                coverInput:state.coverInput,
                linkInput:state.linkInput,
            })

            return{
                tasks:newTasks,
                websiteInput: '',
                companyInput: '',
                titleInput: '',
                locationInput: '',
                linkInput:'',
            }
        })
    }

    //removes item from task list
    removeFromList(index){
        this.setState((state)=>{
            let newTasks = state.tasks.slice()
            newTasks.splice(index,1)
            return{
                tasks:newTasks,
                input:state.input
            }
        })
    }
    


    render(){
        return(
            <div className='MainPage col-md-10'>
                <LeftPage 
                    handleChangeWebsite = {this.handleChangeWebsite}
                    handleChangeWebsite2 = {this.handleChangeWebsite2}
                    handleChangeCompany = {this.handleChange}
                    handleChangeTitle = {this.handleChangeTitle}
                    handleChangeRecruiter = {this.handleChangeRecruiter}
                    handleChangeLocation = {this.handleChangeLocation}
                    handleChangeCompany = {this.handleChangeCompany}
                    handleChangeCover = {this.handleChangeCover}
                    handleChangeLink = {this.handleChangeLink}
                    addToList = {this.addToList}
                />
                <RightPage 
                    tasks = {this.state.tasks}
                    removeFromList = {this.removeFromList}
                    websiteInput = {this.state.websiteInput}
                />
            </div>
        )
    }
    
}
export default MainPage

//Client ID: 218195582841-2ijdcs0qti8ot0pjkbti6srelmn1d8fn.apps.googleusercontent.com
//Client Secret:HyZ6TLHlrdRteSv3KhwfonWE
//API KEY: AIzaSyDtozpl2iAtr2mB9OViJKsi0PNTIWg2Uq4