import React from 'react';
import './Menu.scss';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';
import SVG from './SVG';
import roles from "../utils/roles";

class Menu extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      hamburgerMenu: false,
      profileMenu: false,
      adminMenu: false,
      user: null,
      avatar: defaultAvatar
    };

    this.handleHamburger = this.handleHamburger.bind(this);
    this.handleProfileMenu = this.handleProfileMenu.bind(this);
    this.handleAdminMenu = this.handleAdminMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    window.addEventListener("resize", this.handleResize);

    fetch('/api/check-token')
    .then((res) => {
      if(res.status === 200){
        return res.json();
      }
    })
    .then((res) => {
      if(res && res.user){
        this.setState({
          user: res.user
        });
        if(res.user.avatar){
          this.setState({
            avatar: res.user.avatar
          });
        }
      }
    });
  }

  logout = (e) => {
    e.preventDefault();
    fetch('/api/log-out', {
      method: 'POST'
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleResize = (e) => {
    const windowWidth = window.innerWidth;

    document.removeEventListener('click', this.handleProfileMenu);
    document.removeEventListener('click', this.handleAdminMenu);

    if(windowWidth >= 768){
      this.setState({
        hamburgerMenu: false,
        profileMenu: false,
        adminMenu: false
      });
    }
  }

  handleHamburger(){
    this.setState({
      hamburgerMenu: !this.state.hamburgerMenu
    });
    if(!this.state.hamburgerMenu){
      document.getElementsByTagName('body')[0].style.overflow='hidden';
    }else{
      document.getElementsByTagName('body')[0].style.overflow='auto';
    }
  }

  handleProfileMenu(){
    const windowWidth = window.innerWidth;

    this.setState({
      profileMenu: !this.state.profileMenu
    }, () => {
      if(windowWidth >= 768){
        if(this.state.profileMenu){
          document.addEventListener('click', this.handleProfileMenu);
        }else{
          document.removeEventListener('click', this.handleProfileMenu);
        }
      }
    });
  }

  handleAdminMenu(){
    const windowWidth = window.innerWidth;

    this.setState({
      adminMenu: !this.state.adminMenu
    }, () => {
      if(windowWidth >= 768){
        if(this.state.adminMenu){
          document.addEventListener('click', this.handleAdminMenu);
        }else{
          document.removeEventListener('click', this.handleAdminMenu);
        }
      }
    });
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleProfileMenu);
    document.removeEventListener('click', this.handleAdminMenu);
    window.removeEventListener("resize", this.handleResize);
  }

  render(){
    return(
      <nav className={'menu-wrapper'}>

        <div className={'hamburger'}>
          <div className={'hamburger-bg'} onClick={this.handleHamburger}>
            <span className={classNames('hamburger-icon', this.state.hamburgerMenu ? 'open' : '')}/>
          </div>
        </div>

        <div className={'avatar'} >
          <img className={classNames('avatar-img', this.state.profileMenu ? 'scaled' : '')} onClick={this.handleProfileMenu} src={this.state.avatar} alt={'avatar'}/> 
        </div>

        <div className={classNames('menu', this.state.hamburgerMenu ? 'showmenu' : '')}>
          <div className={'item-holder'}>
            <div className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/'}>Home</NavLink></div>
            <div className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/about-us'}>About Us</NavLink></div>
            {/*<div className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/vehicles'}>Vehicles</NavLink></div>
            *{ !this.state.user ? 
              <div className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/dealer/my-dealerships'}>My dealerships</NavLink></div>
            : ''}
            { !this.state.user ? 
            <div className={'item'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/dealer/my-vehicles'}>My vehicles</NavLink></div>
            : ''}*/}

            {this.state.user && this.state.user.role === roles.admin ? (
              <div className={'item'}>
              <div className={'navlink'} onClick={this.handleAdminMenu}>
                Admin
                <SVG name={'ARROW_DOWN_ICON'} className={classNames('menu-icon right', this.state.adminMenu ? 'rotate' : '')}></SVG>
              </div>
              <div className={classNames('admin-items', this.state.adminMenu ? 'showadmin' : '')}>
                <div className={'admin-items-wrapper'}>
                  <div className={'item admin'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/admin/makes'}>Makes</NavLink></div>
                  <div className={'item admin'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/admin/models'}>Models</NavLink></div>
                  <div className={'item admin'}><NavLink className={'navlink'} activeClassName={'active'} exact to={'/admin/users'}>Users</NavLink></div>
                </div>
              </div>
            </div>
            ) : ''}
            
           
            
            <div className={'item'}>
              <div className={classNames('profile-items', this.state.profileMenu ? 'showprofile' : '')}>
                <div className={'profile-items-wrapper'}>
                  {!this.state.user ? 
                    <div className={'item profile'}>
                      <NavLink className={'navlink'} activeClassName={'active'} exact to={'/sign-in'}>
                        <SVG name={'SIGN_IN_ICON'} className={'menu-icon left'}></SVG>
                        Sign In
                      </NavLink>
                    </div>
                  : ''}
                  {!this.state.user ? 
                    <div className={'item profile'}>
                      <NavLink className={'navlink'} activeClassName={'active'} exact to={'/sign-up'}>
                        <SVG name={'SIGN_UP_ICON'} className={'menu-icon left'}></SVG>
                        Sign Up
                      </NavLink>
                    </div>
                  : ''}
                  {/*{!this.state.user ?
                    <div className={'item profile'}>
                      <NavLink className={'navlink'} activeClassName={'active'} exact to={'/dealer/my-profile'}>
                        <SVG name={'PROFILE_ICON'} className={'menu-icon left'}></SVG>
                        My profile
                      </NavLink>
                    </div>
                  : ''}*/}
                  {/*{this.state.user ?*/}
                    {/*<div className={'item profile'}>*/}
                      {/*<NavLink className={'navlink'} activeClassName={'active'} exact to={'/settings'}>*/}
                        {/*<SVG name={'SETTINGS_ICON'} className={'menu-icon left'}></SVG>*/}
                        {/*Settings*/}
                      {/*</NavLink>*/}
                    {/*</div>*/}
                  {/*: ''}*/}
                  {this.state.user ?
                    <div className={'item profile'}>
                      <div className={'navlink'} onClick={this.logout}>
                        <SVG name={'SIGN_OUT_ICON'} className={'menu-icon left'}></SVG>
                        Sign Out
                      </div>
                    </div>
                  : ''}
                </div>
              </div>
            </div>

          </div>
        </div>

      </nav>
    );
  }
}

export default Menu;