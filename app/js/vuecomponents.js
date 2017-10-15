/* The Components  */
const Title = {
  props: ["title"],
  template: `
  <div id="header">
        <h1>{{ title }}</h1>
  </div>
        `
};

const Forecast = {
  props: ["forecastData"],
  data: function() {
    return {
      forecastLength: 8,
      showPrecipitation: false,
      showSnow: false,
      showThunder: false,
      showClouds: false,
      showVisibility: false
    };
  },
  template: `
        <div id="databox" v-if="forecastData">
          <p>Forecast updated: {{ forecastData.approvedTime | toLocaleTime }}</p>

          <div id="selectLength">
          Length of forecast: 
          <select v-model="forecastLength">
            <option value="8">8 hours</option>
            <option value="24">24 hours</option>
            <option value="48">48 hours</option>
            <option value="100">All</option>
          </select>
        </div>

          <p>
          Cloud details<input type="checkbox" v-model="showClouds">
          Precipitation details<input type="checkbox" v-model="showPrecipitation"> 
          Snow<input type="checkbox" v-model="showSnow"> 
          Thunder<input type="checkbox" v-model="showThunder">
          Visibility<input type="checkbox" v-model="showVisibility">

          
          </p>
          <div v-for="(hour, index) in forecastData.timeSeries" v-if="index < forecastLength" class="tableBox">  
            <h3>{{hour.validTime | toLocaleTime }}</h3>
            <table>
              <tbody>
                <tr v-for="item in hour.parameters" :title="item.name | translateMeteoTerm">
                  <td v-if="chosenParameter(item.name)" >{{item.name | translateMeteoTerm }}</td>
                  <td v-if="chosenParameter(item.name) && item.name !== 'wd' && item.name !== 'pcat'">{{item.values[0] }}<span class="unit">{{item.unit | translateUnit }}</span></td>
                  <td v-if="chosenParameter(item.name) && item.name === 'wd'">{{item.values[0] | translateWind }}</td>
                  <td class="des" v-if="chosenParameter(item.name) && item.name === 'pcat'">{{item.values[0] | precipitationDescription }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="footer">
          <p>Meteorological Forecasts from <a href="http://opendata.smhi.se/apidocs/metfcst/index.html">SMHI Open Data</a>.</p>
          <p><a href="http://opendata.smhi.se/apidocs/metfcst/parameters.html">http://opendata.smhi.se/apidocs/metfcst/parameters.html</a></p>
        
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
      } else if (name === "pmax" || name === "pmin" || name === "pmedian") {
        showParam = this.showPrecipitation;
      } else if (name === "vis") {
        showParam = this.showVisibility;
      } else if (name === "Wsymb2") {
        showParam = false;
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
