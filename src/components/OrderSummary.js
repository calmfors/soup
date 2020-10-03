import React, { useState, useEffect } from 'react';
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
  bottom:${props => props.position ? "50px" : "-300px"};
  left:0;
  z-index:-1;  
  width: 100%;
  background-color: #6094AA;
  height:auto;
  max-height:300px;
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    flex-wrap: wrap;
  }
`
const Summary = styled.section`
  overflow: auto;
  font-family: 'Rubik', sans-serif;
  height: 100%;
  max-height:290px;
  width:100%;
  background-color: #fff;
  border-radius: 5px;
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
  }
`;

function OrderSummary(props) {
    console.log(props.position)
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem('localSoups')));

    let total = 0
    order.map(orderItem => total += parseInt(orderItem.price))
    function handleClick(i) {

    }
    function handleInput(i) {

    }
    return (
        <>
            <Wrapper position={props.position}>
                <Summary >
                    {order.map(orderItem => <p>{orderItem.name} with {orderItem.toppings.length > 0 ? orderItem.toppings.map(topping => topping + ", ") : orderItem[0] + ", "} {orderItem.price} kr</p>)}
                    <p style={{ "font-weight": "bold" }}>Total: {total} kr </p>
                </Summary>
                {/* <OrderButton><Link to="/order" style={{ "textDecoration": "none", "color": "#fff" }}></Link></OrderButton> */}
            </Wrapper>
        </>
    );
}

export default OrderSummary;
