import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log('hi')
    // axios
    //   .get('https://api.coindesk.com/v1/bpi/historical/close.json')
    //     .then(res => {
    //       console.log(res)
    //       this.setState({
    //         data: res.data
    //       });
    //     })
  }

  render() {
    console.log(this.state.data)
    return(
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

ReactDOM.render(< App/>, document.getElementById('app'));