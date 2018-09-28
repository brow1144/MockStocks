import React, {Component} from 'react'
import {Table} from 'reactstrap'


class GameList extends Component {

  constructor(props) {
    super(props);
  }

  // Updates the current game prop
  updateFloor = (newIndex) => {
    this.props.updateGame(newIndex);
  };


  render() {
    console.error(this.props.myFloors);
    return (
      <div >
        <h5 className={"gamesText"}>Floor List</h5>
        <Table dark>
          <tbody>
          {this.props.myFloors.map((floor, key) => {
            return (<tr key={key}>
              <th id={key} onClick={() => {this.updateFloor(key)}} scope="row">{floor.game_name}</th>
            </tr>)
          })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default GameList;