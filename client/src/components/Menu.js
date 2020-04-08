import React from 'react';
import './Menu.scss';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import defaultAvatar from '../images/defaultAvatar.png';
import carlogo from '../images/car_wt.png';

class Menu extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      user: null,
      avatar: defaultAvatar,
      hamburgerIsOpen: false,
      dealerPanelIsOpen: false
    }
  }

  componentDidMount(){

    fetch('/api/check-token')
    .then((res) => {
      if(res.status === 200){
        return res.json();
      }
    })
    .then((res) => {
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
    .catch((error) => {
      console.log(error)
    });
  }

  handleHamburgerIsOpen = () => {
    this.setState({
      hamburgerIsOpen: !this.state.hamburgerIsOpen
    });
  }

  handleDealerPanelIsOpen = () => {
    this.setState({
      dealerPanelIsOpen: !this.state.dealerPanelIsOpen
    });
  }

  render(){
    return(
      <nav className={'navbar'}>

        <NavLink exact to={'/'}>
          <img className={'nav-logo'} src={ carlogo } alt={'WT2 logo'}/>
        </NavLink>

        <div className={'nav-avatar'}>
          <img className={'avatar'} src={ this.state.avatar ? this.state.avatar : this.state.avatar } alt={'avatar'}/>
        </div>

        <div className={'hamburger'}>
          <div className={'icon-bg'} onClick={ this.handleHamburgerIsOpen }>
           <span className={classNames('icon', this.state.hamburgerIsOpen ? 'open' : '' )}/>
          </div>
        </div>

        <div className={'arrows'}>
          <div className={'arrow-bg'} onClick={ this.handleDealerPanelIsOpen }>
           <span className={classNames('arrow', this.state.dealerPanelIsOpen ? 'openarrow' : '' )}/>
          </div>
        </div>

        <div className={classNames('menu', this.state.hamburgerIsOpen ? 'show': '' )}>
          <ul className={'user-panel'}>
            <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/'}>Home</NavLink></li>
            <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/about-us'}>About us</NavLink></li>
            <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/vehicles'}>Vehicles</NavLink></li>
            <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/contact'}>Contact</NavLink></li>
          </ul>

          <ul className={classNames('dealer-panel', this.state.dealerPanelIsOpen ? 'show' : '' )}>
            { this.state.user ? 
             <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/add-vehicle'}>Add vehicle</NavLink></li>
            : '' }
            {this.state.user ?
              <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/manage-vehicles'}>Manage vehicles</NavLink></li>
            : '' }
            
            <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/sign-in'}>Sign In</NavLink></li>
            <li className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/sign-up'}>Sign Up</NavLink></li>
          </ul>
        </div>

      </nav>
    );
  }
}

export default Menu;
