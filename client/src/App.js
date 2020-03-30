import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './scss/styles.scss';

import Header from './components/Header';
import MainPage from './components/pages/MainPage';
import AboutUs from './components/pages/AboutUs';
import AddVehicle from './components/pages/AddVehicle';
import ManageVehicles from './components/pages/ManageVehicles';
import Error from './components/pages/Error';
import withAuth from './utils/withAuth';
import roles from './utils/roles';
import Login from './components/forms/Login';
import Register from './components/forms/Register';

function App(){
  return(
    <div className="app">

      <Header/>

      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/aboutus" component={AboutUs}/>
        <Route exact path="/addvehicle" component={AddVehicle}/>
        <Route exact path="/managevehicles" component={ManageVehicles}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route component={Error}/>
      {/*<Route exact path='/profile' component={withAuth(ProfilePage, roles['dealer'])}/>*/}
      </Switch>

    </div>
  );
}

export default App;
