import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import back from '../graphics/back.svg';
import profile from '../graphics/profile.svg';
import logo from '../graphics/logo_tomato.svg';
import Login from './Login';


const HeaderContainer = styled.header`
  margin: 0 auto;
  height: 40px;
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: #fffe;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  @media (min-width: 600px) {
    max-width: 1300px;
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
  padding: 5px;
  display: flex;
  outline: ${props => props.show ? "1" : "0"};
`;

const Item = styled.img`
  margin-top: ${props => props.width === "12" ? "4" : "0"}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  visibility: ${props => props.show ? "visible" : "hidden"};
`;

const ProfileMenu = styled.div`
background-color: #fffe;  
height: 150px;
  width: 200px;
  position: absolute;
  right:0;
  top:40px;
  box-shadow: -3px 3px 5px #7775;
  padding:5px;
`;
const Logo = styled.img`
  width: 110px;
  margin-bottom:-15px;
  margin-left:
`

function Header(props) {

  function logOutOrInListener(check) {
    console.log("From header")
    console.log(check)
    props.check(check);
  }

  console.log("propslogin: " + props.showLogin);

  return (

    <HeaderContainer onClick={(e) => { e.stopPropagation() }}>
      <HeaderItem show={props.back} onClick={props.handleClick}>{<Link to="/"><Item width="12" height="23" show={props.back} src={back} /></Link>}</HeaderItem>
      <Logo src={logo} />
      <HeaderItem show={true} onClick={props.handleLogin}><Item width="25" show={true} src={profile} /></HeaderItem>
      {props.showLogin && <ProfileMenu><Login check={logOutOrInListener} /></ProfileMenu>}
    </HeaderContainer>

  );
}

export default Header;
