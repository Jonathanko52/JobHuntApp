import React from "react";
import RightPage from "./inputpageright.jsx";
import LeftPage from "./inputpageleft.jsx";

const InputPage = (props) => {
  console.log("INPUT PAGE PROPS", props);
  return (
    <div className="MainPage col-xs-10">
      <LeftPage
        saveToGoogleSheets={props.saveToGoogleSheets}
        loadFromGoogleSheets={props.loadFromGoogleSheets}
        clearGoogleLocal={props.clearGoogleLocal}
        directWebRef={props.directWebRef}
        directLinkRef={props.directLinkRef}
        webRef={props.webRef}
        compRef={props.compRef}
        titleRef={props.titleRef}
        locRef={props.locRef}
        linkRef={props.linkRef}
        handleChangeWebsite={props.handleChangeWebsite}
        handleChangeCompany={props.handleChange}
        handleChangeTitle={props.handleChangeTitle}
        handleChangeRecruiter={props.handleChangeRecruiter}
        handleChangeLocation={props.handleChangeLocation}
        handleChangeCompany={props.handleChangeCompany}
        handleChangeCover={props.handleChangeCover}
        handleChangeLink={props.handleChangeLink}
        handleChangeDirectWebsite={props.handleChangeDirectWebsite}
        handleChangeDirectLink={props.handleChangeDirectLink}
        additionalInput1={props.additionalInput1}
        additionalInput2={props.additionalInput2}
        additionalInput3={props.additionalInput3}
        additionalInput4={props.additionalInput4}
        additionalInput5={props.additionalInput5}
        addToList={props.addToList}
        retrieveHtmlLinkedin={props.retrieveHtmlLinkedin}
        retrieveHtmlIndeed={props.retrieveHtmlIndeed}
        retrieveHtmlAngelist={props.retrieveHtmlAngelist}
        retrieveHtmlAngelist={props.retrieveHtmlAngelist}
        totalJobsFromSheets={props.totalJobsFromSheets}
        directWebsiteInput={props.directWebsiteInput}
        directLinkInput={props.directLinkInput}
        saveTaskToLocalStorage={props.saveTaskToLocalStorage}
        totalJobs={props.totalJobs}
      />
      <RightPage
        saveTaskToLocalStorage={props.saveTaskToLocalStorage}
        loadTaskFromLocalStorage={props.loadTaskFromLocalStorage}
        tasks={props.tasks}
        removeFromList={props.removeFromList}
        moveToBack={props.moveToBack}
        clearList={props.clearList}
        websiteInput={props.websiteInput}
        updateTotalJobsFromSheets={props.updateTotalJobsFromSheets}
        saveTaskToLocalStorage={props.saveTaskToLocalStorage}
        loadTaskFromLocalStorage={props.loadTaskFromLocalStorage}
        clearTaskFromLocalStorage={props.clearTaskFromLocalStorage}
        spreadSheetId={props.spreadSheetId}
        saveTasklistToGoogleUnapplied={props.saveTasklistToGoogleUnapplied}
        loadTasklistFromGoogleUnapplied={props.loadTasklistFromGoogleUnapplied}
      />
    </div>
  );
};

export default InputPage;
