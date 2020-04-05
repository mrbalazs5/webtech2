import React from 'react';
import './Menu.scss';
import {NavLink} from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';
import carlogo from '../images/car_green.png';

class Menu extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      user: null,
      menuIsOpen: false,
      avatar: defaultAvatar
    }
  }

  handleMenuIsOpen = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  }

  render(){
    return(

      <div className={'menu'}>

        <NavLink exact to={'/'}>
          <img className={'logo-main'} src={carlogo} alt={'Webtech 2 logo'}/>
        </NavLink>

        <div className={'hamburger'} onClick={this.handleMenuIsOpen}>
          <span className={this.state.menuIsOpen ? 'nav-icon open' : 'nav-icon'}/>
        </div>

        <ul className={this.state.menuIsOpen ? 'item-holder show' : 'item-holder'}>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/'}>Home</NavLink></li>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/aboutus'}>About us</NavLink></li>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/signin'}>SignIn</NavLink></li>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/signup'}>SignUp</NavLink></li>
        </ul>

        <div className={'user-avatar'}>
          <img className={'avatar-img'} src={ this.state.avatar ? this.state.avatar : defaultAvatar }/>
        </div>

      </div>

    );
  }
}

export default Menu;
