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
                <!--
                <tr v-for="item in hour.parameters">
                  <td v-for="(value, key) in item" v-if="key !=='levelType' && key !=='level' ">{{ value }}</td>
                </tr>-->
                <tr v-for="item in hour.parameters">
                  <!--<td v-if="key=='r'">{{ value }}</td>-->
                  <!--<td v-for="(value, key) in item" v-if="value=='t'">{{ value | translateMeteoTerm }}: {{item.values[0]}} {{item.unit}}</td>
                  <td v-for="(value, key) in item" v-if="value=='r'">{{ value | translateMeteoTerm }}: {{item.values[0]}} {{item.unit | translateUnit}}</td>
                  <td v-for="(value, key) in item" v-if="value=='gust'">{{ value | translateMeteoTerm }}: {{item.values[0]}} {{item.unit}}</td>
                  <td v-for="(value, key) in item" v-if="value=='ws'">{{ value | translateMeteoTerm }}: {{item.values[0]}} {{item.unit}}</td>
                  <td v-for="(value, key) in item" v-if="value=='wd'">{{ value | translateMeteoTerm }}: {{item.values[0]}} {{item.unit | translateUnit }}</td>
                  <td v-for="(value, key) in item" v-if="value=='tcc_mean'">{{ value | translateMeteoTerm }}: {{item.values[0]}}{{item.unit | translateUnit }}</td>
                  <td v-for="(value, key) in item" v-if="value=='lcc_mean'">{{ value | translateMeteoTerm }}: {{item.values[0]}}{{item.unit | translateUnit }}</td>
                  <td v-for="(value, key) in item" v-if="value=='mcc_mean'">{{ value | translateMeteoTerm }}: {{item.values[0]}}{{item.unit | translateUnit }}</td>
                  <td v-for="(value, key) in item" v-if="value=='hcc_mean'">{{ value | translateMeteoTerm }}: {{item.values[0]}}{{item.unit | translateUnit }}</td>
                  -->
                  <td v-for="(value, key) in item" v-if="chosenParameter()">{{ value | translateMeteoTerm }}: {{item.values[0]}}{{item.unit | translateUnit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="footer">
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
