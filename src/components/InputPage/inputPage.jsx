import React from "react";
import RightPage from "./inputpageright.jsx";
import LeftPage from "./inputpageleft.jsx";

const InputPage = (props) => {
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
        recruiterRef={props.recruiterRef}
        handleChangeWebsite={props.handleChangeWebsite}
        handleChangeCompany={props.handleChangeCompany}
        handleChangeTitle={props.handleChangeTitle}
        handleChangeRecruiter={props.handleChangeRecruiter}
        handleChangeLocation={props.handleChangeLocation}
        handleChangeCover={props.handleChangeCover}
        handleChangeLink={props.handleChangeLink}
        handleChangeDirectWebsite={props.handleChangeDirectWebsite}
        handleChangeDirectLink={props.handleChangeDirectLink}
        priorityInput={props.priorityInput}
        additionalInput2={props.additionalInput2}
        additionalInput3={props.additionalInput3}
        additionalInput4={props.additionalInput4}
        additionalInput5={props.additionalInput5}
        addToList={props.addToList}
        retrieveHtmlLinkedin={props.retrieveHtmlLinkedin}
        retrieveHtmlIndeed={props.retrieveHtmlIndeed}
        retrieveHtmlAngelist={props.retrieveHtmlAngelist}
        retrieveHtmlSimplify={props.retrieveHtmlSimplify}
        totalJobsFromSheets={props.totalJobsFromSheets}
        directWebsiteInput={props.directWebsiteInput}
        directLinkInput={props.directLinkInput}
        saveTaskToLocalStorage={props.saveTaskToLocalStorage}
        totalJobs={props.totalJobs}
      />
      <RightPage
        saveTaskToLocalStorage={props.saveTaskToLocalStorage}
        loadTaskFromLocalStorage={props.loadTaskFromLocalStorage}
        handlePriorityInput={props.handlePriorityInput}
        tasks={props.tasks}
        removeFromList={props.removeFromList}
        moveToBack={props.moveToBack}
        moveUpInList={props.moveUpInList}
        moveDownInList={props.moveDownInList}
        clearList={props.clearList}
        websiteInput={props.websiteInput}
        updateTotalJobsFromSheets={props.updateTotalJobsFromSheets}
        clearTaskFromLocalStorage={props.clearTaskFromLocalStorage}
        spreadSheetId={props.spreadSheetId}
        saveTasklistToGoogleUnapplied={props.saveTasklistToGoogleUnapplied}
        loadTasklistFromGoogleUnapplied={props.loadTasklistFromGoogleUnapplied}
        clearTasklistFromGoogleUnapplied={
          props.clearTasklistFromGoogleUnapplied
        }
      />
    </div>
  );
};

export default InputPage;
