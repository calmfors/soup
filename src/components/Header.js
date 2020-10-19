import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import back from '../graphics/back.svg';
import profile from '../graphics/profile.svg';
import logo from '../graphics/logo_tomato.svg';
import ProfilePage from './Profile';


const HeaderContainer = styled.header`
  margin: 0 auto;
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: #fffe;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  left:0;
  padding-left: calc(50vw - 50%); 
  @media (min-width: 1300px) {
    padding:0;
    margin-left: calc(50vw - 50%);
    max-width: 1280px;
    left: 50%;
    transform: translate(-50%, 0);
   }
`;

const HeaderItem = styled.button`
  text-transform: uppercase; 
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  background: none;
  border: 0;
  padding: 0 10px 0 10px;
  display: flex;
  outline: ${props => props.show ? "1" : "0"};
`;

const Item = styled.img`
  margin-top: ${props => props.width === "12" ? "4" : "0"}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  visibility: ${props => props.show ? "visible" : "hidden"};
`;
const Logo = styled.img`
  width: 110px;
  margin-bottom:-15px;
`

function Header(props) {

  function logOutOrInListener(check) {
    props.check(check);
  }

  return (

    <HeaderContainer onClick={(e) => { e.stopPropagation() }}>
      <HeaderItem show={props.back} onClick={props.handleClick}>
        <Link to="/"><Item width="12" height="23" show={props.back} src={back} /></Link>
      </HeaderItem>
      <Link to="/"><Logo onClick={props.handleClick} src={logo} /></Link>
      {!props.hideProfile ?
        <HeaderItem show={true} onClick={props.handleLogin}>
          <Item width="25" show={true} src={profile} />
        </HeaderItem>
        : <Item width="45" />}
      {props.showLogin && <ProfilePage close={props.close} check={logOutOrInListener} />}
    </HeaderContainer>

  );
}

export default Header;
