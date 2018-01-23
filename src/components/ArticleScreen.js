import React, {Component} from 'react';
import NavBar from './NavBar';

export default class ArticleScreen extends Component{
    render(){
        const { 
            nickName, 
            onNickNameClick, 
            title, 
            content 
        } = this.props;
        
        return(
            <div>
                <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
                <div>title: {title}</div>
                <div>content: {content}</div>
            </div>
        )
    }
}