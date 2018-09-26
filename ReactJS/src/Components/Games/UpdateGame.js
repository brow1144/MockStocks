import React, {Component} from 'react'
//ei-gear
import '../../Static/CSS/UpdateGame.css'
import {Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'mdbreact';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class UpdateGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

    render() {
        return (
            <Container>
              <Button color="grey" onClick={this.toggle}>Edit</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Create or join a new game</ModalHeader>

                <ModalBody>
                  <Input  value={this.state.code}  onChange={this.curCode} id="floorCode" label="Floor Code"/>
                  <Button color="grey" onClick={this.joinIt}>Join</Button>
                </ModalBody>

                <ModalFooter>
                  <Button color="blue" onClick={this.creating}>Submit settings</Button>
                  <Button color="grey" onClick={this.toggle}>Cancel</Button>{' '}
                </ModalFooter>


              </Modal>
            </Container>
        );
    }
}
export default UpdateGame;