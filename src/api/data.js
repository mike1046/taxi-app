/* eslint max-len:0 */
/* eslint arrow-body-style:0 */

import inside from "point-in-polygon";
import Moment from "moment";
import { getCountryPhoneCodes, makeCarLists } from "../utils";

export const countryPhoneCodesOptions = getCountryPhoneCodes();

export const petOptions = [
  {
    label: "No Pets",
    value: 0
  },
  {
    label: "Yes Pets",
    value: 1
  },
  {
    label: "Yes Pets Traveling Alone",
    value: 2
  }
];

export const serviceOptions = ["economy", "premium"].map(type => ({
  display: type.toUpperCase(),
  value: type
}));

// all cars
export const carOptions = [
  {
    id: "any",
    display: "ANY CAR",
    image: "../images/select-car-any.png",
    value: {
      type: "any",
      people: 4,
      luggage: 3
    }
  },
  {
    id: "sd",
    display: "SEDAN",
    image: "../images/select-car-economysedan1.png",
    value: {
      type: "sd",
      people: 4,
      luggage: 3
    }
  },
  {
    id: "mv",
    display: "MINIVAN",
    image: "../images/select-car-economyminivan.png",
    value: {
      type: "mv",
      people: 6,
      luggage: 6
    }
  },
  {
    id: "suv",
    display: "SUV",
    image: "../images/select-car-econmysuv.png",
    value: {
      type: "suv",
      people: 6,
      luggage: 4
    }
  },
  {
    id: "hybrid", // we dont use this but the server expects a car at this index
    display: "HYBRID",
    image: "../images/select-car-econmysuv.png",
    value: {
      type: "suv",
      people: 6,
      luggage: 4
    }
  },
  {
    id: "lsuv",
    display: "LARGE SUV",
    image: "../images/select-car-lgsuv1.png",
    value: {
      type: "lsuv",
      people: 7,
      luggage: 7
    }
  },
  {
    id: "limo",
    display: "LIMOUSINE",
    image: "../images/select-car-limo.png",
    value: {
      type: "limo",
      people: 6,
      luggage: 6
    }
  }
];

// list broken down into three references, for use in request pickup
export const carClassedOptions = makeCarLists(
  carOptions.filter(option => option.id !== "hybrid")
);

// obj.MINIVAN = 'mv', etc
export const reverseCarLookup = carOptions.reduce((obj, option) => {
  const newObj = obj;
  newObj[option.display] = option.id;
  return newObj;
}, {});

export const cardOptions = [
  "American Express",
  "Discover",
  "Mastercard",
  "Visa"
].map(string => {
  return {
    label: string,
    value: string
  };
});

export const childOptions = [
  {
    label: "No Child Seat",
    value: {
      infant: 0,
      toddler: 0,
      booster: 0
    }
  },
  {
    label: "1 Booster",
    value: {
      infant: 0,
      toddler: 0,
      booster: 1
    }
  },
  {
    label: "1 Infant",
    value: {
      infant: 1,
      toddler: 0,
      booster: 0
    }
  },
  {
    label: "1 Toddler",
    value: {
      infant: 0,
      toddler: 1,
      booster: 0
    }
  },
  {
    label: "1 Toddler, Booster, and Infant",
    value: {
      infant: 1,
      toddler: 1,
      booster: 1
    }
  },
  {
    label: "1 Toddler 1 Booster",
    value: {
      infant: 0,
      toddler: 1,
      booster: 1
    }
  },
  {
    label: "1 Toddler, 1 Infant",
    value: {
      infant: 1,
      toddler: 1,
      booster: 0
    }
  },
  {
    label: "2 Boosters",
    value: {
      infant: 0,
      toddler: 0,
      booster: 2
    }
  },
  {
    label: "2 Infants",
    value: {
      infant: 2,
      toddler: 0,
      booster: 0
    }
  },
  {
    label: "2 Toddlers",
    value: {
      infant: 0,
      toddler: 2,
      booster: 0
    }
  },
  {
    label: "2 Toddlers, 1 Infant",
    value: {
      infant: 1,
      toddler: 2,
      booster: 0
    }
  },
  {
    label: "2 Toddlers, 1 Booster",
    value: {
      infant: 0,
      toddler: 2,
      booster: 1
    }
  },
  {
    label: "2 Boosters, 1 Toddler",
    value: {
      infant: 0,
      toddler: 1,
      booster: 2
    }
  },
  {
    label: "2 Boosters, 1 Infant",
    value: {
      infant: 1,
      toddler: 0,
      booster: 2
    }
  },
  {
    label: "2 Infants, 1 Toddler",
    value: {
      infant: 2,
      toddler: 1,
      booster: 0
    }
  },
  {
    label: "2 Infants, 1 Booster",
    value: {
      infant: 2,
      toddler: 1,
      booster: 1
    }
  },
  {
    label: "3 Toddlers",
    value: {
      infant: 0,
      toddler: 3,
      booster: 0
    }
  },
  {
    label: "3 Boosters",
    value: {
      infant: 0,
      toddler: 0,
      booster: 3
    }
  },
  {
    label: "3 Infants",
    value: {
      infant: 3,
      toddler: 0,
      booster: 0
    }
  }
];

