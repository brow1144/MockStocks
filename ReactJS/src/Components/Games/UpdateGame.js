import React, {Component} from 'react'
//ei-gear
import '../../Static/CSS/UpdateGame.css'
//import gear from 'C:/Users/bkrc/Documents/GitHub/Portfol.io/ReactJS/node_modules/evil-icons/assets/icons/ei-gear.svg'
class UpdateGame extends Component {

  componentWillMount() {
    var icons = require("evil-icons")
  }
    render() {
        return (
            <div>
              <link rel="stylesheet" type="text/css" href="./node_modules/evil-icons/assets/evil-icons.css"/>
              <button><img src="ei-gear" alt="" /></button>
            </div>
        );
    }
}
export default UpdateGame;