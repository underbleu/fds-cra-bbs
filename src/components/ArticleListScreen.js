import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import NavBar from './NavBar';
import * as moment from 'moment';
import 'moment/locale/ko';

// const mockData = [
//   {
//     articleId: "-LB1",
//     title: "제목1",
//     author: "김봉",
//     createdAt: "2018-01-22"
//   },
//   {
//     articleId: "-LB2",
//     title: "제목2",
//     author: "족요",
//     createdAt: "2018-01-22"
//   }
// ];

const ArticleItemRow = styled(Table.Row)`
  &:hover{
    cursor: pointer;
    background-color: beige;
  }
`

export default class ArticleListScreen extends Component {
  handleNewArticleClick = e => {
    this.props.onNewArticleClick();
  }
  
  render() {
    const {
      nickName, 
      onNickNameClick, 
      articleArr, 
      onArticleClick
    } = this.props;

    return <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <button onClick={this.handleNewArticleClick}>글쓰기</button>
        <Table>
          <Table.Header>
            <ArticleItemRow>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성일</Table.HeaderCell>
            </ArticleItemRow>
          </Table.Header>
          <Table.Body>
            { 
              Array.isArray(articleArr) && articleArr.length > 0
              ? articleArr.map(({ articleId, title, author, createdAt }) => (
              <ArticleItemRow key={articleId} onClick={e => onArticleClick(articleId)}>
                <Table.Cell>{author}</Table.Cell>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{moment(createdAt).locale('ko').fromNow()}</Table.Cell>
              </ArticleItemRow>
            ))
            : '게시글이 없습니다.'
             }
          </Table.Body>
        </Table>
      </div>
  }
}
