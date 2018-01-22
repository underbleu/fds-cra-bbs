import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import NavBar from './NavBar';

const mockData = [
  {
    articleId: "-LB1",
    title: "제목1",
    author: "김봉",
    createdAt: "2018-01-22"
  },
  {
    articleId: "-LB2",
    title: "제목2",
    author: "족요",
    createdAt: "2018-01-22"
  }
];

const ArticleItemRow = styled(Table.Row)`
  &:hover{
    cursor: pointer;
    background-color: beige;
  }
`

export default class ArticleListScreen extends Component {
  render() {
    const {nickName, onNickNameClick} = this.props;
    return <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <Table>
          <Table.Header>
            <ArticleItemRow>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성일</Table.HeaderCell>
            </ArticleItemRow>
          </Table.Header>
          <Table.Body>
            {mockData.map(({ articleId, title, author, createdAt }) => (
              <ArticleItemRow key={articleId}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{author}</Table.Cell>
                <Table.Cell>{createdAt}</Table.Cell>
              </ArticleItemRow>
            ))}
          </Table.Body>
        </Table>
      </div>;
  }
}
