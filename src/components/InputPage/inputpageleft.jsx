import React from "react";
import ManualSubmitForm from "./manualSubmitForm.jsx";
import AutoSubmitForm from "./autoSubmitForm.jsx";
const LeftPage = (props) => {
  //Input boxes that take in input regarding relevant information to a job application.
  return (
    <div className="leftBar col-xs-6">
      <ManualSubmitForm
        webRef={props.webRef}
        handleChangeWebsite={props.handleChangeWebsite}
        compRef={props.compRef}
        handleChangeCompany={props.handleChangeCompany}
        titleRef={props.titleRef}
        handleChangeTitle={props.handleChangeTitle}
        locRef={props.locRef}
        handleChangeLocation={props.handleChangeLocation}
        linkRef={props.linkRef}
        handleChangeLink={props.handleChangeLink}
        addToList={props.addToList}
        webRef={props.webRef}
        compRef={props.compRef}
        titleRef={props.titleRef}
        locRef={props.locRef}
        linkRef={props.linkRef}></ManualSubmitForm>
      <h3 className="text-center"> OR </h3>
      <AutoSubmitForm
        saveToGoogleSheets={props.saveToGoogleSheets}
        loadFromGoogleSheets={props.loadFromGoogleSheets}
        clearGoogleLocal={props.clearGoogleLocal}
        directWebRef={props.directWebRef}
        handleChangeDirectWebsite={props.handleChangeDirectWebsite}
        directLinkRef={props.directLinkRef}
        directWebsiteInput={props.directWebsiteInput}
        handleChangeDirectLink={props.handleChangeDirectLink}
        retrieveHtmlLinkedin={props.retrieveHtmlLinkedin}
        retrieveHtmlIndeed={props.retrieveHtmlIndeed}
        retrieveHtmlBuiltInLA={props.retrieveHtmlBuiltInLA}
        retrieveHtmlAngelist={props.retrieveHtmlAngelist}></AutoSubmitForm>
    </div>
  );
};

export default LeftPage;