export const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
].map((month, index) => ({
  label: month,
  value: index + 1
}));

export const yearOptions = (function recursiveArrayMaker(
  startYear,
  yearsLeft,
  accum = []
) {
  if (yearsLeft === -1) return accum;
  return recursiveArrayMaker(
    startYear + 1,
    yearsLeft - 1,
    accum.concat([startYear])
  );
})(Moment().year(), 20).map(year => ({
  label: year.toString(),
  value: year
}));

export const tipOptions = [
  "5%",
  "10%",
  "12%",
  "15%",
  "18%",
  "20%",
  "25%",
  "30%",
  "l",
  "n"
].map(tip => {
  const value = isNaN(parseInt(tip)) ? tip : parseInt(tip);
  let label = tip;
  if (value === "l") label = "Decide Later";
  if (value === "n") label = "No Tip";
  return {
    label,
    value
  };
});

export const cancelableJobStatuses = [
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  false
];

export const jobStatuses = [
  {
    code: 0,
    description: "Driver Unassigned",
    display: true,
    label: "Dispatching..."
  },
  {
    code: 1,
    description: "Driver En-Route",
    display: true,
    label: "Driver En-Route"
  },
  {
    code: 2,
    description: "Driver Arrived/Near Pickup",
    display: true,
    label: "Driver Arrived/Near Pickup"
  },
  {
    code: 3,
    description: "Picked Up",
    display: true,
    label: "Picked Up"
  },
  {
    code: 4,
    description: "Dropped Off",
    // display: true,
    label: "Trip Complete",
    reroute: "BookNow"
  },
  {
    code: 5,
    description: "No-Show Reported by Driver",
    display: true,
    label: "No-Show Reported by Driver",
    reroute: "BookNow"
  },
  {
    code: 6,
    description: "Customer Canceled with Driver",
    display: true,
    label: "Customer Canceled with Driver",
    reroute: "BookNow"
  },
  {
    code: 7,
    description: "Driver Change",
    display: true,
    label:
      "Your driver has been changed. A new driver will be en-route shortly."
  },
  {
    code: 8,
    description: "Dropoff Unknown",
    display: false,
    label: null,
    reroute: "BookNow"
  },
  {
    code: 9,
    description: "No-Show Reported by Dispatcher",
    display: true,
    label: "No-Show Reported by Dispatcher",
    reroute: "BookNow"
  },
  {
    code: 10,
    description: "Driver Removed by Dispatcher",
    display: true,
    label: "Your driver has been removed. Please request a new pickup.",
    reroute: "BookNow"
  },
  {
    code: 11,
    description: "New Driver Sent by Dispatcher",
    display: true,
    label: "Driver En-Route"
  },
  {
    code: 12,
    description: "Canceled by Dispatcher",
    display: true,
    label: "Canceled by Dispatcher",
    reroute: "BookNow"
  },
  {
    code: 13,
    description: "Canceled by Customer",
    display: false,
    label: null,
    reroute: "BookNow"
  },
  {
    code: 14,
    description: "Canceled by Affiliate",
    display: false,
    label: null,
    reroute: "BookNow"
  }
];

export function isJobCompleted(jobStatus) {
  const completedStatuses = jobStatuses
    .filter(status => status.reroute)
    .map(status => status.code);

  return completedStatuses.some(status => status === jobStatus);
}

export function isDriverEnroute(jobStatus) {
  return jobStatus === 1;
}

export function isDriverArrived(jobStatus) {
  return jobStatus === 2;
}

export function isPassengerEnroute(jobStatus) {
  return jobStatus === 3;
}

export function isDestinationArrived(jobStatus) {
  return jobStatus === 4;
}

