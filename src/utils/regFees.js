import { isBefore } from "date-fns";

const times = {
  "Launch Special": new Date(2019, 7, 8, 23, 59, 59),
  "Early Bird": new Date(2019, 8, 4, 23, 59, 59),
  Standard: new Date(2019, 8, 25, 7, 0, 0), // Sep 25 2019 07:00:00
  "Throwback Thursday": new Date(2019, 8, 26, 23, 59, 59),
  "Standard 2": new Date(2019, 9, 16, 23, 59, 59),
  "On The Day": null
};

const fees = {
  "Rapid Ascent": {
    "Launch Special": 25,
    "Early Bird": 30,
    Standard: 45,
    "Throwback Thursday": 25,
    "Standard 2": 45,
    "On The Day": 55
  },
  "Extreme Ascent": {
    "Launch Special": 35,
    "Early Bird": 45,
    Standard: 55,
    "Throwback Thursday": 35,
    "Standard 2": 55,
    "On The Day": 70
  },
  "Wheely Good Course": {
    "Launch Special": 15,
    "Early Bird": 15,
    Standard: 20,
    "Throwback Thursday": 15,
    "Standard 2": 20,
    "On The Day": 35
  },
  "Mini Ascent": {
    "Launch Special": 15,
    "Early Bird": 15,
    Standard: 20,
    "Throwback Thursday": 15,
    "Standard 2": 20,
    "On The Day": 35
  },
  "Family Ascent": {
    "Launch Special": 30,
    "Early Bird": 40,
    Standard: 55,
    "Throwback Thursday": 30,
    "Standard 2": 55,
    "On The Day": 65
  },
  "Mount Everest Team Ascent": {
    "Launch Special": 30,
    "Early Bird": 40,
    Standard: 50,
    "Throwback Thursday": 30,
    "Standard 2": 50,
    "On The Day": 70
  }
};

const getFee = challenge => {
  const feeObj = fees[challenge || "Rapid Ascent"];
  const now = new Date();
  let fee = feeObj["On The Day"];
  Object.keys(feeObj)
    .reverse()
    .forEach(key => {
      if (isBefore(now, times[key])) {
        fee = feeObj[key];
      }
    });
  return fee;
};

export default getFee;
