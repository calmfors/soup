import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import soups from '../soups.json';
import Labels from './Labels';

export const red = '#e3714f';
export const green = '#60c663';
export const yellow = '#FFCC00';

const SoupTitle = styled.h1`
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0px 10px 0px 10px;
  margin-top: 10px;
  text-align:left;
  @media (min-width: 600px) {
    padding: 7px 10px 5px 0px;
  }
`;

const OrderButton = styled.button`
  position: fixed;
  bottom: 0;
  left:0;
  height: 50px;
  width: 100%;
  font-size: 1rem;
  color: #fff;
  background-color: ${props => props.toppingChange ? "#77b6d1" : "#6094AA"};
  transition-duration: 0.1s;
  &:hover{
    background-image: radial-gradient(#81adbf, #6094AA);
  } 
  @media(min-width: 600px) {
    max-width: 600px;
    left: 50%;
    transform: translate(-50%, 0);
    margin-left: calc(100vw - 100%);
  }
`;

const ToppingContainer = styled.section`
  box-sizing:border-box;
  padding-left:6px;
  font-size:0.83rem;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 8px;
  background-color: ${props => props.red ? red : props.filter ? yellow : "#efefef"};
  color: ${props => props.red ? "#fff" : "#000"};
  height: 30px;
  &:hover{
    background-color:${props => !props.red && `${green}66`};
  }
  @media(min-width: 600px) {
    padding-left:10px;
    margin-top: ${props => props.filter ? "30px" : "8px"};
  }
`;

const Text = styled.span`
  text-align: left;
  font-face: 'Rubik', sans-serif;
  text-transform: uppercase;
`;

