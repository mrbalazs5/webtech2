import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import './scss/styles.scss';
import withAuth from './utils/withAuth';
import roles from './utils/roles';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import VehiclesPage from './components/pages/VehiclesPage';
import ContactPage from './components/pages/ContactPage';
import AboutUsPage from './components/pages/AboutUsPage';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import ProfilePage from './components/pages/ProfilePage';
import AddVehiclePage from './components/pages/AddVehiclePage';
import ManageVehiclesPage from './components/pages/ManageVehiclesPage';
import ErrorPage from './components/pages/ErrorPage';

class App extends React.Component {
  render(){
    return(
      <div>

        <Helmet>
          <meta charSet={'utf-8'}/>
          <title>WebTech II.</title>
          <meta name={'description'} content={'WT2 Project'}/>
          <meta name={'backend'} content={'Balazs Megyeri'}/>
          <meta name={'frontend'} content={'Mark Sandor Pankotai'}/>
          <meta name={'testing'} content={'David Vass'}/>
          <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'}/>
        </Helmet>

        <Header/>

        <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <Route exact path={'/about-us'} component={AboutUsPage}/>
          <Route exact path={'/vehicles'} component={VehiclesPage}/>
          <Route exact path={'/contact'} component={ContactPage}/>
          <Route exact path={'/sign-in'} component={SignInPage}/>
          <Route exact path={'/sign-up'} component={SignUpPage}/>
          <Route exact path={'/profile'} component={withAuth(ProfilePage, roles.dealer)}/>
          <Route exact path={'/add-vehicle'} component={withAuth(AddVehiclePage, roles.dealer)}/>
          <Route exact path={'/manage-vehicles'} component={withAuth(ManageVehiclesPage, roles.dealer)}/>
          <Route component={ErrorPage}/>
        </Switch>

      </div>
    );
  }
}

export default App;
