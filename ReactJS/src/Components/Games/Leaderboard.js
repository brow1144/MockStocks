import React, {Component} from 'react'
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact'
import { Table } from 'reactstrap'



class Leaderboard extends Component {

  render() {
    return (
      <div style={{position: 'fixed', width: 'inherit',maxWidth: 'inherit'}} className='z-depth-5' >
        <h5 style={{color: 'whitesmoke'}}>Leaderboard</h5>
        <Table dark>
          <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Leaderboard;