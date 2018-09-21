import React, {Component} from 'react'
import {Table} from 'reactstrap'


class GameList extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className='z-depth-5'>
        <h5 className={"gamesText"}>Floor List</h5>
        <Table dark>
          <tbody>
          {this.props.myFloors.map((floor, key) => {
            return (<tr key={key}>
              <th scope="row">{floor.game_name}</th>
            </tr>)
          })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default GameList;