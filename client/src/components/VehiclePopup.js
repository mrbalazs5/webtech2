import React from 'react';
import Popup from './Popup';
import './VehiclePopup.scss';

export default function VehiclePopup(props) {
  const { vehicle } = props;
  if(!vehicle){
    return null;
  }

  return(
      <Popup onClose={props.onClose}>
        <div className={'vehicle-data'}>
            <img src={vehicle.image} />
            <h1>{vehicle.model.make.name + ' ' + vehicle.model.name}</h1>
            <div>Make: {vehicle.model.make.name}</div>
            <div>Model name: {vehicle.model.name}</div>
            <div>Price: {vehicle.price}</div>
            <div>
            Serviced: {
                vehicle.isServiced
                    ? (<span className={'tick'}>{'\u2714'}</span>)
                    : (<span className={'cross'}>{'\u2716'}</span>)
            }
            </div>
        </div>
      </Popup>
  );
}