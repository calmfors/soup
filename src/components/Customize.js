import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import soups from '../soups.json';
import Drinks from './Drinks';

export const red = '#e3714f';
export const green = '#60c663';
// export const yellow = '#FFCC00';

const SoupTitle = styled.h1`
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0px 10px 0px 10px;
  margin-top: 10px;
  text-align:left;
  @media (min-width: 600px) {
    padding: 7px 10px 5px 0px;
  }
`;

const Description = styled.p`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px 0 10px;
  margin: 0 0 10px 0;
  line-height: 1.4rem;
  text-align: left;
  @media(min-width: 600px) {
    padding: 0;
    margin: 0 0 29px 0;
}
`;

const OrderButton = styled.button`
  position: fixed;
  bottom: 0;
  left:0;
  height: 50px;
  width: 100%;
  font-size: 1rem;
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
  text-align: left;
  font-family: ${props => props.width === "8" ? "sans-serif" : "'Rubik Mono One', sans-serif"};
  font-size: ${props => props.width === "8" && "1.5rem"};
  text-align:left;
  margin-top: ${props => props.width === "92" ? "6px" : "0"};
  width: ${props => props.width}%;
`;

const ToppingContainer = styled.button`
  width: 100%;
  text-align: left;
  display: ${props => props.hide ? "block" : "flex"};
  justify-content: space-between;
  align-content: center;
  color: ${props => props => props.hide ? "#fff" : props.choosen ? "#fff" : "#555"};
  margin-top: 8px;
  background-color: ${props => props.hide ? red : props.choosen ? green : "#efefef"};
  height: 30px;
  &:hover{
    background-color:${props => !props.hide && !props.choosen && `${green}66`};
  }
`;
const CustomizeContainer = styled.section`
@media(min-width: 600px) {
  display: inline-block;
  max-width: 290px;
  margin-top: 40px;
}
`;
const Rotate = styled.span`
  display: inline-block;
  margin-right:5px;
  color: #fff;
  transform: ${props => props.hide ? "rotate(90deg)" : "rotate(-90deg)"};
  transition-duration: 0.3s;
`;

const HideContainer = styled.section`
  height:auto;
  max-height: ${props => props.hide ? "200px" : "0px"};
  overflow: hidden;
  transition: max-height 0.2s ease-in;
  margin:0;
`

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
  const [hide, setHide] = useState(true);


  function handleClick(i) {
    if (!props.loginMenu) {
      let initialToppings = updateTopping;
      let initialNumberOfToppings = initialToppings.filter(topping => topping === true)
      setChangeButton(true)
      if (initialNumberOfToppings.length < 2) {
        updateTopping[i] = !updateTopping[i]
        setUpdateTopping(updateTopping)
        if (updateTopping[i]) setOrderMessage(`${toppings[i].name} added`)
        if (!updateTopping[i]) setOrderMessage(`${toppings[i].name} removed`)
      } else if (!initialToppings[i]) setOrderMessage(`Sorry, max two toppings`)
      if (initialNumberOfToppings.length > 1 && updateTopping[i] === true) {
        updateTopping[i] = !updateTopping[i]
        setOrderMessage(`${toppings[i].name} removed`)
      }
      let numberOfToppings = 0;
      updateTopping.map(topping => topping && numberOfToppings++)
      let message = `Add soup +${numberOfToppings} ${numberOfToppings > 1 ? "toppings" : "topping"}`
      if (numberOfToppings === 0) message = "Add soup +0 toppings"
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
    setChangeButton(true)
    let message = orderMessage
    if (i === null) setOrderMessage('Drink removed')
    else setOrderMessage('Drink added')
    setTimeout(
      function () {
        setChangeButton(false)
      }, 200)
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
        <SoupTitle>{props.choosenSoup.name}</SoupTitle>
        <Description>{props.choosenSoup.description}</Description>
        <ToppingContainer id={"toppings"} hide={true} onClick={() => { setHide(!hide); document.getElementById("toppings").blur() }}>
          <ToppingButton><Rotate hide={hide}>{'>'}</Rotate>Choose toppings</ToppingButton>
        </ToppingContainer>
        <HideContainer hide={hide}>
          {updateTopping.map((topping, i) =>
            <ToppingContainer id={i + "topping"} key={"a" + i} onClick={() => { document.getElementById(i + "topping").blur(); handleClick(i) }} choosen={topping} >
              <ToppingButton key={"b" + i} width="92" >{toppings[i].name}</ToppingButton>
              <ToppingButton key={"c" + i} width="8">{topping ? "–" : "+"}</ToppingButton>
            </ToppingContainer>
          )}
        </HideContainer>
        <Drinks selectedDrink={getDrinks} />
        <OrderButton toppingChange={changeButton} onClick={() => { !props.loginMenu && props.handleOrder(updateTopping, toppings, selectedDrink); setUpdateTopping(null) }}>{orderMessage}</OrderButton>
      </CustomizeContainer>
    </>
  );
}

export default Customize;
