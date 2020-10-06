import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from '../components/firebase';

const Label = styled.label`
  display:inline-block;
  font-size:0.7 rem;
  color: #fff;
  margin: 10px 0 8px 0;
`;

const InputContainer = styled.section`
  width:calc(100% - 20px);
  margin-left:10px;
  margin-bottom: 5px;
  padding-bottom: ${props => props.border && "10px"}; 
  text-align:left;
  border-bottom: ${props => props.border && "1px solid #fff"};
`;
const Input = styled.input`
  box-sizing: border-box;
  padding:7px;
  border: none;
  width:100%;
  border-radius: 5px;
  height:40px;
  margin-bottom:10px;
  color: ${props => props.grey ? "#777" : "#000"};
`;

function Address(props) {

    let user = firebase.auth().currentUser || "login";
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem('localSoups')));
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loginMenu, setLoginMenu] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false)
    const [deliveryOption, setDeliveryOption] = useState("delivery")
    const [inputGrey, setInputGrey] = useState(false)
    const [name, setName] = useState("Name")
    const [street, setStreet] = useState("Street address")
    const [zip, setZip] = useState("Zip code")
    const [city, setCity] = useState("City")


    function updateUser(user) {
        setLoggedInUser(user)
        const { name, street, zip, city } = user;
        setName(name)
        setStreet(street)
        setZip(zip)
        setCity(city)
    }

    function handleName(e) {
        setName(e.target.value)
    }
    function handleStreet(e) {
        setStreet(e.target.value)
    }
    function handleZip(e) {
        setZip(e.target.value)
    }
    function handleCity(e) {
        setCity(e.target.value)
    }

    return (
        <>
            <InputContainer>
                <Label onClick={(r) => handleRadio(r)} id="delivery" htmlFor='delivery'>Delivery</Label><br />
                {/* <label htmlFor='name'><Label>Name</Label></label> */}
                <Input grey={inputGrey} disabled={inputGrey} type='text' placeholder='Enter name' required onChange={handleName} value={name}></Input><br />
                {/* <label htmlFor='street'><Label>Street</Label></label> */}
                <Input grey={inputGrey} disabled={inputGrey} type='text' placeholder='Enter street address' required onChange={handleStreet} value={street}></Input><br />
                {/* <label htmlFor='zip'><Label>Zip</Label></label> */}
                <Input grey={inputGrey} disabled={inputGrey} style={{ "width": "23%", "marginRight": "2%" }} type='text' placeholder='Enter zip code' required onChange={handleZip} value={zip}></Input>
                {/* <label htmlFor='city'><Label>City</Label></label> */}
                <Input grey={inputGrey} disabled={inputGrey} style={{ "width": "75%" }} type='text' placeholder='Enter city' required onChange={handleCity} value={city}></Input><br />
            </InputContainer>
        </>

    )
}

export default Address;
