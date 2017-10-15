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
      //var new_forecastData = this._.random(20);
      //var new_forecastData = rawData;
      var new_forecastData = [];
      /*
      for (var i = 0; i < rawData.timeSeries.length; i++) {
        for (var j = 0; j < rawData.timeSeries[i].parameters.length; j++) {
          console.log(i, j, rawData.timeSeries[i].parameters[j].name);
        }
      }*/
      /*
      rawData.timeSeries.forEach(function(item, index) {
        item.parameters.forEach(function(item2, index2) {
          //console.log("item2", item2);
          /*item2.forEach(function(item3, index3) {
            var myVar1 = item.parameters;
            var myVar2 = _.sortBy(item);
            console.log("myVar1", myVar1);
            console.log("myVar2", myVar2);
            console.log(index, index2, index3, item2.name);
          }); */
      /*   var myVar1 = item.parameters;
          var myVar2 = _.sortBy(item2[name]);
          console.log(index);
          console.log("myVar1", myVar1);
          console.log("myVar2", myVar2);
          console.log(index, index2, item2.name);
        });
      });
      */

      rawData.timeSeries.forEach(function(item, index) {
        var myVar1 = item.parameters;
        var myVar2 = _.sortBy(item.parameters);
        console.log(index);
        console.log("myVar1", myVar1);
        console.log("myVar2", myVar2);
        console.log(index);
        new_forecastData.push(myVar2);
      });
      /*
      rawData.timeSeries.forEach(function(item, index) {
        var myVar1 = item.parameters;
        var myVar2 = _.sortBy(item.parameters);
        console.log(index);
        console.log("myVar1", myVar1);
        console.log("myVar2", myVar2);
        console.log(index);
        new_forecastData.push(myVar2);
      });
      */
      //return new_forecastData;

      console.log("new_forecastData", new_forecastData);
    }
  },
  created: function() {
    this.getData();
  }
});

//export { VueApp };
