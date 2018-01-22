import React, {Component} from 'react';
import * as firebase from 'firebase';
import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';
import ArticleScreen from './ArticleScreen';

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
        this.fetchArticles();
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
  fetchArticles = async () => {
    const snapshot = await firebase.database().ref(`articles`).once('value');
    const articlesObj = snapshot.val();
    if(articlesObj == null){
      this.setState({
        articles: null
      });
    } else {
      const articles = Object.entries(articlesObj).map(([articleId, articleItem]) => {
        return {
          ...articleItem,
          articleId,
        };
      });
      const uidSet = new Set(articles.map(({uid}) => uid));
      const uidObj = {};
      const ps = Array.from(uidSet).map(async uid => {
        const snapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
        const nickName = snapshot.val();
        return [uid, nickName];
      })
      const pairArr = await Promise.all(ps);
      for(const [uid, nickName] of pairArr){
        uidObj[uid] = nickName;
      }
      // for (const uid of uidArr) {
      //   const nickNameSnapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
      //   const nickName = nickNameSnapshot.val();
      //   uidObj[uid] = nickName;
      // }
      articles.forEach(article => {
        article.author = uidObj[article.uid];
      })
      this.setState({
        articles
      });
    }
  } 
  viewArticle = async articleId => {
    const [articleSnapshot, contentSnapshot] = await Promise.all([
      firebase.database().ref(`articles/${articleId}`).once('value'),
      firebase.database().ref(`contents/${articleId}`).once('value')
    ]);
    const article = articleSnapshot.val();
    const content = contentSnapshot.val();
    this.setState({
      currentArticle: {
        ...article,
        content
      },
      page: 'article'
    })
  }
  render() {
    const {nickName, uid, articles, currentArticle} = this.state;
    return <div>
        {this.state.page === "login" ? (
          <LoginScreen />
        ) : this.state.page === "list" ? (
          <ArticleListScreen
            onNickNameClick={this.pageToAccount}
            onArticleClick={this.viewArticle}
            nickName={nickName || uid}
            articleArr={articles}
          />
        ) : this.state.page === "account" ? (
          <AccountScreen
            onNickNameClick={this.pageToAccount}
            nickName={nickName || uid}
            onNickNameSubmit={this.saveNickName}
          />
        ) : this.state.page === "article" ? (
          <ArticleScreen 
            {...currentArticle} 
            nickName={nickName || uid}
            onNickNameClick={this.pageToAccount}
          />
        ) : null}
      </div>;
  }
}
