import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';
import firebase from '../components/firebase';
import Customize from '../components/Customize';
import Labels from '../components/Labels';
import soups from '../soups.json';

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: ${props => props.customize ? '38px' : '75px'};
  width: 100%;
  &:last-child{
      margin-bottom: ${props => props.orderButton || props.customize ? "60px" : "0"};
  }
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    flex-wrap: wrap;
  }
`
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
    margin-left: 10px;
  }
`;

function Menu() {

    let localSoups = JSON.parse(localStorage.getItem('localSoups')) || [];

    const [seeOrder, setSeeOrder] = useState(false);
    const [cart, setCart] = useState(localSoups.length);
    const [orderMessage, setOrderMessage] = useState(`See order (${cart})`);
    const [choosenSoup, setChoosenSoup] = useState(null);
    const [customize, setCustomize] = useState(false);
    const [back, setBack] = useState(false);
    const [selected, setSelected] = useState(null);
    const [soupFilter, setSoupFilter] = useState({
        selected: null,
        filteredSoups: soups,
    });
    const labels = ['vegetarian', 'vegan', 'chicken', 'fish', 'meat'];

    const user = firebase.auth().currentUser ? firebase.auth().currentUser : 'no user';
    console.log("From menu: " + user.uid)

    function handleClick(i) {
        if (i !== 99) {
            setBack(true);
            setCustomize(true);
            setChoosenSoup(soupFilter.filteredSoups[i]);
        } else {
            setBack(false)
            setCustomize(false);
            setSoupFilter({
                selected: null,
                filteredSoups: soups
            })
        }
    }
    function handleFilter(i) {
        if (i !== soupFilter.selected && i !== null) {
            const selectedSoups = soups.filter(soup => soup.filter.includes(labels[i]))
            setSoupFilter({
                selected: i,
                filteredSoups: selectedSoups
            })
        }
        else setSoupFilter({
            selected: null,
            filteredSoups: soups
        })
    }

    function handleOrder(updateTopping, toppings) {
        const choosenToppings = []
        updateTopping.map((topping, i) => {
            if (topping === true) choosenToppings.push(toppings[i].name)
        })
        console.log(choosenToppings)
        choosenSoup.toppings = choosenToppings
        localSoups.push(choosenSoup)
        console.log(localSoups)
        localStorage.setItem('localSoups', JSON.stringify(localSoups))
        setBack(false)
        setCustomize(false);
        setSoupFilter({
            selected: null,
            filteredSoups: soups
        })
        setCart(localSoups.length);
        setOrderMessage(`${choosenSoup.name} added`)
        setTimeout(
            function () {
                setOrderMessage(`See order (${localSoups.length})`)
            }, 1000)
    }

    return (
        <>
            <Header back={back} handleClick={() => handleClick(99)} text="Menu" />
            {!customize && <Labels selected={soupFilter.selected} handleFilter={handleFilter} />}
            <Wrapper customize={customize} orderButton={cart}>
                {!customize ?
                    soupFilter.filteredSoups.map((item, i) =>
                        <MenuItem categories={labels.filter(label => item.filter.includes(label))}
                            click={() => handleClick(i)} key={i} title={item.name} src={item.img} price={item.price + " kr"} />
                    )
                    :
                    <Customize customize={customize} handleOrder={handleOrder} choosenSoup={choosenSoup} src={choosenSoup.img} />
                }

                {!customize && cart ? <OrderButton><Link to="/order" style={{ "textDecoration": "none", "color": "#fff" }}>{orderMessage}</Link></OrderButton> : null}

            </Wrapper>
        </>
    );
}

export default Menu;
