/* The Components  */
const Title = {
  props: ["title"],
  template: `
        <h1>{{ title }}</h1>
    `
};

const Forecast = {
  props: ["forecastData"],
  data: function() {
    return {
      showPrecipitation: false,
      showSnow: false,
      showThunder: false,
      showClouds: false,
      showVisibility: false
    };
  },
  template: `
        <div v-if="forecastData">
          <p>Forecast updated: {{ forecastData.approvedTime | toLocaleTime }}</p>
          <p>
          Precipitation details<input type="checkbox" v-model="showPrecipitation"> 
          Snow<input type="checkbox" v-model="showSnow"> 
          Thunder<input type="checkbox" v-model="showThunder">
          Cloud details<input type="checkbox" v-model="showClouds">
          Visibility<input type="checkbox" v-model="showVisibility">
          </p>
          <div v-for="hour in forecastData.timeSeries" class="tableBox">
            <h3>{{hour.validTime | toLocaleTime }}</h3>
            <table>
              <tbody>
                <tr v-for="item in hour.parameters">
                  <!--<td v-for="(value, key, index) in item" v-if="chosenParameter()">{{index}}{{ value | translateMeteoTerm }}: {{item.values[0]}}{{item.unit | translateUnit }}</td>-->
                  <td v-if="chosenParameter(item.name)">{{item.name | translateMeteoTerm }}</td>
                  <td v-if="chosenParameter(item.name) && item.name !== 'wd'">{{item.values[0] }} {{item.unit | translateUnit }}</td>
                  <td v-if="chosenParameter(item.name) && item.name === 'wd'">{{item.values[0] | translateWind }} {{item.unit | translateUnit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="footer">
          <a href="http://opendata.smhi.se/apidocs/metfcst/index.html">http://opendata.smhi.se/apidocs/metfcst/index.html</a><br>
          <a href="http://opendata.smhi.se/apidocs/metfcst/parameters.html">http://opendata.smhi.se/apidocs/metfcst/parameters.html</a><br>
        
          </div>
          
        </div>
      `,
  methods: {
    chosenParameter: function(name) {
      /*console.log("name: ", name);
      console.log("showSnow: ", this.showSnow);
      console.log("showThunder: ", this.showThunder);*/
      var showParam;
      if (name === "tstm") {
        showParam = this.showThunder;
      } else if (name === "spp") {
        showParam = this.showSnow;
      } else if (name === "lcc_mean" || name === "mcc_mean" || name === "hcc_mean") {
        showParam = this.showClouds;
      } else if (name === "pcat" || name === "pmax" || name === "pmin" || name === "pmedian") {
        showParam = this.showPrecipitation;
      } else if (name === "vis") {
        showParam = this.showVisibility;
      } else {
        showParam = true;
      }
      return showParam;
    }
  },
  created: function() {
    console.log("");
  }
};

/* http://opendata.smhi.se/apidocs/metfcst/parameters.html */

const Page404 = {
  template: `
    <div>
        <h3>404</h3>
        <p>The requested URL can't be found</p>
    </div>    
    `
};

export { Title, Page404, Forecast };
