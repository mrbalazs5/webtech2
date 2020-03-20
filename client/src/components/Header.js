import React from 'react';
import {NavLink} from 'react-router-dom';
import vitara from '../images/vitara.png';

export default class Header extends React.Component{
  state = {
    isOpenNav: false
  }

  handleOpenNav = () => {
    this.setState({isOpenNav: !this.state.isOpenNav})
  }

  render(){
    return(
      <header>
        <NavLink exact to="/"><img className="logo" src={vitara} alt="Czibók László szétfingott Vitarája"/></NavLink>
        <div className="menu-btn" onClick={this.handleOpenNav}>
          <span className={this.state.isOpenNav ? "menu-burger active" : "menu-burger"}/>
        </div>
        <ul className={this.state.isOpenNav ? "show" : ""}>
          <li><NavLink className="link" activeClassName="active" exact to="/"><span>Home</span></NavLink></li>
          <li><NavLink className="link" activeClassName="active" exact to="/about">About Us</NavLink></li>
          <li><NavLink className="link" activeClassName="active" exact to="/addvehicle">Add Vehicle</NavLink></li>
          <li><NavLink className="link" activeClassName="active" exact to="/managevehicle">Manage Vehicle</NavLink></li>
        </ul>

      </header>
    );
  }
}
