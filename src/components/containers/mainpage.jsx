import React from "react";
import RightPage from "../presentational/rightpage.jsx";
import LeftPage from "../presentational/leftpage.jsx";
import axios from "axios";

class MainPage extends React.Component {
  constructor(props) {
    super();
    this.directWebRef = React.createRef();
    this.directLinkRef = React.createRef();
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
      totalJobsFromSheets: 0,
      directWebsiteInput: "LinkedIn",
      directLinkInput: "",
      companyLinkInput: ""
    };
    //Event Listener Function Bindings
    this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
    this.handleChangeCompany = this.handleChangeCompany.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.updateTotalJobsFromSheets = this.updateTotalJobsFromSheets.bind(this);
    this.handleChangeDirectWebsite = this.handleChangeDirectWebsite.bind(this);
    this.handleChangeDirectLink = this.handleChangeDirectLink.bind(this);

    //Add/Remove from list
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);

    //Save/load List to LocalStorage
    this.saveToLocal = this.saveToLocal.bind(this);
    this.loadFromLocal = this.loadFromLocal.bind(this);
    this.clearLocal = this.clearLocal.bind(this);

    //Http Request
    this.retrieveHtmlLinkedin = this.retrieveHtmlLinkedin.bind(this);
    this.retrieveHtmlIndeed = this.retrieveHtmlIndeed.bind(this);
    this.retrieveHtmlAngelist = this.retrieveHtmlAngelist.bind(this);
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
  handleChangeDirectWebsite(event) {
    this.setState({ directWebsiteInput: event.target.value });
  }
  handleChangeDirectLink(event) {
    this.setState({ directLinkInput: event.target.value });
  }
  //Adds item to task list
  addToList() {
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
    this.saveToLocal();
  }

  //removes item from task list
  removeFromList(index) {
    this.setState(state => {
      let newTasks = state.tasks.slice();
      newTasks.splice(index, 1);
      return {
        tasks: newTasks,
        input: state.input
      };
    });
    this.saveToLocal();
  }

  saveToLocal() {
    setTimeout(() => {
      localStorage.setItem("Tasks", JSON.stringify(this.state.tasks));
    }, 500);
  }

  loadFromLocal() {
    let loadedTasks = JSON.parse(localStorage.getItem("Tasks"));

    if (Array.isArray(loadedTasks)) {
      this.setState(state => {
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
  }

  clearLocal() {
    localStorage.removeItem("Tasks");
  }

  retrieveHtmlLinkedin() {
    let url = this.state.directLinkInput.split("/");
    url = url[url.length - 2];
    axios
      .get("/RetrieveHtmlLinkedIn/" + url)
      .then((res, request) => {
        console.log("retrievehtml 2", this);
        this.setState(state => {
          console.log("setting state in retriete");
          let newTasks = state.tasks.slice();

          newTasks.push({
            websiteInput: state.directWebsiteInput,
            companyInput: res.data[1],
            titleInput: res.data[0],
            recruiterInput: state.recruiterInput,
            locationInput: res.data[3],
            coverInput: state.coverInput,
            linkInput: state.directLinkInput,
            companyLinkInput: res.data[2]
          });
          return {
            tasks: newTasks,
            websiteInput: "LinkedIn",
            companyInput: "",
            titleInput: "",
            locationInput: "",
            linkInput: "",
            companyLinkInput: ""
          };
        });
      })
      .then(res => {
        this.saveToLocal();
      })
      .catch(error => console.error(error));
    this.saveToLocal();
  }
  retrieveHtmlIndeed() {
    let url = this.state.directLinkInput.split("?");
    url = url[url.length - 1];
    console.log(url);
    axios
      .get("/RetrieveHtmlIndeed/" + url)
      .then((res, request) => {
        this.setState(state => {
          console.log("setting state in retriete");
          let newTasks = state.tasks.slice();
          newTasks.push({
            websiteInput: state.directWebsiteInput,
            companyInput: res.data[1],
            titleInput: res.data[0],
            recruiterInput: state.recruiterInput,
            locationInput: res.data[3],
            coverInput: state.coverInput,
            linkInput: state.directLinkInput,
            companyLinkInput: res.data[2]
          });
          return {
            tasks: newTasks,
            websiteInput: "LinkedIn",
            companyInput: "",
            titleInput: "",
            locationInput: "",
            linkInput: "",
            companyLinkInput: ""
          };
        });
      })
      .then(res => {
        this.saveToLocal();
      })
      .catch(error => console.error(error));
  }
  retrieveHtmlAngelist() {
    let url = this.state.directLinkInput.split("/");
    url = url[url.length - 1];
    axios
      .get("/RetrieveHtmlAngelist/" + url)
      .then((res, request) => {
        this.setState(state => {
          let newTasks = state.tasks.slice();
          newTasks.push({
            websiteInput: state.directWebsiteInput,
            companyInput: res.data[1],
            titleInput: res.data[0],
            recruiterInput: state.recruiterInput,
            locationInput: res.data[3],
            coverInput: state.coverInput,
            linkInput: state.directLinkInput,
            companyLinkInput: res.data[2]
          });
          return {
            tasks: newTasks,
            websiteInput: "LinkedIn",
            companyInput: "",
            titleInput: "",
            locationInput: "",
            linkInput: "",
            companyLinkInput: ""
          };
        });
      })
      .then(res => {
        this.saveToLocal();
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
          directWebRef={this.directWebRef}
          directLinkRef={this.directLinkRef}
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
          handleChangeDirectWebsite={this.handleChangeDirectWebsite}
          handleChangeDirectLink={this.handleChangeDirectLink}
          addToList={this.addToList}
          totalJobsFromSheets={this.state.totalJobsFromSheets}
          retrieveHtmlLinkedin={this.retrieveHtmlLinkedin}
          retrieveHtmlIndeed={this.retrieveHtmlIndeed}
          retrieveHtmlAngelist={this.retrieveHtmlAngelist}
          directWebsiteInput={this.state.directWebsiteInput}
          directLinkInput={this.state.directLinkInput}
          saveToLocal={this.saveToLocal}
        />
        <RightPage
          tasks={this.state.tasks}
          removeFromList={this.removeFromList}
          websiteInput={this.state.websiteInput}
          updateTotalJobsFromSheets={this.updateTotalJobsFromSheets}
          saveToLocal={this.saveToLocal}
          loadFromLocal={this.loadFromLocal}
          clearLocal={this.clearLocal}
        />
      </div>
    );
  }
}
export default MainPage;

//Client ID: 218195582841-2ijdcs0qti8ot0pjkbti6srelmn1d8fn.apps.googleusercontent.com
//Client Secret:HyZ6TLHlrdRteSv3KhwfonWE
//API KEY: AIzaSyDtozpl2iAtr2mB9OViJKsi0PNTIWg2Uq4
