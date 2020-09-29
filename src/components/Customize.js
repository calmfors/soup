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
  font-family: 'Rubik', sans-serif;;
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
    const [updateTopping, setUpdateTopping] = useState(0);
    const [orderMessage, setOrderMessage] = useState("Order soup +0 toppings");
    const [soup, setSoup] = useState(props.choosenSoup);
    const [toppings, setToppings] = useState([
        { "name": "sunflower seeds", "choosen": false },
        { "name": "pumpkin seeds", "choosen": false },
        { "name": "chili flakes", "choosen": false },
        { "name": "coconut flakes", "choosen": false },
        { "name": "cheese", "choosen": false }
    ]);


    function handleClick(i) {
        const choosenToppings = toppings
        choosenToppings[i].choosen = !toppings[i].choosen;
        setToppings(choosenToppings)
        if (choosenToppings[i].choosen) setOrderMessage(`${choosenToppings[i].name} added`)
        if (!choosenToppings[i].choosen) setOrderMessage(`${choosenToppings[i].name} removed`)
        let numberOfToppings = 0;
        choosenToppings.map(item => item.choosen && numberOfToppings++)
        let message = `Order soup +${numberOfToppings} ${numberOfToppings > 1 ? "toppings" : "topping"}`
        if (numberOfToppings === 0) message = "Order soup +0 toppings"
        setTimeout(
            function () {
                setOrderMessage(message)
                setUpdateTopping(updateTopping + 1)
            }, 1000)
    }

    function handleOrder() {
        const choosenToppings = toppings.filter(topping => topping.choosen === true)
        console.log(choosenToppings)
        let choosenToppingsArray = [];
        choosenToppings.map(topping => choosenToppingsArray.push(topping.name));
        soup.toppings = choosenToppingsArray
        console.log(soup)
    }
    return (
        <>
            <MenuItem customize={true} categories={labels.filter(label => props.choosenSoup.filter.includes(label))}
                title={props.choosenSoup.name} src={props.src} price={props.choosenSoup.price + " kr"} />
            <CustomizeContainer>

                <Description>Butternut squash soup is like a golden pop of sunshine and comfort on a cold day. This soup with sweet apples, garlic, and thyme is the perfect cozy, light dinner.</Description>
                {toppings.map((topping, i) =>
                    <ToppingContainer key={"a" + i} choosen={topping.choosen} >
                        <ToppingButton key={"b" + i} onClick={() => handleClick(i)} width="90" >{topping.name}</ToppingButton>
                        <ToppingButton key={"c" + i} onClick={() => handleClick(i)} width="10">{updateTopping && topping.choosen ? "–" : "+"}</ToppingButton>
                    </ToppingContainer>
                )}
                <OrderButton onClick={handleOrder}>{orderMessage}</OrderButton>
                <ToppingContainer style={{ "backgroundColor": "#fff", "height": "45px" }}></ToppingContainer>
            </CustomizeContainer>

        </>
    );
}

export default Customize;
