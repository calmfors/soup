import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  transition-duration: 0.5s;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  position: ${props => props.pay ? "static" : "absolute"};
  display: flex;
  align-items: center;
  justify-content: center;
  bottom:${props => props.position ? "50px" : "-350px"};
  left:0;
  z-index: ${props => !props.pay && "-1"};  
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
  position:relative;
  box-sizing:border-box;
  overflow: auto;
  text-align: center;
  height: ${props => props.payHeight ? "calc(100vh - 530px)" : "calc(100 % - 50px)"};
  max-height:${props => props.pay ? "calc(100vh - 390px)" : "390px"};
  transition: height 0.3s ease-out;
  width:100%;
  background-color: #fff;
  border-radius: 5px;
  padding-bottom: ${props => props.pay ? "0" : "50px"};
`;

const OrderThumb = styled.section`
  font-family: 'Rubik', sans-serif;
  box-sizing: border-box;
  width:calc(100% - 20px);
  display: flex;
  height:70px;
  margin:10px;
  border-bottom: 1px solid grey;
  text-align: left;
`
const PlaceOrderContainer = styled(OrderThumb)`
  display: ${props => props.pay && "none"};
  width: calc(100% - 40px);
  position:absolute;
  left: 15px;
  bottom: 0px;
  align-items:center;
  height: 60px;
  padding: 0 10px 0 10px;
  background-color: #fffe;
  border-bottom:none;
  margin:0;
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
  font-size:${props => props.total ? "1rem" : "0.9rem"};
  font-weight:${props => props.total && "500"};
  font-weight:${props => props.total && "500"};
  width:calc(100% - 90px);
  margin:0;
  line-height:1.2rem;
`
const Close = styled(OrderText)`
 font-size: 1.2rem;
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
  position: absolute;
  left: 0px;
  top: ${props => props.top}px;
  height: 83px;
  width: 100%;
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
  const [order, setOrder] = useState(null);
  const [popup, setPopup] = useState(false);
  const [itemToBeRemoved, setItemToBeRemoved] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  let localSoups = JSON.parse(localStorage.getItem('localSoups'))
  let total = 0
  localSoups.map(orderItem => total += parseInt(orderItem.price))

  useEffect(() => {
    setOrder(localSoups)
    if (!props.position) setPopup(false)
  }, [props.position], order)

  function removeItem(i) {
    const clickedSection = document.getElementById(i)
    setCoordinates({
      left: clickedSection.offsetLeft,
      top: clickedSection.offsetTop
    })
    setItemToBeRemoved(i, coordinates)
    setPopup(true);
  }

  function handleRemove() {
    setPopup(false);
    let tempOrder = order;
    tempOrder.splice(itemToBeRemoved, 1)
    setOrder(tempOrder);
    setItemToBeRemoved(null);
    props.isItemRemoved(itemToBeRemoved)
  }
  return order && (
    <>
      <Wrapper pay={props.pay} position={props.position}>
        <Summary pay={props.pay} payHeight={props.payHeight}>
          {order.map((orderItem, i) =>
            <OrderThumb key={i + "a"} id={i}>
              <OrderImg src={orderItem.img}></OrderImg>
              <OrderText>{orderItem.name} with {orderItem.choosenToppings.length > 0 ? orderItem.choosenToppings.map(topping => topping + ", ") : orderItem[0] ? orderItem[0] : "no topping"}<br /> {orderItem.price} kr</OrderText>
              {!props.pay && <Close onClick={() => removeItem(i)}>×</Close>}
            </OrderThumb>
          )}
          {popup &&
            <Alert left={coordinates.left - 10} top={coordinates.top - 12}>
              <AlertText>Remove {order[itemToBeRemoved].name}?</AlertText>
              <AlertButton onClick={handleRemove}>Yes</AlertButton><AlertButton onClick={() => { setItemToBeRemoved(null); setPopup(false) }}>No</AlertButton>
            </Alert>}
        </Summary>
        <PlaceOrderContainer pay={props.pay}>

          <OrderText total={true}>TOTAL: {total} kr </OrderText>
          <PlaceOrder><Link to={
            {
              pathname: '/delivery',
              state: {
                loggedIn: props.loggedIn
              }
            }
          }>Place order</Link></PlaceOrder>
        </PlaceOrderContainer>
      </Wrapper>
    </>
  );
}

export default OrderSummary;
