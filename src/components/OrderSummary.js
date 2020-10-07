import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  transition-duration:0.5s;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom:${props => props.position ? "50px" : "-350px"};
  left:0;
  z-index:-1;  
  width: 100%;
  background-color: #6094AA;
  height:auto;
  max-height:400px;
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    flex-wrap: wrap;
  }
`
const Summary = styled.section`
  overflow: auto;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  height: calc(100% - 50px);
  max-height:390px;
  width:100%;
  background-color: #fff;
  border-radius: 5px;
`;

const OrderThumb = styled.section`
  width:calc(100% - 20px);
  display: flex;
  align-items: ${props => props.total && "center"};
  height:${props => props.total ? "50px" : "70px"};
  margin:10px;
  border-bottom: ${props => props.total ? "none" : "1px solid grey"};
  text-align: left;
`
const OrderImg = styled.img`
  display:inline;
  margin-right: 10px;
  width: 70px;
  height: 60px;
  object-fit: cover;
  object-position: center;
`
const OrderText = styled.p`
  width:calc(100% - 90px);
  margin:0;
  font-size:0.9rem;
  line-height:1.2rem;
`
const Close = styled(OrderText)`
 font-size:1.2rem;
 color: red;
 width: 10px;
 height:10px; 
 cursor: pointer;
 &:hover{
   font-weight: bold; 
 }
`

const PlaceOrder = styled.button`
  margin:0;
  width:60%;
  height: 30px;
  background-color: #FFCC00;
  border:none;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 0.8rem;
   &:hover{
    background-image: radial-gradient(#ffe066, #FFCC00);
  }
`


const Alert = styled.div`
  position:absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  height: 83px;
  width:calc(100% - 20px);
  background-color: #6094AAdd;  
`
const AlertButton = styled.button`
  display:inline-block;
  font-family: 'Rubik', sans-serif;
  color:white;
  width:25%;
  font-size:1rem;
  border:none;
  background-color: Transparent;
`
const AlertText = styled.p`
  margin:15px 10px 10px 10px;
  font-family: 'Rubik', sans-serif;
  color:white;
  width: calc(100% - 20px);
  font-size:1rem;
`

function OrderSummary(props) {
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('localSoups')));
  const [popup, setPopup] = useState(false);
  const [itemToBeRemoved, setItemToBeRemoved] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  let total = 0
  order.map(orderItem => total += parseInt(orderItem.price))

  function removeItem(i) {
    const clickedSection = document.getElementById(i)
    setCoordinates({
      left: clickedSection.offsetLeft,
      top: clickedSection.offsetTop
    })
    setItemToBeRemoved(i, coordinates)
    setPopup(true);
    console.log("Do you really want to remove " + order[i].name + "?")
  }

  function handleRemove() {
    setPopup(false);
    let tempOrder = order;
    tempOrder.splice(itemToBeRemoved, 1)
    setOrder(tempOrder);
    setItemToBeRemoved(null);
    props.isItemRemoved(itemToBeRemoved)
  }
  return (
    <>
      <div>
        <Wrapper position={props.position}>
          <Summary>
            {order.map((orderItem, i) =>
              <OrderThumb key={i + "a"} id={i}>
                <OrderImg src={orderItem.img}></OrderImg>
                <OrderText>{orderItem.name} with {orderItem.toppings.length > 0 ? orderItem.toppings.map(topping => topping + ", ") : orderItem[0] ? orderItem[0] : "no topping"}<br /> {orderItem.price} kr</OrderText>
                <Close onClick={() => removeItem(i)}>×</Close>
              </OrderThumb>
            )}
            <OrderThumb total="true">

              <OrderText style={{ "fontWeight": "bold" }}>TOTAL: {total} kr </OrderText>
              <PlaceOrder><Link to={
                {
                  pathname: '/delivery',
                  state: {
                    loggedIn: props.loggedIn
                  }
                }
              }>Place order</Link></PlaceOrder>
            </OrderThumb>
          </Summary>
          {popup &&
            <Alert left={coordinates.left - 10} top={coordinates.top - 12}>
              <AlertText>Remove {order[itemToBeRemoved].name}?</AlertText>
              <AlertButton onClick={handleRemove}>Yes</AlertButton><AlertButton onClick={() => { setItemToBeRemoved(null); setPopup(false) }}>No</AlertButton>
            </Alert>
          }
        </Wrapper>
      </div>
    </>
  );
}

export default OrderSummary;
