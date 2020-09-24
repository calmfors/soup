import React from 'react';
import styled from 'styled-components';
import back from '../graphics/back.svg';
import profile from '../graphics/profile.svg';


const HeaderContainer = styled.header`
  height: 40px;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

const HeaderItem = styled.button`
  text-transform: uppercase; 
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  background: none;
  border: 0;
  padding: 10px;
  display: flex;
`;

const Item = styled.img`
  height: 20px;
`;

function Header(props) {
  return (
    <HeaderContainer>
      <HeaderItem><Item src={back} /></HeaderItem>
      <HeaderItem>{props.text}</HeaderItem>
      <HeaderItem><Item src={profile} /></HeaderItem>
    </HeaderContainer>
  );
}

export default Header;
