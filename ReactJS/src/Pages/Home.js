import React, {Component} from 'react';

import NavBar from '../Components/NavBar';

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import {Row, Col} from 'reactstrap';

import '../../node_modules/highcharts/css/themes/dark-unica.css';

class Home extends Component {

  render() {
  // Apply the theme
  // Highcharts.Highcharts.setOptions(HighchartsTheme.dark);
    const options = {
      title: {
        text: 'My stock chart'
      },
      series: [{
        data: [1, 2, 3]
      }]
    }
    

    return (
      <div>
        <NavBar />

        {/* <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        /> */}
        
      </div>
    );
  }
}

export default Home;