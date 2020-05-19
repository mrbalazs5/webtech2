import React from 'react';
import Popup from './Popup';
import './SpecificationPopup.scss';

class SpecificationPopup extends React.Component {
  render(){

    if(!this.props.seria){
      return null;
    }

    const seria = this.props.seria;

    return(
      <Popup onClose={this.props.onClose}>
        <div className={'spec'}>
          <div className={'spec-item'}>Seria: {seria.name}</div>
          <div className={'spec-item'}>Engine: {seria.specification.engine}</div>
          <div className={'spec-item'}>Engine Power: {seria.specification.enginePower}</div>
          <div className={'spec-item'}>Gear Type: {seria.specification.gearType}</div>
          <div className={'spec-item'}>Number of Gears: {seria.specification.numberOfGears}</div>
          <div className={'spec-item'}>Number of Wheels: {seria.specification.numberOfWheels}</div>
          <div className={'spec-item'}>Width: {seria.specification.width}</div>
          <div className={'spec-item'}>Lenght: {seria.specification.length}</div>
          <div className={'spec-item'}>Seating Capacity: {seria.specification.seatingCapacity}</div>
          <div className={'spec-item'}>Max Speed: {seria.specification.maxSpeed}</div>
          <div className={'spec-item'}>Full Weight: {seria.specification.fullWeight}</div>
          <div className={'spec-item'}>Fuel Capacity: {seria.specification.fuelCapacity}</div>
          <div className={'spec-item'}>Fuel Consumption: {seria.specification.fuelConsumption}</div>
        </div>
      </Popup>
    );
  }
}

export default SpecificationPopup;