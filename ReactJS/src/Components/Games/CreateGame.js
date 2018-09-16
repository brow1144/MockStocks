import React, {Component} from 'react'

import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'mdbreact';
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
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <Container>
                <Button color="blue" onClick={this.toggle}>+game</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Creating a new game</ModalHeader>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="blue">Save changes</Button>
                        <Button color="grey" onClick={this.toggle}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default CreateGame;