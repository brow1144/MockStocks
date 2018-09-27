import React, {Component} from 'react'
import { Table } from 'reactstrap'


class Leaderboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      totalAssets: [],
      rank: []
    }
  }

  calculateStock = () => {

  };

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
          {this.props.users.map((user, key) => {
            return (<tr key={key}>
              <th scope="row">{key}</th>
              <th >{user.username}</th>
              <th >{user.totalAssets}</th>
              <th >Unlimited</th>
            </tr>)
          })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Leaderboard;