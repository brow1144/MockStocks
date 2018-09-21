import React, {Component} from 'react'
import { Table } from 'reactstrap'


class Leaderboard extends Component {

  constructor(props) {
    super(props);
  }

  calculateStock = () => {
    
  }

  render() {
    return (
      <div  className='z-depth-5' >
        <h5 className={"gamesText"}>Leaderboard</h5>
        <Table dark>
          <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Assets</th>
            <th>Trades Left</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Jeremy</td>
            <td>$10456</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Walter</td>
            <td>$145</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Jacob</td>
            <td>$202</td>
            <td>2</td>
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Leaderboard;