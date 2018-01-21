import React, {Component} from 'react'; // Library
import * as firebase from 'firebase';
import LoginScreen from './LoginScreen'; // ./ -> Component
import ArticleListScreen from './ArticleListScreen';

export default class BBS extends Component {
    state = {
        page: 'login'
    }

    componentDidMount(){
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC18ADhYDhnHLrMa9-Jo3SjX3URN3lop8Y",
            authDomain: "fds-firebase-storage-22421.firebaseapp.com",
            databaseURL: "https://fds-firebase-storage-22421.firebaseio.com",
            projectId: "fds-firebase-storage-22421",
            storageBucket: "fds-firebase-storage-22421.appspot.com",
            messagingSenderId: "1032919680563"
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(user => { //funtion(){} -> 화살표함수 = this전역객체 -> 자신이 속한객체
          if (user) {
            this.setState({
                page: 'list'
            });
        } else {
            this.setState({
                page: 'login'
            });
          }
        });
    }

    handleLogInClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    handleLogOutClick = () => {
        firebase.auth().signOut();
    }

    render(){
        return (
            <div>
                {
                    this.state.page === 'login'
                        ? <LoginScreen onLogInClick={this.handleLogInClick}/>
                        : this.state.page === 'list'
                        ? <ArticleListScreen onLogOutClick={this.handleLogOutClick}/>
                        : null
                }
           
            </div>    
        )
    }
}