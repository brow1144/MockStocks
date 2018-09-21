import React, {Component} from 'react'
import {Table} from 'reactstrap'


class GameList extends Component {

  constructor(props) {
    super(props);
  }

<<<<<<< HEAD
    render() {
        return (
            <div  className='z-depth-5' >
                <h5 className={"gamesText"}>Floor List</h5>
                <Table dark>
                    <tbody>
                    <tr>
                        <th scope="row">xxN0Sc0p35xx</th>
                    </tr>
                    <tr>
                        <th scope="row">Sperg Floor</th>
                    </tr>
                    <tr>
                        <th scope="row">Shrek's Swamp</th>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
=======

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
>>>>>>> master
}

export default GameList;