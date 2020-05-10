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
          Nem találtam a képet a <br/> gogglén xd bhhhasszameg
        </div>
      </Page>
    );
  }
}

export default HomePage;