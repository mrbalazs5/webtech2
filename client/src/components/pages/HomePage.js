import React from 'react';
import Page from '../Page';
import './HomePage.scss';
import mainimage from '../../images/bmw.jpg';
import SVG from '../SVG';

class HomePage extends React.Component{
  constructor(props){
    super(props);

    this.vehiclesRef = React.createRef();
    this.handleScrollToRef = this.handleScrollToRef.bind(this);
  }

  handleScrollToRef = () => {
    window.scrollTo(0, this.vehiclesRef.current.offsetTop)
  }

  render(){
    return(
      <Page location={this.props.location}>
        <div className={'homepage'}>
          <div className={'home-screen'}>
            <div className={'title-container'}>
              <div className={'title'}>
                Vehicle Portal <br/>...find your vehicle
                <div className={'scroll-arrow'} onClick={this.handleScrollToRef}>
                  <SVG name={'ARROW_TO_DOWN_ICON'} className={'scroll-icon'}/>
                </div>
              </div>
              
            </div>
          </div>
          <div className={'home-content'} ref={this.vehiclesRef}>
            HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>
            HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>
            HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>
            HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>
            HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>
            HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>HERE WILL BE THE CARS<br/>
            HERE WILL BE THE CARS<br/>
          </div>
        </div>
      </Page>
    );
  }
}

export default HomePage;