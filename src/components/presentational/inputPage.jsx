import React from "react";
import RightPage from "./inputpageright.jsx";
import LeftPage from "./inputpageleft.jsx";

const InputPage = props => {
  return (
    <div className="MainPage col-xs-10">
      <LeftPage
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
        addToList={props.addToList}
        retrieveHtmlLinkedin={props.retrieveHtmlLinkedin}
        retrieveHtmlIndeed={props.retrieveHtmlIndeed}
        retrieveHtmlAngelist={props.retrieveHtmlAngelist}
        retrieveHtmlAngelist={props.retrieveHtmlAngelist}
        totalJobsFromSheets={props.totalJobsFromSheets}
        directWebsiteInput={props.directWebsiteInput}
        directLinkInput={props.directLinkInput}
        saveToLocal={props.saveToLocal}
        totalJobs={props.totalJobs}
      />
      <RightPage
        tasks={props.tasks}
        removeFromList={props.removeFromList}
        moveToBack={props.moveToBack}
        clearList={props.clearList}
        websiteInput={props.websiteInput}
        updateTotalJobsFromSheets={props.updateTotalJobsFromSheets}
        saveToLocal={props.saveToLocal}
        loadFromLocal={props.loadFromLocal}
        clearLocal={props.clearLocal}
        spreadSheetId={props.spreadSheetId}
      />
    </div>
  );
};

export default InputPage;
