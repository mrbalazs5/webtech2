import React from 'react';
import Page from '../Page';
import Forms from '../Forms';
import './MyProfilePage.scss';
import roles from "../../utils/roles";
import defaultAvatar from '../../images/defaultAvatar.png';
import {formatDate} from '../../utils/formatDate';



class MyProfilePage extends React.PureComponent{

    constructor(props){
      super(props);

      this.state = {
          user: null
      }
    }

    componentDidMount(){

        fetch('/api/check-token')
            .then((res) => {
                if(res.status === 200){
                    return res.json();
                }
            })
            .then((res) => {
              console.log(res);
                if(res.user){
                    this.setState({
                        user: res.user
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

  render(){
      const user = this.state.user;

      if (user == null) return null;

      return(
          <Page location={this.props.location}>
              <Forms>
                  <div className={'my-profile'}>
                      <div className={'avatar-wrapper'} >
                          <img
                              className={'avatar'}
                              src={user.avatar || defaultAvatar}
                              alt={'avatar'}
                          />
                      </div>
                      <h2>{user.name}</h2>
                      <h3>Email</h3>
                      <div>{user.email}</div>
                      <h3>Birth Date</h3>
                      <div>{formatDate(new Date(user.birthDate))}</div>
                      <h3>Role</h3>
                      <div>{Object.keys(roles).find(key => roles[key] === user.role)}</div>
                  </div>
              </Forms>
          </Page>
      );
  }

}

export default MyProfilePage;