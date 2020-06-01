import React from 'react';
import Page from '../Page';

class AboutUsPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
          <h2>Webtech 2 assignment</h2>
          <p>Upload vehicles(cars, motorcycles, trucks, planes, boats) and manage them from the UI.</p>
          <p>Created by Megyeri Balázs, Pankotai Márk Sándor, Vass Dávid</p>
      </Page>
    );
  }
}

export default AboutUsPage;