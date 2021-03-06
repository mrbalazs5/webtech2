import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import './scss/styles.scss';
import withAuth from './utils/withAuth';
import roles from './utils/roles';
import Header from './components/Header';
import SignInPage from './components/pages/SignInPage';
import UsersPage from './components/pages/UsersPage';
import MakesPage from './components/pages/MakesPage';
import ModelsPage from './components/pages/ModelsPage';
import SignUpPage from './components/pages/SignUpPage';
import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import VehiclesPage from './components/pages/VehiclesPage';
import MyProfilePage from './components/pages/MyProfilePage';
import SettingsPage from './components/pages/SettingsPage';
import MyVehiclesPage from './components/pages/MyVehiclesPage';
import MyDealershipsPage from './components/dealer/MyDealershipsPage';
import ErrorPage from './components/pages/ErrorPage';
import AddModelPage from './components/pages/AddModelPage';
import AddDealershipPage from './components/dealer/AddDealershipPage';

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
          <Route exact path={'/sign-in'} component={SignInPage}/>
          <Route exact path={'/sign-up'} component={SignUpPage}/>
          <Route exact path={'/vehicles'} component={VehiclesPage}/>
          <Route exact path={'/dealer/my-profile'} component={withAuth(MyProfilePage, roles.dealer)}/>
          <Route exact path={'/dealer/settings'} component={withAuth(SettingsPage, roles.dealer)}/>
          <Route exact path={'/dealer/my-vehicles'} component={withAuth(MyVehiclesPage, roles.dealer)}/>
          <Route exact path={'/dealer/my-dealerships'} component={withAuth(MyDealershipsPage, roles.dealer)}/>
          <Route exact path={'/dealer/add-dealership'} component={withAuth(AddDealershipPage, roles.dealer)}/>
          <Route exact path={'/admin/users'} component={withAuth(UsersPage, roles.admin)}/>
          <Route exact path={'/admin/models'} component={withAuth(ModelsPage, roles.admin)}/>
          <Route exact path={'/admin/add-model'} component={withAuth(AddModelPage, roles.admin)}/>
          <Route exact path={'/admin/makes'} component={withAuth(MakesPage, roles.admin)}/>
          <Route component={ErrorPage}/>
        </Switch>

      </div>
    );
  }
}

export default App;
