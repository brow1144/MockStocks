import React, {Component} from 'react';
import { Row, Col, Table, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import axios from "axios/index";

class Watchlist extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: props.uid,
      watchlist: [],
      sortOpen: false,
      loaded: false,
    };

    this.toggle = this.toggle.bind(this);
    this.sortSelected = this.sortSelected.bind(this);
  }

  componentWillMount(){
    this.getWatchlist();
  }

  handleRemoveStock(index){
    let removeItem = this.state.watchlist[index];
    this.removeStock(index);
    axios.delete(`http://localhost:8080/Portfol.io/Watchlist/${this.state.uid}/${removeItem.symbol}`)
      .then(function (response) {
        // handle success
        let data = response.data;

      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
      })
  }

  removeStock(index){
    let sl = this.state.watchlist;
    //Eric defect 16, removing an item from the watchlist removes 2 from the table
    sl.splice(index, 2);
    this.setState({
      watchlist: sl,
    });
  };

  toggle(){
    let self = this;
    self.setState({
      sortOpen: !self.state.sortOpen,
    });
  }

  sortSelected(e){
    let self = this;
    let param = e.currentTarget.name;
    let sortedList = self.state.watchlist.sort(this.sortFunc(param));
    self.setState({
      watchlist: sortedList,
    });
  }

  sortFunc(sortParam){
    switch(sortParam){
      case "alphabetical":
        return function (a, b) {
          return b.symbol < a.symbol;
        };
      case "reverse_alphabetical":
        return function (a, b) {
          //Eric defect 17, reverse alphabetical sorts by alphabetical
          return a.symbol > b.symbol;
        };
      case "high_price":
        return function (a, b) {
          return b.close - a.close;
        };
      case "low_price":
        return function (a, b) {
          return a.close - b.close;
        };
      case "high_change":
        return function (a, b) {
          return b.changePercent - a.changePercent;
        };
      case "low_change":
        return function (a, b) {
          return a.changePercent - b.changePercent;
        };
    }
  }

  getWatchlist = () => {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Watchlist/${this.props.uid}`)
      .then(function (response) {
        // handle success
        let watchlist = response.data;

        self.setState({
          watchlist: watchlist,
          loaded: true,
        });

      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
      })
  };

  render() {
    return (
      <div>

        <Row style={{paddingTop: '10em'}} className='blackBackground body_div'>
          <Col sm='2' md='2'/>
          <Col sm='6' md='6'>
            <h3 style={{color: 'whitesmoke'}}>Watchlist</h3>
          </Col>
          <Col sm='2' md='1'/>
          <Col sm='2' md='2'>
            <ButtonDropdown isOpen={this.state.sortOpen} toggle={this.toggle}>
              <DropdownToggle caret color='grey' size='sm'>Sort By</DropdownToggle>
              <DropdownMenu>
                <DropdownItem name='alphabetical' onClick={this.sortSelected}>A - Z</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name='reverse_alphabetical' onClick={this.sortSelected}>Z - A</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name='high_price' onClick={this.sortSelected}>High Price</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name='low_price' onClick={this.sortSelected}>Low Price</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name='high_change' onClick={this.sortSelected}>High Change</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name='low_change' onClick={this.sortSelected}>Low Change</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
        </Row>

        {this.state.loaded
          ?
          <Row style={{paddingTop: '1em'}} className='blackBackground body_div'>
            <Col md='2'/>
            <Col md='8'>
              <Table className='z-depth-5 cenText' dark hover>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Price at Close</th>
                  <th>Today's Change</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {this.state.watchlist.map((stock, key) => {
                  return (
                    <tr key={key}>
                      <th scope="row"><h5 style={{textDecoration: 'none', color: 'whitesmoke'}}>{key + 1}</h5></th>
                      <th><NavLink to={`/Portfolio/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{stock.symbol}</NavLink></th>
                      <th><h5 style={{textDecoration: 'none', color: 'whitesmoke'}}>${stock.close}</h5></th>
                      {stock.changePercent >= 0
                      ?
                        <th><h5 style={{textDecoration: 'none', color: 'green'}}>{'+' + parseFloat(stock.changePercent).toFixed(4) + "%"}</h5></th>
                      :
                        <th><h5 style={{textDecoration: 'none', color: 'red'}}>{parseFloat(stock.changePercent).toFixed(4) + "%"}</h5></th>
                      }
                      <th><Button size='sm' color='red' onClick={() => this.handleRemoveStock(key)}>Remove</Button></th>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </Col>
          </Row>
          :
          <Row style={{paddingTop: '1em'}} className='blackBackground body_div'>
            <Col md='2'/>
            <Col md='8'>
              <Table className='z-depth-5 cenText' dark hover>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Price at Close</th>
                  <th>Today's Change</th>
                  <th/>
                </tr>
                </thead>
              </Table>
            </Col>
          </Row>

        }

      </div>
    )
  }

}

export default Watchlist;