import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';
import firebase from '../components/firebase';
import Customize from '../components/Customize';
import Labels from '../components/Labels';
import soups from '../soups.json';
import OrderSummary from '../components/OrderSummary';
import LoadingDots from '../components/LoadingDots';

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: ${props => props.customize ? '38px' : '75px'};
  width: 100%;
  &:last-child{
      margin-bottom: ${props => props.orderButton || props.customize ? "60px" : "0px"};
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
  left: 0;
  height: 50px;
  width: 100%;
  margin-left: calc((100vw - 100%)/2);
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
  background-color: #6094AA;
  &:hover{
    background-image: radial-gradient(#81adbf, #6094AA);
  }
`;

const Fade = styled.div`
  position: absolute;
  background-color: #fff;
  opacity: ${props => props.loaded ? "0" : "1"};
  transition-duration: 0.5s;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(100vw - (100vw - 100%));
`


function Menu() {

    let localSoups = JSON.parse(localStorage.getItem('localSoups')) || [];
    const [loggedInUser, setLoggedInUser] = useState(false)
    const [seeOrder, setSeeOrder] = useState(false);
    const [cart, setCart] = useState(localSoups.length);
    const [orderMessage, setOrderMessage] = useState(`See order (${cart})`);
    const [choosenSoup, setChoosenSoup] = useState(null);
    const [customize, setCustomize] = useState(false);
    const [back, setBack] = useState(false);
    const [loginMenu, setLoginMenu] = useState(false);
    // const [showOrder, setShowOrder] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hideFade, setHideFade] = useState(false);
    const [soupFilter, setSoupFilter] = useState({
        selected: null,
        filteredSoups: soups,
    });

    const labels = ['vegetarian', 'vegan', 'chicken', 'fish', 'meat'];
    const orderButton = React.createRef();
    let user = firebase.auth().currentUser ? firebase.auth().currentUser : 'no user';

    useEffect(() => {
        if (firebase.auth().currentUser) setLoggedInUser(true)
        if (localSoups) setCart(localSoups.length)
    }, [localSoups])

    function handleClick(i) {
        if (i !== 99) {
            setSeeOrder(false);
            setBack(true);
            setCustomize(true);
            setChoosenSoup(soupFilter.filteredSoups[i]);
        } else {
            setChoosenSoup(null)
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
                let tempSoups = soups
                const selectedSoups = tempSoups.filter(tempSoup => tempSoup.filter.includes(labels[i]))
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
        setSeeOrder(!seeOrder)
    }

    function handleOrder(updateTopping, toppings) {
        const choosenToppings = []
        updateTopping.map((topping, i) => {
            if (topping === true) choosenToppings.push(toppings[i].name)
            return choosenToppings
        })
        choosenSoup.choosenToppings = choosenToppings

        // if (!localSoups) localSoups = []
        localSoups.push(choosenSoup)
        localStorage.setItem('localSoups', JSON.stringify(localSoups))
        setBack(false)
        setCustomize(false);
        setSoupFilter({
            selected: null,
            filteredSoups: soups
        })
        setCart(localSoups.length);
        setOrderMessage(`${choosenSoup.name} added`)
        setChoosenSoup(null)
        setTimeout(
            function () {
                setOrderMessage(`See order (${localSoups.length})`)
            }, 1000)
    }

    function logOutOrInListener(check) {
        if (check === false) {
            setLoginMenu(false)
            setLoggedInUser(false)
            user = null;
        } else {
            setLoggedInUser(true)
            user = check;
        };
    }

    function handleLogin() {
        setLoginMenu(!loginMenu);
    }

    function closeMenus() {
        seeOrder && setSeeOrder(false)
        loginMenu && setLoginMenu(false)
    }

    function handleCart(value) {
        setCart(cart - 1)
        let tempLocalSoups = localSoups
        tempLocalSoups.splice(value, 1)
        localSoups = tempLocalSoups
        setOrderMessage(`See order (${tempLocalSoups.length})`)
        localStorage.setItem('localSoups', JSON.stringify(tempLocalSoups))
        if (tempLocalSoups.length === 0) setSeeOrder(false)
    }
    function handleLoad(loaded) {
        let loadedArray = []
        if (loaded) loadedArray.push(loaded)
        if (loadedArray.length = localSoups.length) {
            setTimeout(
                function () {
                    setLoaded(true)
                }, 1000)
            setTimeout(
                function () {
                    setHideFade(true)
                }, 1500)
        } else {
            setTimeout(
                function () {
                    setLoaded(true)
                }, 1500)
            setTimeout(
                function () {
                    setHideFade(true)
                }, 2000)
        }
    }

    return (
        <>
            <Wrapper onClick={closeMenus} customize={customize} orderButton={cart}>

                <Header check={logOutOrInListener} showLogin={loginMenu} back={back} handleLogin={handleLogin} handleClick={() => !seeOrder && !loginMenu && handleClick(99)} text="Menu" />

                {!customize && <Labels selected={soupFilter.selected} handleFilter={handleFilter} />}
                {!customize &&
                    soupFilter.filteredSoups.map((item, i) =>
                        <MenuItem handleLoading={handleLoad} customize={customize} categories={labels.filter(label => item.filter.includes(label))}
                            click={() => !seeOrder && !loginMenu && handleClick(i)} key={i} title={item.name} src={item.img} price={item.price + " kr"} />
                    )}
                {customize &&
                    <Customize loginMenu={loginMenu} customize={customize} handleOrder={handleOrder} choosenSoup={choosenSoup} src={choosenSoup.img} />
                }
                {!customize && cart > 0 &&
                    <OrderButtonContainer onClick={(e) => { e.stopPropagation() }}>

                        <OrderButton ref={orderButton} onClick={showOrder}>
                            {orderMessage}

                        </OrderButton>

                        <OrderSummary loggedIn={loggedInUser} soups={localSoups} isItemRemoved={(value) => handleCart(value)} position={seeOrder} />

                    </OrderButtonContainer>}
                {!hideFade && <Fade loaded={loaded}> <LoadingDots /></Fade>}
            </Wrapper>
        </>
    );
}

export default Menu;
