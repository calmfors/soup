import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import firebase from '../components/firebase';
import logo from '../graphics/logo_white.svg';
import OrderSummary from '../components/OrderSummary';
import CardPayment from '../components/CardPayment';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    flex-wrap: wrap;
  }
`
const PaymentContainer = styled.div`
  box-sizing: border-box;
  padding-top:20px;
  position:relative;
  margin-top: 32px;
  width: 100%;
  background-color: #6094AA;
  text-align: left;
  height: calc(100vh - 38px);
  @media (min-width: 600px) {
    max-width: 600px;
  }
`
const Label = styled.label`
  font-family: 'Rubik Mono One', sans-serif;
  display: inline-block;
  font-size: 1rem;
  color: ${props => props.grey && props.bordert ? "#777" : "#fff"};
  margin: 13px 0 8px 0;
`;
const Title = styled.h1`
  font-size: 1rem;
  color: #fff;
  margin: 15px 10px -2px 10px;
`;
const InputContainer = styled.section`
  width:calc(100% - 20px);
  margin: 0 0 3px 10px;
  padding-bottom: ${props => props.border && "7px"}; 
  text-align:left;
  border-bottom: ${props => props.border && "1px solid #fff"};
  border-top: ${props => props.bordert && "1px solid #fff"};
  padding-top: ${props => props.bordert && "10px"};
`;
const Input = styled.input`
  box-sizing: border-box;
  padding:11px;
  border: none;
  width:100%;
  border-radius: 5px;
  margin-bottom:10px;
  color: ${props => props.grey ? "#777" : "#000"};
`;

const Checkbox = styled.input`
  margin-right:10px;
  box-sizing:border-box;
`
const Text = styled.p`
  color: #fff;
  font-size: 1rem;
  margin-bottom:4px;
  color: ${props => props.grey ? "#777" : "#fff"};
`
const OrderButton = styled.button`
  position:fixed;
  bottom: 0;
  left:0;
  height: 50px;
  width: 100%;
  font-size: 1rem;
  border-top:1px solid #fff;
  color: #000;
  background-color: #FFCC00;
  &:hover{
    background-image: radial-gradient(#ffe066, #FFCC00);
  }
   @media(min-width: 600px) {
    max-width: 600px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
const ThanksContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #6094AA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  color: #fff;
`
const Logo = styled.img`
  display:block;  
  width: 50%;
  max-width:300px;
`
const Hide = styled.section`
  max-height: ${props => props.hide ? "0px" : "220px"};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  margin:0;
  paddnig:0;
`
function Payment(props) {

  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('localUser')));
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('localOrder')));
  const [paymentOption, setPaymentOption] = useState("card")
  const [swishNumber, setSwishNumber] = useState("")
  const [personalNumber, setPersonalNumber] = useState("")
  const [checkout, setCheckout] = useState(false)
  let card = {};
  let total = 0
  order && order.order.map(item => item.drink ? total += parseInt(item.price) + 20 : total += parseInt(item.price))

  const history = useHistory();
  let user = firebase.auth().currentUser;

  function handleRadio(r) {
    let id = r.target.value || r.target.id
    setPaymentOption(id);
  }
  function handleClick() {
    history.push('/delivery');
  }
  function handleSwish(e) {
    setSwishNumber(e.target.value)
  }
  function handlePersonalNumber(e) {
    setPersonalNumber(e.target.value)
  }

  function handleOrder() {
    let d = new Date();
    let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    let orderObj = { ...order, date, paymentOption }
    if (paymentOption === "card" && card) orderObj = { ...orderObj, card }
    if (paymentOption === "swish" && swishNumber) orderObj = { ...orderObj, swishNumber }
    if (paymentOption === "invoice" && personalNumber) orderObj = { ...orderObj, personalNumber }
    date = date.substring(0, 10)
    let tempUser = loggedInUser
    if (tempUser.orderHistory) tempUser.orderHistory.push({ date, order: order.order })
    else tempUser.orderHistory = [{ date, order: order.order }]
    localStorage.setItem('localOrder', JSON.stringify(orderObj))
    localStorage.setItem('localUser', JSON.stringify(tempUser))
    localStorage.removeItem('localSoups')
    firebase.database().ref('/users/').child(user.uid).set(tempUser)
      .then((data) => {
        console.log('Saved Data', data)
      })
      .catch((error) => {
        console.log('Storing Error', error)
      })
    setCheckout(true);
    setTimeout(
      function () {
        history.push('/');
      }, 3000);
  }

  function getObject(object) {
    card = object
  }
  return (
    <>{!checkout ?
      <Wrapper>
        <Header showLogin={false} hideProfile={true} back={true} handleClick={handleClick} text="Menu" />
        <PaymentContainer>
          <InputContainer border={true}>
            <Checkbox onChange={handleRadio} type='radio' name="paymentoptions" value="card" checked={paymentOption === "card"} />
            <Label onClick={(r) => handleRadio(r)} id="card" htmlFor='card'>Credit card</Label><br />
            <Hide hide={paymentOption !== "card"} >
              <CardPayment sendObject={getObject} hide={paymentOption !== "card"} />
            </Hide>
          </InputContainer>
          <InputContainer border={true}>
            <Checkbox onChange={handleRadio} type='radio' name="paymentoptions" value="swish" checked={paymentOption === "swish"} />
            <Label onClick={(r) => handleRadio(r)} id="swish" htmlFor="swish">Swish</Label><br />
            <Hide hide={paymentOption !== "swish"} >
              <Text>Your phone number</Text>
              <Input type='text' placeholder='070-xxxxxxxx' required onChange={handleSwish} value={swishNumber}></Input>
            </Hide>
          </InputContainer>
          <InputContainer border={true}>
            <Checkbox onChange={handleRadio} type='radio' name="paymentoptions" value="invoice" checked={paymentOption === "invoice"} />
            <Label onClick={(r) => handleRadio(r)} id="invoice" htmlFor="invoice">Invoice</Label><br />
            <Hide hide={paymentOption !== "invoice"}>
              <Text>Your personal identity number (10 digits)</Text>
              <Input type='text' placeholder='xxxxxx-xxxx' required onChange={handlePersonalNumber} value={personalNumber}></Input>
            </Hide>
          </InputContainer>
          <Title> Order total {total} SEK</Title>
          <OrderSummary pay={true} payHeight={paymentOption === "card"} position={true}></OrderSummary>
          <OrderButton onClick={handleOrder}>Pay</OrderButton>
        </PaymentContainer>
      </Wrapper>
      :
      <ThanksContainer>
        <Title style={{ "marginBottom": "10px" }}>Thank you!</Title>
        <Logo src={logo} />
      </ThanksContainer>
    }
    </>

  )
}

export default Payment;
