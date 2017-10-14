/* External Vue stuff */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

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
          console.log("response.timeSeries.parameters", response.data.timeSeries[0].parameters[0]);
          this.forecastData = response.data;
        },
        response => {
          console.log("Error!", response);
        }
      );
    }
  },
  created: function() {
    this.getData();
  }
});

//export { VueApp };
