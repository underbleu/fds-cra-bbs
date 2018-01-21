import React, {Component} from 'react';

export default class ArticleListScreen extends Component{
    handelLogOutClick = e => {
        this.props.onLogOutClick();
    }

    render(){
        return(
            <div>
                게시글 목록
                <button onClick={this.handelLogOutClick}>Logout</button>
            </div>
        )
    }
}