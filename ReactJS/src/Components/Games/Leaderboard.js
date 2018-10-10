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

  componentWillMount () {
    // Make server call for data
    this.genData();
  }

  /**
   * Generates an array of each user's data
   */
  genData = () => {
    let self = this;
    self.setState({
      userList: self.props.users
    }, () => {
      console.log(JSON.stringify(self.state.userList))
      for (let x = 0; x < self.state.userList.length; x++) {
        // Look for current game in user's active games array
        for (let y = 0; y < self.state.userList[x].active_games.length; y++) {
          // Check if the code matches the current game
          if (self.props.code === self.state.userList[x].active_games[y].code) {
            // Add a matching game to the list of users' data
            let added = self.state.curUsers.concat(self.state.userList[x].active_games[y]);
            console.log("FOUND ONE");
            self.setState({
              curUsers: added
            })
          }
        }
      }
    })
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

          {this.state.userList.map((user, key) => {
            return (<tr key={key}>
              <th scope="row">{key}</th>
              <th >{user.username}</th>
              <th >{user.totalAssets}</th>
              {this.props.currentGame.trade_limit === 0
                ?
                <th>Unlimited</th>
                :
                <th>{user.trade_count} / {this.props.currentGame.trade_limit}</th>
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