import React, {Component} from 'react'
import { Table } from 'reactstrap'


class Leaderboard extends Component {

  render() {
    return (
      <div  className='z-depth-5' >
        <h5 className={"gamesText"}>Leaderboard</h5>
        <Table dark>
          <thead>
          <tr>
            <th>Rank</th>
            <th>User Name</th>
            <th>Total Money</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Jeremy</td>
            <td>$10456</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Walter</td>
            <td>$145</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Jacob</td>
            <td>$202</td>
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Leaderboard;