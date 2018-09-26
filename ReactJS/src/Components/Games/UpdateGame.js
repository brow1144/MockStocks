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
      modal: false,
      startDate: moment(),
      endDate: moment()
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
                <ModalHeader toggle={this.toggle}>Edit Game Settings</ModalHeader>

                <ModalBody>
                  <Input label="Floor Name" value={this.props.currentGame.game_name}  onChange={this.curName} id="floorName"/>
                  Start Time
                  <DatePicker value={this.state.startDate.toString()}
                              id="startDate" selected={this.props.currentGame.start_time.toString()}
                              showTimeSelect
                              dateFormat="LLL"/>
                  <br/>
                  End Time
                  <DatePicker value={this.state.endDate.toString()}
                              id="endDate" selected={this.props.currentGame.end_time.toString()}
                              showTimeSelect
                              dateFormat="LLL"/>
                  <Input value={this.props.currentGame.starting_amount.toString()}  onChange={this.curMoney} id="startingMoney" label="Starting Money (USD)"/>
                  <Input value={this.props.currentGame.trade_limit.toString()}  onChange={this.curLimit} id="transLimit" label="Transaction Limit (0 for Unlimited)"/>
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