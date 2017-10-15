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
    forecastData: null,
    title: "Showing geekish weather data and predictions for my garden"
  },
  template: `
        <div class="wrapper"> 
            <header-box :title='title'></header-box>
            <forecast-box :forecast-data="forecastData"></forecast-box>
        </div>
    `,
  methods: {
    getData: function() {
      this.url =
        "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/10.1877/lat/56.1130/data.json";
      this.$http.get(this.url).then(
        response => {
          console.log("response", response.data);
          this.forecastData = response.data;
          var rawForecast = response.data;
          this.rebuildforecastData(rawForecast);
        },
        response => {
          console.log("Error!", response);
        }
      );
    },
    rebuildforecastData: function(rawData) {
      var new_forecastData = [];
      rawData.timeSeries.forEach(function(item, index) {
        var sortedParams = _.sortBy(item.parameters, "name"); //Sort after parameter name in data
        var validTime = item.validTime; // Adding the time for the forecast
        sortedParams.unshift({ validTime: validTime });
        console.log("sortedParams", index, sortedParams);
        new_forecastData.push(sortedParams);
      });

      console.log("new_forecastData", new_forecastData);
    }
  },
  created: function() {
    this.getData();
  }
});

//export { VueApp };
