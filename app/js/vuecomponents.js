/* The Components  */
const Title = {
  props: ["title"],
  template: `
        <h1>{{ title }}</h1>
    `
};

const Forecast = {
  props: ["forecastData"],
  template: `
        <div v-if="forecastData">
          <h1>forecastData created: {{ forecastData.approvedTime | toLocaleTime }}</h1>
          <div v-for="hour in forecastData.timeSeries" class="tableBox">
            <h3>{{hour.validTime | toLocaleTime }}</h3>
            <table>
              <tbody>
                <tr v-for="item in hour.parameters">
                  <!--<td v-for="(value, key, index) in item" v-if="chosenParameter()">{{index}}{{ value | translateMeteoTerm }}: {{item.values[0]}}{{item.unit | translateUnit }}</td>-->
                  <td v-if="chosenParameter()">{{item.name | translateMeteoTerm }}</td>
                  <td v-if="chosenParameter()">{{item.values[0] | translateWind }} {{item.unit | translateUnit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="footer">
          <a href="http://opendata.smhi.se/apidocs/metfcst/parameters.html">http://opendata.smhi.se/apidocs/metfcst/parameters.html</a>
            <p>{{ forecastData }}</p>
          </div>
          
        </div>
      `,
  methods: {
    chosenParameter: function() {
      return true;
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
