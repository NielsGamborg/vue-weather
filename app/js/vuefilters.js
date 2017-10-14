const timeFilter = function(value) {
  if (!value) return "";
  //var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var days = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
  var date = new Date(value);
  var newValue =
    days[date.getDay()] +
    ", " +
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    ", " +
    date.getHours() +
    ":" +
    ("0" + date.getMinutes().toString()).slice(-2);
  return newValue;
};

const meteoTerms = function(value) {
  if (!value) return "";
  var newValue;
  var terms = {
    r: "Humidity",
    t: "Temperature",
    msl: "Air pressure",
    vis: "Visibility",
    wd: "Wind direction",
    ws: "Wind speed",
    gust: "Wind gust",
    tcc_mean: "Total cloud cover",
    lcc_mean: "Low level cloud cover",
    mcc_mean: "Medium level cloud cover",
    hcc_mean: "High level cloud cover",
    pmin: "Minimum precipitation intensity",
    pmax: "Maximum precipitation intensity",
    pmedian: "Median precipitation intensity",
    pmean: "Mean precipitation intensity",
    spp: "Percent of precipitation in frozen form",
    pcat: "Precipitation category",
    tstm: "Thunder probability"
  };
  if (terms[value]) {
    newValue = terms[value];
  } else {
    newValue = value;
  }
  return newValue;
};

const units = function(value) {
  if (!value) return "";
  var newValue;
  var units = {
    octas: "/8",
    percent: "%"
  };
  if (units[value]) {
    newValue = units[value];
  }
  if (value === "degree") {
    newValue = "";
  } else {
    newValue = value;
  }
  return newValue;
};

const wind = function(value) {
  if (!value) return value;
  var newValue = value;
  //newValue = "east";
  return newValue;
};

export { timeFilter, meteoTerms, units, wind };
