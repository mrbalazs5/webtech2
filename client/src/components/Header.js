import React from 'react';
import {NavLink} from 'react-router-dom';
import carlogo from '../images/car_green.png';
import avatar from '../images/avatar.png';

class Header extends React.Component{
  //contains mobile navbar open state
  state = {
    isOpen: false, //mobile navbar
    isOpenForms: false
  }

  // change the state of the mobile nav
  handleIsOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  handleIsOpenForms = () => {
    this.setState({isOpenForms: !this.state.isOpen})
  }

  render(){
    return(
      <header>
        <NavLink exact to="/"><img className="logo" src={carlogo}/></NavLink>
        <div className="mobile-nav" onClick={this.handleIsOpen}>
          <span className={this.state.isOpen ? "nav-icon open" : "nav-icon"}/>
        </div>
        <ul className={this.state.isOpen ? "show" : ""}>
          <li><NavLink className="navlink" activeClassName="active" exact to="/">Main page</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/aboutus">About Us</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/addvehicle">Add vehicle</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/managevehicles">Manage vehicles</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/login">Sign in</NavLink></li>
          <li><NavLink className="navlink" activeClassName="active" exact to="/register">Sign up</NavLink></li>
        </ul>
        <div className="avatar">
          <img className="avatar-img" src={avatar} onClick={this.handleIsOpenForms}/>
        </div>

      </header>
    );
  }
}

export default Header;