export const isInServiceArea = point => {
  const polygon = [
    [-74.257622, 40.496309],
    [-74.255219, 40.513538],
    [-74.248352, 40.520063],
    [-74.249382, 40.532328],
    [-74.248695, 40.549287],
    [-74.234962, 40.557113],
    [-74.226379, 40.559721],
    [-74.220543, 40.557635],
    [-74.21402, 40.561025],
    [-74.206467, 40.586842],
    [-74.20475, 40.592578],
    [-74.1996, 40.599095],
    [-74.204063, 40.607958],
    [-74.238052, 40.629067],
    [-74.246979, 40.65642],
    [-74.245262, 40.680117],
    [-74.245262, 40.709532],
    [-74.246292, 40.727747],
    [-74.237366, 40.743095],
    [-74.207497, 40.760001],
    [-74.137115, 40.818226],
    [-74.093857, 40.828878],
    [-74.050598, 40.840827],
    [-74.018326, 40.877699],
    [-73.99086, 40.901577],
    [-73.955841, 40.923371],
    [-73.920135, 40.926484],
    [-73.844604, 40.907804],
    [-73.777313, 40.867315],
    [-73.781433, 40.827839],
    [-73.768387, 40.800296],
    [-73.755341, 40.793019],
    [-73.709335, 40.784181],
    [-73.679123, 40.774822],
    [-73.687363, 40.744136],
    [-73.683929, 40.701984],
    [-73.690796, 40.672827],
    [-73.692169, 40.654076],
    [-73.694229, 40.620207],
    [-73.686676, 40.596228],
    [-73.725815, 40.580585],
    [-73.818512, 40.5592],
    [-73.961334, 40.53572],
    [-73.9991, 40.553983],
    [-74.143295, 40.50649],
    [-74.2202, 40.490304],
    [-74.248352, 40.488737],
    [-74.257622, 40.496309]
  ];

  return inside(point, polygon);
};

export function calculatePayment(
  serviceType,
  base,
  extras,
  tip,
  taxRate,
  blackCarSurcharge
) {
  const services = {
    economy: "ECONOMY",
    premium: "PREMIUM"
  };
  const priceWithoutTip = base + extras;
  const capsServiceType = serviceType.toUpperCase();

  let total;
  if (capsServiceType === services.economy) total = priceWithoutTip + tip;
  else if (
    capsServiceType === services.premium ||
    capsServiceType === "LUXURY"
  ) {
    const additional = tip * blackCarSurcharge + tip * taxRate;
    total = priceWithoutTip + tip + additional;
  }
  return total;
}

export function formatPricingToPayment(pricing = {}) {
  // calculates the default payment amount from pricing
  const { fare, tip, total, amount_paid } = pricing;
  const keys = ["base", "extras", "tip", "amount", "paid", "due"];
  const calculations = {
    base: fare,
    extras: total - tip - fare,
    tip,
    amount: total,
    paid: amount_paid,
    due: total - amount_paid
  };
  const payment = keys.reduce((obj, key) => {
    const value = calculations[key];
    const newObj = obj;
    if (value) newObj[key] = value;
    return newObj;
  }, {});
  return payment;
}

class OptionsGroup {
  constructor(options) {
    this.options = options;
  }

  except(string) {
    const indexOfString = this.options.indexOf(string);
    if (indexOfString !== -1) {
      const edited = this.options.slice();
      edited.splice(indexOfString, 1);
      return edited;
    }
    // if the string isn't actually in the group, then just return the whole group
    return this.options;
  }
}

export const LoggedInOptions = new OptionsGroup([
  "BookNow",
  "UpdateProfile",
  "AddCard",
  "JobHistory",
  "Rewards",
  "LogOut"
]);
export const LoggedOutOptions = new OptionsGroup([
  "Login",
  "Signup",
  "Home",
  "ForgotPassword"
]);
export const NoCreditCardOptions = new OptionsGroup(["AddCard", "LogOut"]);
export const termsOfAgreementURL =
  "https://www.easterncarservice.com/terms_of_service.php";
export const driverWaitStatusMessages = [
  {
    message: "Dispatching your vehicle",
    delay: 30000
  },
  {
    message: "Waiting for an available vehicle. Thank you for your patience.",
    delay: 60000
  },
  {
    // this has to stay long because line breaks mess with formatting
    message:
      "It appears that there are no available vehicles at this moment. You may continue to wait as we try to get you a vehicle or cancel. We apologize for this inconvenience.",
    delay: 120000
  }
];

export const predefinedPlaces = [
  {
    description: "Placeholder Airport 1",
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
  },
  {
    description: "Placeholder Airport 2",
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
  }
];

export const EASTERN_VERSION = "2.0";
