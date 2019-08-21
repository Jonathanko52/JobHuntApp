import React from "react";
import RightPage from "../presentational/rightpage.jsx";
import LeftPage from "../presentational/leftpage.jsx";
import axios from "axios";

class MainPage extends React.Component {
  constructor(props) {
    super();
    this.webRef = React.createRef();
    this.compRef = React.createRef();
    this.titleRef = React.createRef();
    this.locRef = React.createRef();
    this.linkRef = React.createRef();

    this.state = {
      tasks: [],
      websiteInput: "LinkedIn",
      companyInput: "",
      titleInput: "",
      locationInput: "",
      linkInput: "",
      totalJobsFromSheets: 0
    };
    //Event Listener Function Bindings
    this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
    this.handleChangeCompany = this.handleChangeCompany.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.updateTotalJobsFromSheets = this.updateTotalJobsFromSheets.bind(this);

    //Add/Remove from list
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);

    //Save/load List to LocalStorage
    this.saveToLocal = this.saveToLocal.bind(this);
    this.loadFromLocal = this.loadFromLocal.bind(this);

    //Http Request
    this.retrieveHtml = this.retrieveHtml.bind(this);
  }

  //Event Listeners handling event changes on left(input) page
  handleChangeWebsite(event) {
    this.setState({ websiteInput: event.target.value });
  }
  handleChangeCompany(event) {
    this.setState({ companyInput: event.target.value });
  }
  handleChangeTitle(event) {
    this.setState({ titleInput: event.target.value });
  }
  handleChangeLocation(event) {
    this.setState({ locationInput: event.target.value });
  }
  handleChangeLink(event) {
    this.setState({ linkInput: event.target.value });
  }
  updateTotalJobsFromSheets(value) {
    this.setState({ totalJobsFromSheets: value });
  }
  //Adds item to task list
  addToList() {
    this.saveToLocal();
    this.setState(state => {
      let newTasks = state.tasks.slice();
      let company = state.companyInput.split(" ");
      let locationWordIndex = company.indexOf("Location");
      let location = company.slice(locationWordIndex + 1).join(" ");
      company = company.slice(0, locationWordIndex - 1).join(" ");

      newTasks.push({
        websiteInput: state.websiteInput,
        companyInput: company,
        titleInput: state.titleInput,
        recruiterInput: state.recruiterInput,
        locationInput: location,
        coverInput: state.coverInput,
        linkInput: state.linkInput
      });
      return {
        tasks: newTasks,
        websiteInput: "LinkedIn",
        companyInput: "",
        titleInput: "",
        locationInput: "",
        linkInput: ""
      };
    });
  }

  //removes item from task list
  removeFromList(index) {
    this.saveToLocal();
    this.setState(state => {
      let newTasks = state.tasks.slice();
      newTasks.splice(index, 1);
      return {
        tasks: newTasks,
        input: state.input
      };
    });
  }

  saveToLocal() {
    localStorage.setItem("Tasks", JSON.stringify(this.state.tasks));
  }

  loadFromLocal() {
    this.setState(state => {
      let loadedTasks = JSON.parse(localStorage.getItem("Tasks"));
      let newTasks = state.tasks.slice().concat(loadedTasks);

      return {
        tasks: newTasks,
        websiteInput: "LinkedIn",
        companyInput: "",
        titleInput: "",
        locationInput: "",
        linkInput: ""
      };
    });
  }

  //HTTP Stuff

  retrieveHtml(test) {
    axios
      .get("/RetrieveHtml/" + test)
      .then((res, request) => {
        console.log("retrievehtml 2", this);
        this.setState(state => {
          console.log("setting state in retriete");
          let newTasks = state.tasks.slice();

          newTasks.push({
            websiteInput: state.websiteInput,
            companyInput: res.data[1],
            titleInput: res.data[0],
            recruiterInput: state.recruiterInput,
            locationInput: res.data[3],
            coverInput: state.coverInput,
            linkInput: res.data[2]
          });
          return {
            tasks: newTasks,
            websiteInput: "LinkedIn",
            companyInput: "",
            titleInput: "",
            locationInput: "",
            linkInput: ""
          };
        });
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.loadFromLocal();
  }

  render() {
    return (
      <div className="MainPage col-xs-10">
        <LeftPage
          webRef={this.webRef}
          compRef={this.compRef}
          titleRef={this.titleRef}
          locRef={this.locRef}
          linkRef={this.linkRef}
          handleChangeWebsite={this.handleChangeWebsite}
          handleChangeCompany={this.handleChange}
          handleChangeTitle={this.handleChangeTitle}
          handleChangeRecruiter={this.handleChangeRecruiter}
          handleChangeLocation={this.handleChangeLocation}
          handleChangeCompany={this.handleChangeCompany}
          handleChangeCover={this.handleChangeCover}
          handleChangeLink={this.handleChangeLink}
          addToList={this.addToList}
          totalJobsFromSheets={this.state.totalJobsFromSheets}
          retrieveHtml={this.retrieveHtml}
        />
        <RightPage
          tasks={this.state.tasks}
          removeFromList={this.removeFromList}
          websiteInput={this.state.websiteInput}
          updateTotalJobsFromSheets={this.updateTotalJobsFromSheets}
          saveToLocal={this.saveToLocal}
          loadFromLocal={this.loadFromLocal}
        />
      </div>
    );
  }
}
export default MainPage;

//Client ID: 218195582841-2ijdcs0qti8ot0pjkbti6srelmn1d8fn.apps.googleusercontent.com
//Client Secret:HyZ6TLHlrdRteSv3KhwfonWE
//API KEY: AIzaSyDtozpl2iAtr2mB9OViJKsi0PNTIWg2Uq4
