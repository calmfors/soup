import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';
import firebase from '../components/firebase';
import Customize from '../components/Customize';
import Labels from '../components/Labels';
import soups from '../soups.json';
import OrderSummary from '../components/OrderSummary';

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
const OrderButtonContainer = styled.section`
  margin: 0 auto;
  position:fixed;
  bottom: 0;
  left:0;
  height: 50px;
  width: 100%;
   @media(min-width: 600px) {
    max-width: 600px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  `;


const OrderButton = styled.button`
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  border:0;
  color: #fff;
   height: 100%;
  width: 100%;
 z-index:1;
  background-color: #6094AA;
 
`;



function Menu() {

    const [localSoups, setLocalSoups] = useState(JSON.parse(localStorage.getItem('localSoups'))) || [];

    const [seeOrder, setSeeOrder] = useState(false);
    const [cart, setCart] = useState(localSoups.length);
    const [orderMessage, setOrderMessage] = useState(`See order (${cart})`);
    const [choosenSoup, setChoosenSoup] = useState(null);
    const [customize, setCustomize] = useState(false);
    const [back, setBack] = useState(false);
    const [loginMenu, setLoginMenu] = useState(false);
    // const [showOrder, setShowOrder] = useState(false);
    const [selected, setSelected] = useState(null);
    const [soupFilter, setSoupFilter] = useState({
        selected: null,
        filteredSoups: soups,
    });
    const labels = ['vegetarian', 'vegan', 'chicken', 'fish', 'meat'];
    const orderButton = React.createRef();


    const user = firebase.auth().currentUser ? firebase.auth().currentUser : 'no user';
    console.log("From menu: " + user.uid)

    function handleClick(i) {
        if (i !== 99) {
            setSeeOrder(false);
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
        if (!seeOrder && !loginMenu) {
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
    }

    function showOrder() {
        setLoginMenu(false)
        orderButton.current.blur()
        console.log("clicked")
        setSeeOrder(!seeOrder)
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

    function handleLogin() {
        setLoginMenu(!loginMenu);
        console.log("loginmenu: " + loginMenu)
    }

    function closeMenus() {
        seeOrder && setSeeOrder(false)
        loginMenu && setLoginMenu(false)
    }

    function handleCart(value) {
        setCart(cart - 1)
        let tempLocalSoups = localSoups
        tempLocalSoups.splice(value, 1)
        setLocalSoups(tempLocalSoups)
        setOrderMessage(`See order (${tempLocalSoups.length})`)
        localStorage.setItem('localSoups', JSON.stringify(tempLocalSoups))
    }

    return (
        <>
            <Wrapper onClick={closeMenus} customize={customize} orderButton={cart}>

                <Header showLogin={loginMenu} back={back} handleLogin={handleLogin} handleClick={() => !seeOrder && !loginMenu && handleClick(99)} text="Menu" />
                {!customize && <Labels selected={soupFilter.selected} handleFilter={handleFilter} />}
                {!customize ?
                    soupFilter.filteredSoups.map((item, i) =>
                        <MenuItem categories={labels.filter(label => item.filter.includes(label))}
                            click={() => !seeOrder && !loginMenu && handleClick(i)} key={i} title={item.name} src={item.img} price={item.price + " kr"} />
                    )
                    :
                    <Customize loginMenu={loginMenu} customize={customize} handleOrder={handleOrder} choosenSoup={choosenSoup} src={choosenSoup.img} />
                }
                {!customize && cart ?
                    <OrderButtonContainer onClick={(e) => { e.stopPropagation() }} >

                        <OrderButton ref={orderButton} onClick={showOrder}>
                            {orderMessage}

                        </OrderButton>

                        <OrderSummary soups={localSoups} isItemRemoved={(value) => handleCart(value)} position={seeOrder} />

                    </OrderButtonContainer> : null}

            </Wrapper>
        </>
    );
}

export default Menu;
