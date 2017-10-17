/* External Vue stuff */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import lodash from "lodash";
import VueLodash from "vue-lodash";

Vue.use(VueAxios, axios);
Vue.use(VueLodash, lodash);

/* FIlters, components */
import { timeFilter, meteoTerms, units, wind, precipitationDescription } from "./vuefilters.js";
import { Title, Forecast } from "./vuecomponents.js";

Vue.filter("toLocaleTime", timeFilter);
Vue.filter("translateMeteoTerm", meteoTerms);
Vue.filter("translateUnit", units);
Vue.filter("translateWind", wind);
Vue.filter("precipitationDescription", precipitationDescription);
Vue.component("header-box", Title);
Vue.component("forecast-box", Forecast);

const VueApp = new Vue({
  el: "#app",
  data: {
    forecastData_raw: null,
    forecastData: null,
    title: "Showing geekish weather data and predictions for my garden"
  },
  template: `
        <div class="wrapper"> 
            <header-box :title='title'></header-box>
            <forecast-box :forecast-data_raw="forecastData_raw" :forecast-data="forecastData"></forecast-box>
        </div>
    `,
  methods: {
    getData: function() {
      this.url =
        "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/10.1877/lat/56.1130/data.json";
      this.$http.get(this.url).then(
        response => {
          console.log("response", response.data);
          this.forecastData_raw = response.data;
          var rawForec = response.data;
          this.rebuildforecastData(rawForec);
        },
        response => {
          console.log("Error!", response);
        }
      );
    },
    rebuildforecastData: function(rawData) {
      var new_forecastData = [];
      var tempObj = {};
      rawData.timeSeries.forEach(function(item, index) {
        //var sortedParams = _.sortBy(item.parameters, "name", false); //Sort after parameter name in data
        var sortedParams = _.orderBy(item.parameters, "unit", "asc"); //Sort after parameter name in data
        var validTime = item.validTime; // Adding the time for the forecast
        tempObj = { validTime: validTime, parameters: sortedParams }; //Building time series objects
        new_forecastData.push(tempObj);
        //console.log("sortedParams", index, sortedParams);
      });
      this.forecastData = { approvedTime: rawData.approvedTime, timeSeries: new_forecastData };
      console.log("this.forecastData", this.forecastData);
    }
  },
  created: function() {
    this.getData();
  }
});

//export { VueApp };
