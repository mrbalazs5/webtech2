import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './scss/styles.scss';

import Header from './components/Header';
import MainPage from './components/pages/MainPage';
import AboutUs from './components/pages/AboutUs';
import AddVehicle from './components/pages/AddVehicle';
import ManageVehicles from './components/pages/ManageVehicles';
import Error from './components/pages/Error';

function App(){
  return(
    <div className="app">

      <Header/>

      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/aboutus" component={AboutUs}/>
        <Route exact path="/addvehicle" component={AddVehicle}/>
        <Route exact path="/managevehicles" component={ManageVehicles}/>
        <Route component={Error}/>
      </Switch>

    </div>
  );
}

export default App;
