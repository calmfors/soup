import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import firebase from '../components/firebase';
import logo from '../graphics/logo_white.svg';

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
const DeliveryContainer = styled.div`
  box-sizing: border-box;
  padding-top:20px;
  position:relative;
  margin-top: 38px;
  width: 100%;
  background-color: #6094AA;
  height: calc(100vh - 38px);
  @media (min-width: 600px) {
    max-width: 600px;
    }
`
const Label = styled.label`
  display:inline-block;
  font-size:0.7 rem;
  color: ${props => props.grey && props.bordert ? "#777" : "#fff"};
  margin: 7px 0 8px 0;
`;

const InputContainer = styled.section`
  width:calc(100% - 20px);
  margin-left:10px;
  margin-bottom: 3px;
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
const Message = styled.textarea`
  box-sizing:border-box;
  width: 100%;
  padding: 7px;
  border-radius: 7px;
  resize: none;
  margin-bottom:12px;
  `
const Text = styled.p`
  font-family: 'Rubik', sans-serif;
  color: #fff;
  font-size: 1rem;
  margin:0 0 15px 0;
  color: ${props => props.grey ? "#777" : "#fff"};
`
const OrderButton = styled.button`
  position:fixed;
  bottom: 0;
  left:0;
  height: 50px;
  width: 100%;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  border:0;
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

function Payment(props) {

    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('localUser')));
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem('localOrder')));
    const [paymentOption, setPaymentOption] = useState("card")
    const [inputGrey, setInputGrey] = useState(false)
    const [name, setName] = useState("")
    const [street, setStreet] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [message, setMessage] = useState("")
    const [checkout, setCheckout] = useState(false)

    const history = useHistory();
    let user = firebase.auth().currentUser;




    function handlePayment() {

    }

    function handleRadio(r) {
        let id = r.target.value || r.target.id
        setPaymentOption(id);
        if (id === "pickup") setInputGrey(true);
        else setInputGrey(false);
    }
    // function handleName(e) {
    //     setName(e.target.value)
    // }
    // function handleStreet(e) {
    //     setStreet(e.target.value)
    // }
    // function handleZip(e) {
    //     setZip(e.target.value)
    // }
    // function handleCity(e) {
    //     setCity(e.target.value)
    // }
    function handleMessage(e) {
        if (message.length <= 100) setMessage(e.target.value)
        if (message.length === 100) setMessage(message.substring(0, 99))
        if (message.length > 100) setMessage(message.substring(0, 99))
    }
    function handleClick() {
        history.push('/delivery');
    }

    function handleOrder() {
        let date = (new Date).toLocaleString()
        const orderObj = { ...order, date }
        date = date.substring(0, 10)
        let tempUser = loggedInUser
        if (tempUser.orderHistory) tempUser.orderHistory.push({ date, order })
        else tempUser.orderHistory = [{ date, order }]
        console.log(orderObj)
        console.log(tempUser)
        localStorage.setItem('localOrder', JSON.stringify(orderObj))
        localStorage.setItem('localUser', JSON.stringify(tempUser))
        localStorage.removeItem('localSoups')
        setCheckout(true);
        setTimeout(
            function () {
                history.push('/');
            }, 3000);
    }

    return (
        <>{!checkout ?
            <Wrapper>
                <Header showLogin={false} hideProfile={true} back={true} handleClick={handleClick} text="Menu" />
                <DeliveryContainer>
                    <InputContainer>
                        <Checkbox onChange={handleRadio} type='radio' name="paymentoptions" value="card" checked={paymentOption === "card"} />
                        <Label onClick={(r) => handleRadio(r)} id="card" htmlFor='card'>Card</Label><br />
                        <Input grey={inputGrey} disabled={inputGrey} style={{ "width": "23%", "marginRight": "2%" }} type='text' placeholder='Enter zip code' required onChange={handlePayment} value={zip}></Input>
                        {/* <label htmlFor='city'><Label>City</Label></label> */}
                        <Input grey={inputGrey} disabled={inputGrey} style={{ "width": "75%" }} type='text' placeholder='Enter city' required onChange={handlePayment} value={city}></Input><br />
                    </InputContainer>
                    <InputContainer border={true} bordert={true}>
                        <Checkbox onChange={handleRadio} type='radio' name="paymentoptions" value="swish" checked={paymentOption === "swish"} />
                        <Label onClick={(r) => handleRadio(r)} id="swish" htmlFor="swish">Swish</Label><br />
                    </InputContainer>
                    <InputContainer border={true} bordert={true}>
                        <Checkbox onChange={handleRadio} type='radio' name="paymentoptions" value="invoice" checked={paymentOption === "invoice"} />
                        <Label onClick={(r) => handleRadio(r)} id="invoice" htmlFor="invoice">Invoice</Label><br />
                    </InputContainer>
                    <OrderButton onClick={handleOrder}>Pay</OrderButton>

                </DeliveryContainer>
            </Wrapper>
            :
            <ThanksContainer>
                <p>Thank you!</p>
                <Logo src={logo} />
            </ThanksContainer>
        }
        </>

    )
}

export default Payment;
