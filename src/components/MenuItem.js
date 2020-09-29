import React from 'react';
import styled from 'styled-components';
import soups from '../soups.json';

const LabelBox = styled.section`
  position: absolute;
  left: 10px;
  top: 50px;
  
`;
const Label = styled.span`
  display:inline-block;
  margin-right: 10px;
  height: 13px;
  font-family: 'Rubik Mono One', sans-serif;
  padding:7px 6px 5px 6px;
  background-color: #FFCC00CC;
  border-radius: 5px;  
  font-size: 0.6rem;
`;

const SoupButton = styled.button`
  border:0;
  padding:0;
  height: 480px;
  width:100%;
  background-color: Transparent;
  margin-top:5px;
  @media (min-width: 600px) {
    margin: 20px;
    width:auto;
  }
`;

const SoupContainer = styled.div`
  position: relative;
  height: 480px;
  display: flex;
  flex-direction:column;
  text-align:left;
  @media (min-width: 600px) {
    max-width: 290px;
  }
`;

const SoupTitle = styled.p`
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  padding: 15px 10px 5px 10px;
  margin:0;
  @media (min-width: 600px) {
    padding: 15px 10px 5px 0px;
  }
`;

const Item = styled.img`
  height: 440px;
  object-fit: cover;
`;

const Price = styled.p`
  position: absolute;
  right: 10px;
  bottom: 10px;
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  background: #fff7;
  border: 0;
  padding: 5px;
  margin:0;
  border-radius:4px;
`
const Order = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 20px;
  bottom: 20px;
  height: 110px;
  width: 110px;
  text-align:center;
  background: #E05A33CC;
  padding: 5px;
  margin: 0;
  border-radius: 110px;
  box-shadow: 0 0 10px #5557;
`
const OrderText = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 0.8rem;
  color: #fff;
`

function MenuItem(props) {
  const labelTitles = ['vegetarian', 'vegan', 'chicken', 'fish', 'meat'];
  return (
    <SoupButton onClick={props.click}>
      <SoupContainer>
        <SoupTitle>{props.title}</SoupTitle>
        <Item src={props.src} />
        <LabelBox>
          {labelTitles.map((title, i) => props.categories.includes(title) && <Label key={i}>{title}</Label>)}
        </LabelBox>
        <Price>{props.price}</Price>
        <Order><OrderText>{props.customize ? "Choose your favourite toppings!" : "Click to customize & order!"}</OrderText></Order>
      </SoupContainer>
    </SoupButton>
  );
}

export default MenuItem;
