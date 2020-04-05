import React from 'react';
import './Menu.scss';
import {NavLink} from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';
import carlogo from '../images/car_wt.png';

class Menu extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      user: null,
      menuIsOpen: false,
      avatar: defaultAvatar
    }
  }

  componentDidMount(){

    fetch('/api/check-token')
    .then(res => {
      if(res.status === 200){
        return res.json();
      }
    })
    .then(res => {
      if(res.user){
        this.setState({
          user: res.user
        });
        if(res.user.avatar){
          this.setState({
            avatar: res.user.avatar
          });
        }
      }
    })
    .catch(error => {
      console.log(error)
    });
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

        <div className={'user-avatar'}>
          <img className={'avatar-img'} src={ this.state.avatar ? this.state.avatar : defaultAvatar }/>
        </div>

        <ul className={this.state.menuIsOpen ? 'item-holder left show' : 'item-holder left'}>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/'}>HOME</NavLink></li>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/aboutus'}>ABOUT US</NavLink></li>
        </ul>

        <ul className={this.state.menuIsOpen ? 'item-holder right show' : 'item-holder right'}>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/signin'}>Sign In</NavLink></li>
          <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/signup'}>Sign Up</NavLink></li>
        </ul>

      </div>

    );
  }
}

export default Menu;
