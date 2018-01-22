import React, {Component} from 'react';
import * as firebase from 'firebase';

import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';

export default class BBS extends Component {
  state = {
    page: 'login'
  }
  pageToAccount = () => {
    this.setState({
      page: 'account'
    });
  }
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBU_1iDe46dKqNJBCjNHjB2u9zY_-HBhvA",
      authDomain: "fds-cra-c0094.firebaseapp.com",
      databaseURL: "https://fds-cra-c0094.firebaseio.com",
      projectId: "fds-cra-c0094",
      storageBucket: "fds-cra-c0094.appspot.com",
      messagingSenderId: "497087072093"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const snapshot = await firebase.database().ref(`users/${user.uid}/nickName`).once('value');
        console.log(snapshot.val());
        this.setState({
          page: 'list',
          uid: user.uid,
          nickName: snapshot.val()
        });
      } else {
        this.setState({
          page: 'login'
        });
      }
    });
  }
  saveNickName = async nickName => {
    const {uid} = this.state;
    await firebase.database().ref(`users/${uid}/nickName`).set(nickName);
    this.setState({
      nickName,
      page: 'list'
    });
  }
  render() {
    const {nickName, uid} = this.state;
    return (
      <div>
        {
          this.state.page === 'login'
          ? <LoginScreen />
          : this.state.page === 'list'
          ? <ArticleListScreen 
              onNickNameClick={this.pageToAccount} 
              nickName={nickName || uid} />
          : this.state.page === 'account'
          ? <AccountScreen 
              onNickNameClick={this.pageToAccount} 
              nickName={nickName || uid}
              onNickNameSubmit={this.saveNickName} />
          : null
        }

      </div>
    )
  }
}
