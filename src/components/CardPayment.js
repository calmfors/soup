import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.section`
  width: 100%;
  margin-bottom: 3px;
  text-align:left;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  color: #fff;
 
`;
const Label = styled.label`
  display:inline-block;
  box-sizing: border-box;
  margin-bottom: 4px;
`;
const Input = styled.input`
  box-sizing: border-box;
  padding:11px;
  border: none;
  width:${props => props.width}%;
  border-radius: 5px;
  margin-bottom:10px;
  margin-right: ${props => props.width < 100 && "3px"};
`;
const SmallInputs = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

function CardPayment(props) {
  const [cardNumber, setCardNumber] = useState("");
  const [expDateMonth, setExpDateMonth] = useState("");
  const [expDateYear, setExpDateYear] = useState("");
  const [code, setCode] = useState("");
  const [cardName, setCardName] = useState("");
  const card = {
    cardNumber,
    code,
    expDateMonth,
    expDateYear,
    cardName
  }

  useEffect(() => {
    if (cardNumber.length === 16 && expDateMonth.length === 2 && expDateYear.length === 2 && code.length === 3 && cardName.length > 4) {
      props.sendObject(card)
    }
  })

  function handleCard(e) {
    setCardNumber(e.target.value)
    card.cardNumber = e.target.value
  }
  function handleExpDate(e) {
    if (e.target.id === "month") {
      if (e.target.value < 13 && e.target.value.length < 3) {
        setExpDateMonth(e.target.value)
        card.expDateMonth = e.target.value
      }
    }
    if (e.target.id === "year") {
      if (e.target.value.length < 3) setExpDateYear(e.target.value)
      card.expDateYear = e.target.value

    }
  }

  function handleCode(e) {
    setCode(e.target.value)
    card.code = e.target.value

  }
  function handleCardName(e) {
    setCardName(e.target.value)
    card.cardName = e.target.value
  }



  return (
    <InputContainer>
      <Label>Cardnumber</Label><br />
      <Input width="100" type='text' placeholder='xxxx xxxx xxxx xxxx' required onChange={handleCard} value={cardNumber}></Input>
      <SmallInputs>
        <div style={{ "width": "40%" }}>
          <Label>Expiry date</Label><br />
          <Input width="38" type='text' placeholder='xx' id="month" required onChange={handleExpDate} value={expDateMonth}></Input><span> / </span>
          <Input width="38" type='text' placeholder='xx' id="year" required onChange={handleExpDate} value={expDateYear}></Input>
        </div>
        <div style={{ "width": "40%" }}>
          <Label>Security code</Label><br />
          <Input width="100" type='text' placeholder='xxx' required onChange={handleCode} value={code}></Input>
        </div>
      </SmallInputs>
      <Label>Name on card</Label><br />
      <Input width="100" type='text' placeholder='Enter name' required onChange={handleCardName} value={cardName}></Input>
    </InputContainer>
  )
}

export default CardPayment;