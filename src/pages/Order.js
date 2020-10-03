import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import firebase from '../components/firebase';

const Wrapper = styled.div`
box-sizing: border-box;
padding-top:20px;
position:relative;
  margin: 0 auto;
  margin-top: 38px;
  width: 100%;
  background-color: #6094AA;
  height: calc(100vh - 38px);
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    flex-wrap: wrap;
  }
`
const Label = styled.p`
display:inline-block;
font-size:0.7 rem;
color: #fff;
  margin: 10px 0 2px 0;
`;

const OrderSummary = styled.section`
  font-family: 'Rubik', sans-serif;
  position: absolute;
  bottom:10px;
  left:50%;
  transform: translate(-50%, 0);
  width:calc(100vw - 20px);
  height: 50%;
  background-color: #fff;
  border-radius: 5px;
`;

const InputContainer = styled.section`
    width:calc(100vw - 20px);
    margin-left:10px;
`;
const Input = styled.input`
box-sizing: border-box;

  border: none;
  width:100%;
  border-radius: 5px;
  height:40px;
  margin-bottom:10px;
`;

function Order(props) {

    let user = firebase.auth().currentUser ? firebase.auth().currentUser : null;
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem('localSoups')));
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        if (!loggedInUser && user) setLoggedInUser(getUserFromDatabase(user.uid));
    });

    function getUserFromDatabase(id) {
        let tempUser
        firebase.database().ref('/users/').on('value', (snapshot) => {
            let userObj = snapshot.val();
            tempUser = userObj.filter(user => user.id === id)[0]
            if (tempUser) updateUser(tempUser)
        });
        return tempUser
    }

    function updateUser(user) {
        setLoggedInUser(user)
    }

    function logOutOrInListener(check) {
        if (check === false) {
            setLoggedInUser(null)
            user = null;
        } else {
            setLoggedInUser(getUserFromDatabase(check.uid))
            user = check;
        };
    }

    function handleClick(i) {

    }
    function handleInput(i) {

    }
    const { name, street, zip, city } = loggedInUser ? loggedInUser : "empty";
    return (
        <>
            <Header check={logOutOrInListener} back={true} handleClick={() => handleClick(99)} text="Menu" />
            <Wrapper>
                {loggedInUser ?
                    <InputContainer>
                        <Label>Delivery or pickup?</Label><br />
                        {/* <label htmlFor='name'><Label>Name</Label></label> */}
                        <Input type='text' placeholder='Enter name' required onChange={handleInput} value={name}></Input><br />
                        {/* <label htmlFor='street'><Label>Street</Label></label> */}
                        <Input type='text' placeholder='Enter street address' required onChange={handleInput} value={street}></Input><br />
                        {/* <label htmlFor='zip'><Label>Zip</Label></label> */}
                        <Input style={{ "width": "23%", "marginRight": "2%" }} type='text' placeholder='Enter zip code' required onChange={handleInput} value={zip}></Input>
                        {/* <label htmlFor='city'><Label>City</Label></label> */}
                        <Input style={{ "width": "75%" }} type='text' placeholder='Enter city' required onChange={handleInput} value={city}></Input><br />
                    </InputContainer>
                    : user ? <p>Loading...</p> : <p>Log in to proceed.</p>}
                <Label>Order summary</Label><br />
                <OrderSummary>
                    {order.map(orderItem => <p>{orderItem.name} with {orderItem.toppings.length > 0 ? orderItem.toppings.map(topping => topping + ", ") : orderItem[0] + ", "} {orderItem.price} kr</p>)}
                </OrderSummary>
            </Wrapper>
        </>
    );
}

export default Order;
