import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './scss/styles.scss';

import Header from './components/Header';
import Home from './components/pages/Home';
import About from './components/pages/About';
import AddVehicle from './components/pages/AddVehicle';
import ManageVehicles from './components/pages/ManageVehicles';
import Error from './components/pages/Error';

export default function App(){
  return(
    <div className="app">

      <Header/>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/addvehicle" component={AddVehicle}/>
        <Route exact path="/managevehicles" component={ManageVehicles}/>
        <Route component={Error}/>
      </Switch>

    </div> //app
  );
}
