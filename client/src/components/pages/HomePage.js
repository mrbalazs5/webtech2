import React from 'react';
import Page from '../Page';
import './HomePage.scss';
import SVG from '../SVG';
import defaultImage from '../../images/bmw.jpg';
import VehiclePopup from '../VehiclePopup';

class HomePage extends React.PureComponent{
  constructor(){
    super();
    this.vehiclesRef = React.createRef();
    this.handleScrollToRef = this.handleScrollToRef.bind(this);

    this.state = {
      activeVehicle: null,
      vehicles: []
    };

    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(){
      this.setState({
          activeVehicle: null
      });
  }

  componentDidMount(){

    this.setState({
        vehicles: [
            {model: {name: 'Leon', make: {name: 'Seat'}}, image: defaultImage},
            {model: {name: 'Civic', make: {name: 'Honda'}}, image: defaultImage},
            {model: {name: 'Focus', make: {name: 'Ford'}}, image: defaultImage},
            {model: {name: 'Swift', make: {name: 'Suzuki'}}, image: defaultImage},
            {model: {name: 'Passat', make: {name: 'Volkswagen'}}, image: defaultImage},
            {model: {name: 'Passat', make: {name: 'Volkswagen'}}, image: defaultImage},
            {model: {name: 'Passat', make: {name: 'Volkswagen'}}, image: defaultImage},
            {model: {name: 'Passat', make: {name: 'Volkswagen'}}, image: defaultImage},
            {model: {name: 'Passat', make: {name: 'Volkswagen'}}, image: defaultImage},
            {model: {name: 'Passat', make: {name: 'Volkswagen'}}, image: defaultImage},
            {model: {name: 'Civic', make: {name: 'Honda'}}, image: defaultImage},
            {model: {name: 'Civic', make: {name: 'Honda'}}, image: defaultImage},
            {model: {name: 'Civic', make: {name: 'Honda'}}, image: defaultImage},
            {model: {name: 'Civic', make: {name: 'Honda'}}, image: defaultImage},
            {model: {name: 'Civic', make: {name: 'Honda'}}, image: defaultImage},
            {model: {name: 'Civic', make: {name: 'Honda'}}, image: defaultImage},
            {model: {name: 'Focus', make: {name: 'Ford'}}, image: defaultImage},
            {model: {name: 'Focus', make: {name: 'Ford'}}, image: defaultImage},
            {model: {name: 'Focus', make: {name: 'Ford'}}, image: defaultImage},
            {model: {name: 'Focus', make: {name: 'Ford'}}, image: defaultImage}
        ]
    });

  }

  handleScrollToRef = () => {
    window.scrollTo(0, this.vehiclesRef.current.offsetTop)
  };

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
            <div className={'vehicles'}>
                {
                    this.state.vehicles.map((vehicle, index) => {

                      const vehicleMakeName = vehicle.model && vehicle.model.make ? vehicle.model.make.name : '';
                      const vehicleName = vehicle.model ? vehicle.model.name : '';

                      return(
                          <div key={index} className={'vehicle'} onClick={() => {this.setState({activeVehicle: vehicle})}}>
                              <div className={'image-wrapper'}>
                                <div className={'image'}>
                                    <img src={vehicle.image}/>
                                </div>
                              </div>
                              <h2>{`${vehicleMakeName} ${vehicleName}`}</h2>
                          </div>
                      );

                    })
                }
            </div>
          </div>
          <VehiclePopup vehicle={this.state.activeVehicle} onClose={this.closePopup}/>
        </div>
      </Page>
    );
  }
}

export default HomePage;