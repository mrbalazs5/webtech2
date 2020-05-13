import React from 'react';
import Page from '../Page';
import './HomePage.scss';
import mainimage from '../../images/bmw.jpg';

class HomePage extends React.Component{
  render(){
    return(
      <Page>
        <img className={'bmw'} src={mainimage} alt={'bmw'}/>
        <div className={'title'}>
          Vehicle Portal <br/>...find your vehicle
        </div>
      </Page>
    );
  }
}

export default HomePage;