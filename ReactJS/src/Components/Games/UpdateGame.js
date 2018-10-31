import React, {Component} from 'react'

import '../../Static/CSS/UpdateGame.css'
import {Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'mdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Alert} from 'reactstrap'

import moment from 'moment';
import axios from "axios/index";


class UpdateGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      startDate: moment(),
      endDate: moment(),
      game_name: "",
      starting_amount: 0,
      trade_limit: 0,
      errMessage: "",

      err: false
    };

  }

  componentWillMount () {
    // Put props into the state
    this.setState({
      game_name: this.props.currentGame.game_name,
      starting_amount: this.props.currentGame.starting_amount,
      trade_limit: this.props.currentGame.trade_limit,
    })
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeStart =(date)=> {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd =(date)=> {
    this.setState({
      endDate: date
    });
  }

  update = () => {

    // Server call to update the game
    if (this.state.starting_amount <= 0){
      this.setState({err:true, errorMessage: "Invalid Buying Power"})
    } else if(this.state.trade_limit < 0) {
      this.setState({err:true, errorMessage: "Invalid Trade Limit"})
    } else if(typeof this.state.game_name === 'undefined' || this.state.game_name.length <= 0) {
      this.setState({err:true, errorMessage: "Invalid Game Name"})
    }
    else {
      axios.put(`https://portfolio-408-main.herokuapp.com/Portfol.io/Games/${this.props.currentGame.code}`, {
        game_name: this.state.game_name,
        starting_amount: parseFloat(this.state.starting_amount),
        trade_limit: this.state.trade_limit,
        start_time: this.state.startDate,
        end_time: this.state.endDate
      }).then(() => {
        window.location.reload();

      }).catch((error) => {
        console.log("Cannot update the game");

        if (error.response && error.response.data) {
          this.setState({
            err: true,
            errorMessage: error.response.data.error.message,
          });
          console.log(error.response.data.error);
        }
        else
          console.log(error);
      });

      this.setState({
        modal: false
      })
    }
  }

  curMoney = (event) => {
    this.setState({starting_amount: event.target.value});
  }

  curLimit = (event) => {
    this.setState({trade_limit: event.target.value});
  }

  curName = (event) => {
    this.setState({game_name: event.target.value});
  }

  dismiss = () => {
    this.setState({err: false});
  }

    render() {
        return (
            <Container>
              <Button color="grey" onClick={this.toggle}>Edit</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit Game Settings</ModalHeader>

                <ModalBody>
                  <Alert color="danger" toggle={this.dismiss} isOpen={this.state.err}>{this.state.errorMessage}</Alert>
                  <Input label={'Current Floor Name : "'+ this.props.currentGame.game_name +'"'} onChange={this.curName} id="floorName"/>
                  Select a new Start Time
                  <DatePicker value={this.state.startDate.toString()}
                              id="startDate" selected={this.state.startDate}
                              onChange={this.handleChangeStart} showTimeSelect
                              dateFormat="LLL"/>
                  <br/>
                  Select a new End Time
                  <DatePicker value={this.state.endDate.toString()}
                              id="endDate" selected={this.state.endDate}
                              onChange={this.handleChangeEnd} showTimeSelect
                              dateFormat="LLL"/>
                  <Input onChange={this.curMoney} id="startingMoney" label={'Current Starting Money (USD) : ' + this.props.currentGame.starting_amount} />
                  <Input onChange={this.curLimit} id="transLimit" label={"Current Transaction Limit (0 for Unlimited) : " + this.props.currentGame.trade_limit}/>
                </ModalBody>

                <ModalFooter>
                  <Button color="blue" onClick={this.update}>Submit settings</Button>
                  <Button color="grey" onClick={this.toggle}>Cancel</Button>{' '}
                </ModalFooter>


              </Modal>
            </Container>
        );
    }
}
export default UpdateGame;