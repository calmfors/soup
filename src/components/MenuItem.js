import React from 'react';
import styled from 'styled-components';


const SoupContainer = styled.header`
  height: 40px;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

const SoupTitle = styled.h4`
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

function MenuItem(props) {
    return (
        <SoupContainer>
            <SoupTitle>{props.title}</SoupTitle>
            <Item />
        </SoupContainer>
    );
}

export default MenuItem;
