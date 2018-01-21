import React, {Component} from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 100px;
    box-sizing: border-box;
    flex-direction: column;
`;

const Logo = styled.h1`
    font-size: 3em;
    color: salmon;
`;

const Button = styled.button`
    background-color: yellowgreen;
    color: white;
    border-radius: 10px;
    padding: 10px;
    font-weight: 700;

    &:hover{
        cursor: pointer;
        background-color: salmon;
    }
`;

export default class LoginScreen extends Component {
    handleLogInClick = e => {
        this.props.onLogInClick();
    }
    render() { 
        return (
            <Wrap>
                <Logo>BBS</Logo>
                <Button onClick={this.handleLogInClick}>구글로 로그인</Button>
            </Wrap>
        )
    }
}