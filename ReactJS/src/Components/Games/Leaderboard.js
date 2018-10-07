import React, {Component} from 'react'
import { Table } from 'reactstrap'


class Leaderboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      curUsers: [{}],
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
    console.log(self.props.users[0])
    console.log(self.props.users.length)
    for (let x = 0; x < self.props.users.length; x++) {
      console.log("User check")
      // Look for current game in user's active games array
      for (let y = 0; y < self.props.users[x].active_games.length; y++) {
        console.log("Games check")
        // Check if the code matches the current game
        if (self.props.code === self.props.users[x].active_games[y].code) {
          // Add a matching game to the list of users' data
          let added = self.state.curUsers.concat(self.props.users[x].active_games[y]);
          console.log("FOUND ONE");
          self.setState({
            curUsers: added
          })
        }
      }
    }
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
          {this.props.users.map((user, key) => {
            return (<tr key={key}>
              <th scope="row">{key}</th>
              <th >{user.username}</th>
              <th >{user.totalAssets}</th>
              <th>Unlimited</th>
            </tr>)
          })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Leaderboard;