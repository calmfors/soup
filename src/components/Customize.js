import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import Header from './Header';
import firebase from './firebase';
import soups from '../soups.json'

const Description = styled.p`
  box-sizing: border-box;
  width: 100%;
  padding:0 10px 0 10px;
  font-family: 'Rubik', sans-serif;
  text-align:left;
  @media(min-width: 600px) {
    padding: 0;
}
`;

const OrderButton = styled.button`
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  position: fixed;
  bottom: 0;
  left:0;
  border:0;
  height: 50px;
  width: 100%;
  color: #fff;
  background-color: #6094AA;
  @media(min-width: 600px) {
    max-width: 600px;
    bottom: 50px;
     left: 50%;
    transform: translate(-50%, 0);
    margin-left: 10px;
  }
`;

const ToppingButton = styled.span`
  display: inline-block;
  font-family: ${props => props.width === "10" ? "sans-serif" : "'Rubik Mono One', sans-serif"};
  font-size: ${props => props.width === "10" && "2.3rem"};
  text-align:left;
  margin-top: ${props => props.width === "90" ? "16px" : "2px"};
  width: ${props => props.width}%;
  padding-left: 10px;
`;

const ToppingContainer = styled.button`
  width: 100%;
  display:flex;
  border:0;
  justify-content: space-between;
  align-content: center;
  font-family: 'Rubik Mono One', sans-serif;
  margin-top: 5px;
  margin-bottom: 5px;
  padding:0;
  background-color: ${props => props.choosen ? "#FFCC00" : "#FFCC0077"};
  height: 50px;
`;
const CustomizeContainer = styled.section`
@media(min-width: 600px) {
  display:inline-block;
  max-width: 290px;
  margin-top: 40px;
}
`

function Customize(props) {
  const labels = ['vegetarian', 'vegan', 'chicken', 'fish', 'meat'];
  const [orderMessage, setOrderMessage] = useState("Order soup +0 toppings");
  const [soup, setSoup] = useState(props.choosenSoup);
  const toppings = [
    { "name": "sunflower seeds", "choosen": false },
    { "name": "pumpkin seeds", "choosen": false },
    { "name": "chili flakes", "choosen": false },
    { "name": "coconut flakes", "choosen": false },
    { "name": "cheese", "choosen": false }
  ];
  let toppingArray = []
  toppings.map(topping => toppingArray.push(topping.choosen))
  const [updateTopping, setUpdateTopping] = useState(toppingArray);

  function handleClick(i) {
    updateTopping[i] = !updateTopping[i]
    setUpdateTopping(updateTopping)
    if (updateTopping[i]) setOrderMessage(`${toppings[i].name} added`)
    if (!updateTopping[i]) setOrderMessage(`${toppings[i].name} removed`)
    let numberOfToppings = 0;
    updateTopping.map(topping => topping && numberOfToppings++)
    let message = `Order soup +${numberOfToppings} ${numberOfToppings > 1 ? "toppings" : "topping"}`
    if (numberOfToppings === 0) message = "Order soup +0 toppings"
    setTimeout(
      function () {
        setOrderMessage(message)
      }, 1000)
  }



  return (
    <>
      <MenuItem customize={true} categories={labels.filter(label => props.choosenSoup.filter.includes(label))}
        title={props.choosenSoup.name} src={props.src} price={props.choosenSoup.price + " kr"} />
      <CustomizeContainer>

        <Description>Butternut squash soup is like a golden pop of sunshine and comfort on a cold day. This soup with sweet apples, garlic, and thyme is the perfect cozy, light dinner.</Description>
        {updateTopping.map((topping, i) =>
          <ToppingContainer key={"a" + i} choosen={topping} >
            <ToppingButton key={"b" + i} onClick={() => handleClick(i)} width="90" >{toppings[i].name}</ToppingButton>
            <ToppingButton key={"c" + i} onClick={() => handleClick(i)} width="10">{topping ? "–" : "+"}</ToppingButton>
          </ToppingContainer>
        )}
        <OrderButton onClick={() => props.handleOrder(updateTopping, toppings)}>{orderMessage}</OrderButton>
      </CustomizeContainer>

    </>
  );
}

export default Customize;
