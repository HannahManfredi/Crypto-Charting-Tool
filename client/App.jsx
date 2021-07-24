import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import MyChart from './MyChart.jsx';
import Chart from "chart.js";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      currentYear: 0,
      currentMonth: 0,
      currentDay: 0
    };
  }

  componentDidMount() {
    axios
      .get('https://api.coindesk.com/v1/bpi/historical/close.json')
        .then(res => {
          const bpiList = [];
          for (let key in res.data.bpi) {
            let item = {
              date: key,
              price: res.data.bpi[key]
            };
            bpiList.push(item)
          }
          let today = res.data.time.updated
          let y = today.slice(10, 12)
          let m = today.slice(0, 3)
          let d = today.slice(4, 6)
          this.setState({
            currentYear: y,
            currentMonth: m,
            currentDay: d,
            data: bpiList,
            loading: !this.state.loading
          }, () => {
            const parsedData = this.state.data;
            let months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
            let idx = months.indexOf(this.state.currentMonth)
            let prices = []
            let dates = [];
            parsedData.forEach(item => {
              dates.push(item.date)
              prices.push(Math.floor(item.price))
            })
            const ctx = document.getElementById("myChart");
            this.chart = new Chart(ctx, {
              type: "line",
              data: {
                  labels: [`${months[(idx - 1)]} '${this.state.currentYear}, ${months[idx]} '${this.state.currentYear}`],
                  datasets: [
                      {
                          label: "Dates",
                          data: dates,
                      },
                      {
                        label: "Prices",
                        data: prices,
                    }
                  ]
              }
            });
          })
        })
        .catch((err) => {
          throw err;
        });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Loading!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Crypto Charting Tool</h1>
          <canvas id="myChart" width="400" height="400">

          </canvas>
          <dl>
            <>
              {this.state.data.map((item, i) => (
                <React.Fragment key={i}>
                  <dt>{item.date}</dt>
                  <dd>{item.price}</dd>
                </React.Fragment>
              ))}
            </>
          </dl>
          <span>Powered by CoinDesk</span>
        </div>
      );
    }
  }
}

ReactDOM.render(< App/>, document.getElementById('app'));