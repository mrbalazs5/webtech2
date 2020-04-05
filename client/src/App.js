import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './scss/styles.scss';
import withAuth from './utils/withAuth';
import roles from './utils/roles';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import AboutUs from './components/pages/AboutUs';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import ProfilePage from './components/pages/ProfilePage';
import ErrorPage from './components/pages/ErrorPage';

class App extends React.Component {
  render(){
    return(
      <div>

        <Header/>

        <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <Route exact path={'/aboutus'} component={AboutUs}/>
          <Route exact path={'/signin'} component={SignInPage}/>
          <Route exact path={'/signup'} component={SignUpPage}/>
          <Route exact path={'/profile'} component={withAuth(ProfilePage, roles.dealer)}/>
          <Route component={ErrorPage}/>
        </Switch>

      </div>
    );
  }
}

export default App;
