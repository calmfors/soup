import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import firebase from '../components/firebase';

const Wrapper = styled.div`
  font-family: 'Rubik', sans-serif;
  margin: 0 auto;
  margin-top: ${props => props.customize ? '38px' : '75px'};
  width: 100%;
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    flex-wrap: wrap;
  }
`
const Label = styled.p`
  margin: 10px 0 2px 0;
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
                    <div>
                        <label htmlFor='name'><Label>Name</Label></label>
                        <input type='text' placeholder='Enter name' required onChange={handleInput} value={name}></input><br />
                        <label htmlFor='street'><Label>Street address</Label></label>
                        <input type='text' placeholder='Enter street address' required onChange={handleInput} value={street}></input><br />
                        <label htmlFor='zip'><Label>Zip code</Label></label>
                        <input type='text' placeholder='Enter zip code' required onChange={handleInput} value={zip}></input><br />
                        <label htmlFor='city'><Label>City</Label></label>
                        <input type='text' placeholder='Enter city' required onChange={handleInput} value={city}></input><br />
                    </div>
                    : user ? <p>Loading...</p> : <p>Log in to proceed.</p>}
                {loggedInUser && <p>{loggedInUser.name}</p>}
                {order.map(orderItem => <p>{orderItem.name} with {orderItem.toppings.length > 0 ? orderItem.toppings.map(topping => topping + ", ") : orderItem[0] + ", "} {orderItem.price} kr</p>)}
            </Wrapper>
        </>
    );
}

export default Order;
