import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import soups from '../soups.json';
import Drinks from './Drinks';

const Description = styled.p`
  box-sizing: border-box;
  width: 100%;
  padding:0 10px 0 10px;
  margin: 15px 0 15px 0;
  line-height: 1.4rem;
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
  background-color: ${props => props.toppingChange ? "#77b6d1" : "#6094AA"};
  transition-duration: 0.1s;
  &:hover{
    background-image: radial-gradient(#81adbf, #6094AA);
  } 
  @media(min-width: 600px) {
    max-width: 600px;
    left: 50%;
    transform: translate(-50%, 0);
    margin-left: calc(100vw - 100%);
  }
`;

const ToppingButton = styled.span`
  display: inline-block;
  font-family: ${props => props.width === "10" ? "sans-serif" : "'Rubik Mono One', sans-serif"};
  font-size: ${props => props.width === "10" && "2rem"};
  text-align:left;
  margin-top: ${props => props.width === "90" ? "11px" : "0"};
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
  height: 36px;
`;
const CustomizeContainer = styled.section`
@media(min-width: 600px) {
  display:inline-block;
  max-width: 290px;
  margin-top: 40px;
}
`;

function Customize(props) {
  const labels = props.labels;
  const [orderMessage, setOrderMessage] = useState("Add soup +0 toppings");
  const allToppings = []
  const tempToppings = []
  soups.forEach(soup => {
    soup.toppings.forEach(topping => {
      if (!tempToppings.includes(topping)) tempToppings.push(topping)
    })
  })
  tempToppings.forEach(topping => {
    allToppings.push({ "name": topping, "choosen": false })
  })
  let toppings = allToppings.filter(topping => props.choosenSoup.toppings.includes(topping.name))
  let toppingArray = []
  toppings.filter(topping => toppingArray.push(topping.choosen))
  const [updateTopping, setUpdateTopping] = useState(toppingArray);
  const [changeButton, setChangeButton] = useState(false)
  const [selectedDrink, setSelectedDrink] = useState(null)


  function handleClick(i) {
    if (!props.loginMenu) {
      setChangeButton(true)
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
          setChangeButton(false)
        }, 200)
      setTimeout(
        function () {
          setOrderMessage(message)
        }, 1000)
    }
  }

  function getDrinks(i) {
    setSelectedDrink(i)
    console.log(i)
  }

  return (
    <>
      <MenuItem customize={true} categories={labels.filter(label => props.choosenSoup.filter.includes(label))}
        title={props.choosenSoup.name} src={props.src} price={props.choosenSoup.price + " kr"} />
      <CustomizeContainer>
        <Description>{props.choosenSoup.description}</Description>
        <Drinks selectedDrink={getDrinks} />
        {updateTopping.map((topping, i) =>
          <ToppingContainer key={"a" + i} choosen={topping} >
            <ToppingButton key={"b" + i} onClick={() => handleClick(i)} width="90" >{toppings[i].name}</ToppingButton>
            <ToppingButton key={"c" + i} onClick={() => handleClick(i)} width="10">{topping ? "–" : "+"}</ToppingButton>
          </ToppingContainer>
        )}
        <OrderButton toppingChange={changeButton} onClick={() => { !props.loginMenu && props.handleOrder(updateTopping, toppings, selectedDrink); setUpdateTopping(null) }}>{orderMessage}</OrderButton>
      </CustomizeContainer>

    </>
  );
}

export default Customize;
