import React, { useState } from 'react';
import styled from 'styled-components';
import check from '../graphics/check.svg';
// import { red, green, yellow } from "./Customize";

const red = '#e3714f';
const green = '#60c663';

const ToppingButton = styled.span`
  text-align: left;
  display: inline-block;
  padding-left: 10px;
  color: #fff;
`;

const ToppingContainer = styled.button`
  text-align: left;
  box-sizing:border-box;
  background-color:${red};
  width: 100%;
  border:0;
  padding:0;
  height: 30px;
  margin-top:10px;
`;
const Rotate = styled.span`
  display: inline-block;
  margin-right:5px;
  color: #fff;
  transform: ${props => props.hide ? "rotate(90deg)" : "rotate(-90deg)"};
  transition-duration: 0.3s;
`;
const DrinkOptions = styled.section`
  position: relative;
  display: flex;
  justify-content: space-around;
  height: ${props => props.hide ? "80px" : "0"};
  border-bottom: ${props => props.hide && `5px solid ${red}`};
  transition: height 0.2s ease-out;
  cursor: pointer;
  margin: ${props => props.hide ? "10px 0 20px 0" : "0"};
  padding: 0 10px 0 10px;
`
const DrinkImg = styled.img`
  height: 90%;
  opacity: ${props => props.hide ? "1" : "0"};
  transition: 0.2s;
  &:hover{
    transform: scale(1.2);
  }
`
const CheckContainer = styled.section`
  display: ${props => props.position && props.hide ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #fffa;
  left: ${props => props.position}px; 
  top: -5px;
  height: calc(100% + 5px);
  width: 62px;
`
const Check = styled.img`
  height:40px; 
`

function Drinks(props) {
  const [hide, setHide] = useState(false);
  const [checkPosition, setCheckPosition] = useState(null)
  const [selectedDrink, setSelectedDrink] = useState(null)
  const drinkArray = [
    { "name": "Bonaqua natural (33cl)", "img": 1 },
    { "name": "Bonaqua citrus (33cl)", "img": 2 },
    { "name": "Coca Cola (33cl)", "img": 3 },
    { "name": "Sprite (33cl)", "img": 4 },
    { "name": "Alcohol free beer (33cl)", "img": 5 }];

  function handleDrinks(i) {
    if (i === -1) {
      setSelectedDrink(null)
      setCheckPosition(null)
      props.selectedDrink(null)
    } else {
      setSelectedDrink(i)
      setCheckPosition(document.getElementById(i).offsetLeft - 5)
      props.selectedDrink(drinkArray[i].name)
    }
  }
  return (
    <>
      <ToppingContainer id={"drinks"} onClick={() => {
        setHide(!hide); document.getElementById("drinks").blur();
        setTimeout(
          function () {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }, 300)
      }}>
        <ToppingButton>
          <Rotate hide={hide}>{'>'}</Rotate>
          {'Add drink (+20 SEK)'}
        </ToppingButton>
      </ToppingContainer>
      <DrinkOptions hide={hide}>
        {drinkArray.map((drink, i) => <DrinkImg id={i + "options"} key={i} onClick={() => handleDrinks(i)}
          hide={hide} id={i} title={drink.name} alt={drink.name} src={`img/drinks/${i}.png`} />)}
        <CheckContainer hide={hide} position={checkPosition}>
          <Check src={check} onClick={() => handleDrinks(-1)} />
        </CheckContainer>

      </DrinkOptions>
    </>
  )
}
export default Drinks;