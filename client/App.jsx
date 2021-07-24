import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      chartData: []
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
          this.setState({
            data: bpiList,
            loading: !this.state.loading
          }), () => {
            console.log('create graph w data')
          }
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
        </div>
      );
    }
  }
}

ReactDOM.render(< App/>, document.getElementById('app'));