import React from 'react';
import Menu from './Menu';

class Header extends React.Component{
  render(){
    return(
      <header>
        <div className={'header-content'}>
          <Menu/>
        </div>
      </header>
    );
  }
}

export default Header;