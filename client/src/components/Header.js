import React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component{
  render(){
    return(
      <header>
        <NavLink className="link" activeClassName="active" exact to="/">Home</NavLink>
        <NavLink className="link" activeClassName="active" exact to="/about">About Us</NavLink>
        <NavLink className="link" activeClassName="active" exact to="/addvehicle">Add Vehicle</NavLink>
        <NavLink className="link" activeClassName="active" exact to="/managevehicle">Manage Vehicle</NavLink>
      </header>
    );
  }
}

export default Header;
