import React, {Component} from 'react'
import { Table } from 'reactstrap'


class GameList extends Component {

    constructor(props) {
        super(props);
    }

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
}

export default GameList;