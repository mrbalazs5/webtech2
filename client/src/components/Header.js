import React from 'react';
import {NavLink} from 'react-router-dom';

import Icon from './svg/Icon';

class Header extends React.Component{
  render(){
    return(
      <header>
        <ul>
          <li><NavLink className="navlink" activeClassName="active" exact to="/">Main page</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/aboutus">About Us</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/addvehicle">Add vehicle</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/managevehicles">Manage vehicles</NavLink></li>
        </ul>
      </header>
    );
  }
}

export default Header;
