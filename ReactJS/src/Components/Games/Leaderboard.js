import React, {Component} from 'react'
import { Table } from 'reactstrap'


class Leaderboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userList: this.props.users,
      curUsers: [],
      totalAssets: 0,
      rank: 0,
      tradesRemaining: 0,
      username: "",

    };
  }


  render() {
    return (
      <div  className='z-depth-5' >
        <h5 className={"gamesText"}>Leaderboard</h5>
        <Table className={"cenText"} dark hover>
          <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Assets</th>
            <th>Trades Left</th>
          </tr>
          </thead>
          <tbody style={{cursor: 'pointer'}}>

          {this.props.userGame.map((user, key) => {
            return (<tr key={key}>
              <th scope="row">{key + 1}</th>
              <th >{user.username}</th>
              <th >${user.totalAssets.toLocaleString()}</th>
              {this.props.currentGame.trade_limit === 0
                ?
                <th>Unlimited</th>
                :
                <th>{this.props.currentGame.trade_limit - user.trade_count} / {this.props.currentGame.trade_limit}</th>
              }
            </tr>)
          })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Leaderboard;