const EditContainer = styled.section`
@media(min-width: 600px) {
  display: inline-block;
  width: 290px;
  margin-top: 40px;
}
`;
const Input = styled.input`
  font-family: ${props => props.mono ? "'Rubik Mono One', sans-serif" : "'Rubik', sans-serif"};
  background-color: transparent;
  box-sizing: border-box;
  padding: ${props => props.title ? props.width ? "0" : "10px 0 0 10px" : "6px 0 6px 0"};
  border: none;
  width: ${props => props.width || "100"}%;
  font-size:${props => props.title ? "1rem" : "0.83rem"};
  @media(min-width: 600px) {
    padding: ${props => props.title ? props.width ? "0" : "0px" : "6px 0 6px 0"};
    margin-top:${props => props.title ? props.width ? "0" : "16px" : "0"};
    margin-bottom:${props => props.title ? props.width ? "0" : "4px" : "0"};

}
`;
const Description = styled.textarea`
  overflow: hidden;
  box-sizing:border-box;
  width: 100%;
  border: none;
  resize: none;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  margin-bottom:-1px;
  line-height: 1.4rem;
  font-family: 'Rubik', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  @media(min-width: 600px) {
      margin: 2px 0 15px 0;
      padding: 0;
  }
`
const Label = styled.label`
  display:inline-block;
  font-size:0.7 rem;
  color: ${props => props.grey && props.bordert ? "#777" : "#fff"};
  margin: 7px 0 8px 0;
`;
const Price = styled.section`
  width:95px;
  position: absolute;
  right: 10px;
  top: 298px;
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  background: #fff7;
  margin:0;
  border-radius:4px;
  display: flex;
  align-items:center;
  padding:5px;
  @media(min-width: 600px) {
      left: calc(50% - 124px);
      top: 538px;
      height: 20px;
  }
`;
function Edit({ handleEdit, labels, choosenSoup }) {
  let editToppings = [...choosenSoup.toppings]
  while (editToppings.length < 4) editToppings.push("")
  let editFilter = [...choosenSoup.filter]
  while (editFilter.length < 2) editFilter.push("")
  let tempArrayOfIndex = []
  editFilter.map(filter => {
    tempArrayOfIndex.push(labels.indexOf(filter))
  })

  const [changeButton, setChangeButton] = useState(false)
  const [orderMessage, setOrderMessage] = useState("Save changes");
  const [soupName, setSoupName] = useState(choosenSoup.name)
  const [soupDescription, setSoupDescription] = useState(choosenSoup.description)
  const [soupToppings, setSoupToppings] = useState(editToppings)
  const [soupFilter, setSoupFilter] = useState(editFilter)
  const [soupPrice, setSoupPrice] = useState(choosenSoup.price)
  const [soupImg, setSoupImg] = useState(choosenSoup.img)
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(tempArrayOfIndex)


  function handleName(e) {
    setSoupName(e.target.value)
  }
  function handleDescription(e) {
    if (soupDescription.length <= 175) setSoupDescription(e.target.value)
    if (soupDescription.length === 175) setSoupDescription(soupDescription.substring(0, 174))
    if (soupDescription.length > 175) setSoupDescription(soupDescription.substring(0, 174))

  }
  function handleToppings(e, i) {
    let tempArr = [...soupToppings]; // copying the old datas array
    tempArr[i] = e.target.value.toLowerCase(); // replace e.target.value with whatever you want to change it to
    setSoupToppings(tempArr)
  }
  function handleFilter(e, i) {
    let tempArr = [...soupFilter]; // copying the old datas array
    tempArr[i] = e.target.value.toLowerCase(); // replace e.target.value with whatever you want to change it to
    setSoupFilter(tempArr)
  }
  function handlePrice(e) {
    setSoupPrice(e.target.value)
  }
  function handleImg(i) {
  }

  function handleSave() {
    let tempToppings = soupToppings.filter(topping => topping.length > 2)
    let tempFilter = soupFilter.filter(filter => filter.length > 2)
    console.log(tempFilter)
    if (choosenSoup.filter !== tempFilter) choosenSoup.filter = tempFilter
    if (choosenSoup.toppings !== tempToppings) choosenSoup.toppings = tempToppings
    if (choosenSoup.name !== soupName) choosenSoup.name = soupName
    if (choosenSoup.description !== soupDescription) choosenSoup.description = soupDescription
    if (choosenSoup.price !== soupPrice) choosenSoup.price = soupPrice
    console.log(choosenSoup)
    let tempSoups = [...soups]
    let indexOfSoup = soups.findIndex(soup => soup.id === choosenSoup.id)
    // tempSoups.slice(indexOfSoup)
    tempSoups[indexOfSoup] = choosenSoup
    localStorage.setItem('soups', JSON.stringify(tempSoups))
    setChangeButton(true)
    setOrderMessage('Saved')
    console.log(choosenSoup)
    setTimeout(
      function () {
        setChangeButton(false)
      }, 200)
    setTimeout(
      function () {
        setOrderMessage('Save changes')
      }, 2000)
    handleEdit(choosenSoup)

  }


  function handleFilter(i) {
    let tempFilter = [...soupFilter]
    tempArrayOfIndex = []
    if (!selectedFilterIndex.includes(i) && i !== null) {
      tempFilter.push(labels[i])
      setSoupFilter(tempFilter)
      console.log(soupFilter)
    } else {
      tempFilter = soupFilter.filter(filter => filter !== labels[i])
      // tempFilter.slice(tempFilter.indexOf(labels[i]))
      console.log(tempFilter)
      setSoupFilter(tempFilter)
    }
    tempFilter.map(filter => {
      tempArrayOfIndex.push(labels.indexOf(filter))
    })
    tempFilter.map(filter => {
      tempArrayOfIndex.push(labels.indexOf(filter))
    })

    setSelectedFilterIndex(tempArrayOfIndex)
  }

  return (
    <>
      <MenuItem customize={true} edit={true} categories={choosenSoup.filter}
        title={choosenSoup.name} src={choosenSoup.img} price={choosenSoup.price + " kr"} />
      <EditContainer>
        {/* <SoupTitle>{props.choosenSoup.name}</SoupTitle> */}
        {/* <label htmlFor='name'><Label>Name</Label></label> */}
        <Input mono="true" title="true" type='text' placeholder='Soup name' required onChange={handleName} value={soupName}></Input><br />
        {/* <Description>{props.choosenSoup.description}</Description> */}
        {/* <Label bordert={true} grey={inputGrey}>Send a soup❤gram</Label> */}
        <Description
          id="description"
          value={soupDescription}
          onChange={handleDescription}
          rows={5}
        />
        <ToppingContainer red="true">
          <Text>Edit toppings</Text>
        </ToppingContainer>
        {soupToppings.map((topping, i) =>
          <ToppingContainer key={"a" + i}>
            {/* <label htmlFor='name'><Label>Name</Label></label> */}
            <Input mono="true" type='text' placeholder='+ topping' required onChange={(e) => handleToppings(e, i)} value={topping}></Input><br />
          </ToppingContainer>
        )}
        <ToppingContainer red="true">
          <Text>Edit categories</Text>
        </ToppingContainer>
        <Labels edit="true" labels={labels} selected={selectedFilterIndex} handleFilter={handleFilter} />

        {/* {soupFilter.map((filter, i) =>
          <ToppingContainer key={"b" + i} >
            <Input mono={true} type='text' placeholder='+ category' required onChange={(e) => handleFilter(e, i)} value={filter}></Input><br />
          </ToppingContainer>
        )} */}
        <Price>
          <Input type='text' mono="true" title="true" width="60" placeholder='xxx' required onChange={handlePrice} value={soupPrice}></Input>SEK
        </Price>
        {/* <Drinks selectedDrink={getDrinks} /> */}
        <OrderButton toppingChange={changeButton} onClick={handleSave}>{orderMessage}</OrderButton>
      </EditContainer>
    </>
  );
}

export default Edit;
