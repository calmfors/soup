import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  padding:11px;
  border: none;
  width:100%;
  border-radius: 5px;
  margin-bottom:10px;
  color: ${props => props.grey ? "#777" : "#000"};
`;

function Address(props) {

    const [name, setName] = useState(props.name || "")
    const [street, setStreet] = useState(props.street || "")
    const [zip, setZip] = useState(props.zip || "")
    const [city, setCity] = useState(props.city || "")
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (name && street && zip && city) props.sendAddress({ name, street, zip, city, edit })
    })

    function handleName(e) {
        setEdit(true)
        setName(e.target.value)
    }
    function handleStreet(e) {
        setEdit(true)
        setStreet(e.target.value)
    }
    function handleZip(e) {
        setEdit(true)
        setZip(e.target.value)
    }
    function handleCity(e) {
        setEdit(true)
        setCity(e.target.value)
    }


    return (
        <div>
            {/* <label htmlFor='name'><Label>Name</Label></label> */}
            <Input
                grey={props.inputGrey} disabled={props.inputGrey}
                type='text' placeholder='Enter name' required
                onChange={handleName} value={name}></Input><br />
            {/* <label htmlFor='street'><Label>Street</Label></label> */}
            <Input grey={props.inputGrey} disabled={props.inputGrey}
                type='text' placeholder='Enter street address' required
                onChange={handleStreet} value={street}></Input><br />
            {/* <label htmlFor='zip'><Label>Zip</Label></label> */}
            <Input grey={props.inputGrey} disabled={props.inputGrey}
                style={{ "width": "23%", "marginRight": "2%" }} type='text' placeholder='Zip code' required
                onChange={handleZip} value={zip}></Input>
            {/* <label htmlFor='city'><Label>City</Label></label> */}
            <Input grey={props.inputGrey} disabled={props.inputGrey}
                style={{ "width": "75%" }} type='text' placeholder='Enter city' required
                onChange={handleCity} value={city}></Input><br />
        </div>
    )
}
export default Address