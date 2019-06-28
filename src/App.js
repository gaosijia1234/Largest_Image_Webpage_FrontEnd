import React from 'react';
import './App.css';
import Axios from 'axios';
import moment from 'moment'

class App extends React.Component {

  // define state object initialize with url 
  state = {
    url: '',
    urls: []
  }

  // make a get request
  async componentDidMount() {
    const response = await Axios.get("http://localhost:7777/loadtable");
    const urls = response.data.urls; // the response.data.urls is from the index.js
    this.setState({ urls });
  }

  // to load html
  render() {
    // extract the url from this.state object
    const { url, urls } = this.state;

    const enterInput = (e) => {
      // console.log(e.target.value);
      this.setState({ url: e.target.value }); // change the url value to be user input 

    }

    // post to the backend 
    const submitInput = async () => {
      const { url } = this.state; // get url key from this.state object
      await Axios.post('http://localhost:7777/submit', { url }); // get the result after send a post request 
      
    }

    const viewData = (id) => {
      alert(id);
    }

    return (
      <div className="App">
        <h1>Test</h1>
        <input onChange={enterInput} value={url} />
        <button onClick={submitInput}>submit</button>
        <table >
          <tr>
            <th>InputUrl</th>
            <th>Status</th>
            <th>OutputUrl</th>
            <th>Time</th>
          </tr>
          {urls.map((u) => {
            return (<tr>
              <td>{u.inputUrl}</td>
              <td>{u.status ? "Completed" : "In progress"}</td>
              <td>{u.outputUrl.url}</td>
              <td>{moment(u.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            </tr>)
          })}
        </table>

      </div>
    );
  }
}

export default App;
