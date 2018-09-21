import React, {Component} from 'react'

import {Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'mdbreact';
import {Row, Col} from 'reactstrap'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import '../../Static/CSS/CreateGame.css'

class CreateGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      startDate: moment(),
      waiting: true,
      joinGame: false,
      createGame: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      waiting: true,
      joinGame: false,
      createGame: false
    });
  }

  joining = () => {
    this.setState({
      waiting: false,
      joinGame: true,
      createGame: false
    });
  }

  creating = () => {
    this.setState({
      waiting: false,
      joinGame: false,
      createGame: true
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  joinIt = () => {

  }

  createIt = () => {

  }
  render() {

    return (
      <Container>
        <Button color="blue" onClick={this.toggle}>+game</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create or join a new game</ModalHeader>
          {this.state.joinGame === true
            ?
            <ModalBody>
              <Input label="Floor Code"/>
              <Button color="grey" onClick={this.joining}>Join</Button>
            </ModalBody>
            :
            this.state.createGame === true
              ?
              <ModalBody>
                <Input label="Floor name"/>
                Start Time
                <DatePicker selected={this.state.startDate}
                            onChange={this.handleChange} showTimeSelect
                            dateFormat="LLL"/>
                <br/>
                End Time
                <DatePicker selected={this.state.startDate}
                            onChange={this.handleChange} showTimeSelect
                            dateFormat="LLL"/>
                <Input label="Starting Money (USD)"/>
                <Input label="Transaction Limit"/>
                <Button color="grey" onClick={this.creating}>Submit</Button>
              </ModalBody>
              : null
          }

              <ModalFooter>
          <Button color="success" onClick={this.joining}>Join Game</Button>
          <Button color="blue" onClick={this.creating}>Create Game</Button>
          <Button color="grey" onClick={this.toggle}>Cancel</Button>{' '}
        </ModalFooter>


        </Modal>
        </Container>
        );
        }
        }

        /*
        *
                            */

        export default CreateGame;