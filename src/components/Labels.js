import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from './firebase';

const LabelContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  width: 98%;
  height: 28px;
  top: 40px;
  background-color: #fffe;
  z-index:1;
  padding: 10px 5px 5px 5px;
  @media (min-width: 600px) {
    justify-content: center;
    max-width: 1350px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const Label = styled.button`
  height: 25px;
  font-family: 'Rubik Mono One', sans-serif;
  color: ${props => props.selected ? '#fff' : '#000'};
  background-color: ${props => props.selected ? '#6094AA' : '#FFCC00'};
  border:0;
  border-radius: 5px;  
  font-size: 0.6rem;
  @media (min-width: 600px) {
    margin:0 10px 0 10px;
  }
`;

function Labels(props) {
  const labelTitles = ['Vegetarian', 'Vegan', 'Chicken', 'Fish', 'Meat']
  return (
    <LabelContainer>
      {labelTitles.map((title, i) => <Label key={"d" + i} onClick={() => props.handleFilter(i)} selected={i === props.selected}>{title}</Label>)}
    </LabelContainer>
  );
}

export default Labels;
