import React, {Component} from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {Input, Button} from 'mdbreact';

import '../../Static/CSS/CreateGame.css'

class CreateGame extends Component {

    render() {
        return (
            <div>
                <Button className='signInButton' type='submit' color="blue" >+ create game</Button>
            </div>
        );
    }
}

export default CreateGame;