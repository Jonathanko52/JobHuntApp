//CODE FROM INTERVIEW

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
