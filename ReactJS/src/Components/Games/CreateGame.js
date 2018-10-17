import React, {Component} from 'react'

import {Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'mdbreact';
import {Row, Col, Alert} from 'reactstrap'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import '../../Static/CSS/CreateGame.css'
import axios from "axios/index";
import {fireauth} from "../../base";

class CreateGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,

      waiting: true,
      joinGame: false,
      createGame: false,

      code: 0,
      game_name: "",
      leader_email: "",
      startDate: moment(),
      endDate: moment(),
      starting_amount: "",
      trade_limit: "",

      badDates: false,
      errMessage: "",
      err: false
    };

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
      createGame: true,
      err: false,
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

  generateId = () => {
     return Math.floor(Math.random()*90000) + 10000;
  }

  joinIt = () => {
    console.log("--1")
    console.log(this.state.code);
    let gameId = this.state.code;
    console.log(this.props.uid);
    console.log(gameId);

    console.log("--2");

    axios.put(`http://localhost:8080/Portfol.io/Games/${this.props.uid}/${gameId}`)
      .then((response) => {
        // should probably update state with values from response
        this.setState({
          startDate: null,
          endDate: null,
          waiting: true,
          joinGame: false,
          createGame: false,
          code: 0,
          game_name: "",
          leader_email: "",
          starting_amount: 0,
          trade_limit: 0,
        });
        this.toggle();
        this.props.reloadPage();
      })
      .catch((error) => {
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
  }

  createIt = () => {
    let self = this;
    console.log("--3");
    let gameId = self.generateId();
    console.log("--4");
    console.log();

    if (self.state.startDate < self.state.endDate) {

      axios.post(`http://localhost:8080/Portfol.io/Games`,
        {
          code: gameId,
          game_name: self.state.game_name,
          leader_email: self.props.email,
          starting_amount: self.state.starting_amount,
          trade_limit: self.state.trade_limit,
          start_time: self.state.startDate,
          end_time: self.state.endDate
        }).then(() => {
        console.log("--5");

        self.setState({
          code: gameId
        });
        self.joinIt();
        console.log("--6");
      }).catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data.error);
          if (error.response.data.error.message.errmsg && error.response.data.error.message.errmsg.includes("duplicate")) {
            self.createIt();
          }
        } else {
          console.log(error);
        }


      });

      this.toggle();
    } else {
      self.setState({
        badDates: true
      })
    }

  }

  curName = (event) => {
    this.setState({game_name: event.target.value});
  }

  curStart = (event) => {
    this.setState({startDate: event.target.value});
  }

  curEnd = (event) => {
    this.setState({endDate: event.target.value});
  }

  curMoney = (event) => {
    this.setState({starting_amount: event.target.value});
  }

  curLimit = (event) => {
    this.setState({trade_limit: event.target.value});
  }

  curCode = (event) => {
    this.setState({code: event.target.value});
  }

  dismiss = () => {
    this.setState({err: false});
  }

  dateReset = () =>{
    this.setState({badDates: false});
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
              <Alert color="danger" toggle={this.dismiss} isOpen={this.state.err}>{this.state.errorMessage}</Alert>
              <Input  value={this.state.code}  onChange={this.curCode} id="floorCode" label="Floor Code"/>
              <Button color="grey" onClick={this.joinIt}>Join</Button>
            </ModalBody>
            : this.state.createGame === true
              ?
              <ModalBody>
                <Input value={this.state.game_name}  onChange={this.curName} id="floorName" label="Floor name"/>
                Start Time
                <DatePicker value={this.state.startDate.toString()}
                            id="startDate" selected={this.state.startDate}
                            onChange={this.handleChangeStart} showTimeSelect
                            dateFormat="LLL"/>
                <br/>
                End Time
                <DatePicker value={this.state.endDate.toString()}
                            id="endDate" selected={this.state.endDate}
                            onChange={this.handleChangeEnd} showTimeSelect
                            dateFormat="LLL"/>
                <Input value={this.state.starting_amount}  onChange={this.curMoney} id="startingMoney" label="Starting Money (USD)"/>
                <Input value={this.state.trade_limit}  onChange={this.curLimit} id="transLimit" label="Transaction Limit (0 for Unlimited)"/>
                {this.state.badDates === true
                  ?
                  <Alert color="danger" isOpen={this.state.badDates} toggle={this.dateReset}>Make sure your start is before your end!</Alert>
                  : null
                }
                <Button color="grey" onClick={this.createIt}>Submit</Button>
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


        export default CreateGame;
