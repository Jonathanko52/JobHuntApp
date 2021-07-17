import React from "react";

const autoSubmitForm = (props) => {
  return (
    <div>
      <p className="text-center mt-4">
        Copy and paste the url of the job page (Currently supports LinkedIn).
      </p>
      <div className="LeftSubBar">
        <h4>Website</h4>
        <select
          ref={props.directWebRef}
          className="WebsiteInput TaskInput"
          onChange={(e) => {
            props.handleChangeDirectWebsite(e);
          }}>
          <option value="Indeed">Indeed</option>
          <option defaultValue="selected" value="LinkedIn">
            LinkedIn
          </option>
          <option value="BuiltInLA">BuiltInLA</option>
          <option value="Angelist">Angelist</option>
        </select>

        <h4>Link</h4>
        <input
          ref={props.directLinkRef}
          className="CompanyInput TaskInput"
          onChange={(e) => {
            props.handleChangeDirectLink(e);
          }}
        />

        <button
          className="btn btn-primary"
          onClick={() => {
            props.directLinkRef.current.value = "";
            if (props.directWebsiteInput === "LinkedIn") {
              props.retrieveHtmlLinkedin();
            } else if (props.directWebsiteInput === "Indeed") {
              props.retrieveHtmlIndeed();
            } else if (props.directWebsiteInput === "BuiltInLA") {
              props.retrieveHtmlBuiltInLA();
            } else if (props.directWebsiteInput === "Angelist") {
              props.retrieveHtmlAngelist();
            }
          }}>
          Add
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            console.log("THIS BUTTON HAS BEEN CLICKED");
            props.saveToGoogleSheets();
            // props.clearGoogleLocal();
            // props.loadFromGoogleSheets();
          }}>
          TEST
        </button>
      </div>
    </div>
  );
};

export default autoSubmitForm;

function billFor(month, activeSubscription, users) {
  if (!users) {
    return 0;
  }
  if (!activeSubscription) {
    return 0;
  }
  let billingDate = new Date(month);
  let daysThatMonth =
    firstDayOfMonth(billingDate).getDate() +
    lastDayOfMonth(billingDate).getDate() -
    1;
  let monthlyPriceInDollars = activeSubscription.monthlyPriceInDollars;
  let rateThatMonth = parseFloat(monthlyPriceInDollars / daysThatMonth);
  console.log(rateThatMonth);
  let totalDaysSubscribedByUsers = 0;

  //forEach ot calculate how nmany days a given user has been using this service this month
  users.forEach((currentUser) => {
    let startDate = currentUser.activatedOn;
    let deactivationDate;
    if (currentUser.deactivatedOn) {
      deactivationDate = currentUser.deactivatedOn.getDate();
    } else {
      deactivationDate = lastDayOfMonth(billingDate).getDate();
    }

    if (startDate.getTime() < billingDate.getTime()) {
      startDate = firstDayOfMonth(billingDate).getDate();
    } else {
      startDate = firstDayOfMonth(billingDate).getDate();
    }

    totalDaysSubscribedByUsers =
      totalDaysSubscribedByUsers + (startDate + deactivationDate - 1);
  });

  let totalCost = totalDaysSubscribedByUsers * rateThatMonth;

  return totalCost;
}

/*******************
 * Helper functions *
 *******************/

/**
  Takes a Date instance and returns a Date which is the first day
  of that month. For example:

  firstDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 1)

  Input type: Date
  Output type: Date
**/
function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
  Takes a Date object and returns a Date which is the last day
  of that month. For example:

  lastDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 28)

  Input type: Date
  Output type: Date
**/
function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
  Takes a Date object and returns a Date which is the next day.
  For example:

  nextDay(new Date(2019, 2, 7))  // => new Date(2019, 2, 8)
  nextDay(new Date(2019, 2, 28)) // => new Date(2019, 3, 1)

  Input type: Date
  Output type: Date
**/
function nextDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}
