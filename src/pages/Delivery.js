import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import firebase from '../components/firebase';
import Login from '../components/Login';
import DeliveryTime from '../components/DeliveryTime'
import Address from '../components/Address';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${props => props.color || "#6094AA"};
  justify-content: center;
  align-items: center;  
  @media (min-width: 600px) {
    max-width: 600px;
  }
`
const LoadingDots = styled.p`
&:after {
  
  content: '.';
  animation: dots 1s steps(5, end) infinite;}

@keyframes dots {
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .5em 0 0 rgba(0,0,0,0),
      1em 0 0 rgba(0,0,0,0);}
  40% {
    color: black;
    text-shadow:
      .5em 0 0 rgba(0,0,0,0),
      1em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .5em 0 0 black,
      1em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .5em 0 0 black,
      1em 0 0 black;}}
`
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

function Delivery(props) {

    let user = firebase.auth().currentUser;
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem('localSoups')));
    const [loginMenu, setLoginMenu] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false)
    const [deliveryOption, setDeliveryOption] = useState("delivery")
    const [inputGrey, setInputGrey] = useState(false)
    const [name, setName] = useState("")
    const [street, setStreet] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [message, setMessage] = useState("")
    const [deliveryTime, setDeliveryTime] = useState("")
    // const [checkout, setCheckout] = useState(false)
    const [orderMessage, setOrderMessage] = useState("Checkout");
    const [addressLoaded, setAddressLoaded] = useState(false);


    const history = useHistory();

    const getUserFromDatabase = useCallback((id) => {
        let tempUser

        firebase.database().ref('/users').once('value', (snapshot) => {
            setUserLoaded(true)
            let userObj = snapshot.val();
            tempUser = userObj[id];
            if (tempUser) updateUser(tempUser)
        })

        return tempUser
    }, [])

    useEffect(() => {
        if (!loggedInUser && user) setLoggedInUser(getUserFromDatabase(user.uid));
        if (name && street && zip && city) setAddressLoaded(true)
        else if (loggedInUser && loggedInUser.city === "") setAddressLoaded(true)

        setTimeout(
            function () {
                if (loggedInUser === null && user === null) setUserLoaded(true)
            }, 4000)
    }, [user, loggedInUser, getUserFromDatabase, city, name, zip, street]);


    function handleLogin() {
        setLoginMenu(!loginMenu);
    }

    function updateUser(user) {
        setLoggedInUser(user)
        const { name, street, zip, city } = user;
        setName(name)
        setStreet(street)
        setZip(zip)
        setCity(city)
    }

    function logOutOrInListener(check) {
        if (check === false) {
            setLoginMenu(false)
            setLoggedInUser(null)
            user = null;
        } else {
            setLoggedInUser(getUserFromDatabase(check.uid))
            user = check;
        };
    }

    function handleRadio(r) {
        let id = r.target.value || r.target.id
        setDeliveryOption(id);
        if (id === "pickup") setInputGrey(true);
        else setInputGrey(false);
    }

    function handleMessage(e) {
        if (message.length <= 100) setMessage(e.target.value)
        if (message.length === 100) setMessage(message.substring(0, 99))
        if (message.length > 100) setMessage(message.substring(0, 99))
    }

    function handleTime(time) {
        setDeliveryTime(time)
    }

    function handleOrder() {
        if (deliveryTime !== "Closed") {
            let tempOrder = order
            tempOrder.forEach(tempItem => {
                delete tempItem.description
                delete tempItem.filter
            })
            const orderObj = {
                deliveryTime,
                delivery: deliveryOption === "delivery" ? {
                    name,
                    street,
                    zip,
                    city,
                } : {
                        pickup: true,
                    },
                message,
                order: tempOrder
            }
            let tempUser = loggedInUser
            // if (tempUser.orderHistory) tempUser.orderHistory.push({ date, order })
            // else tempUser.orderHistory = [{ date, order } 
            tempUser = { ...tempUser, name, street, zip, city }
            firebase.database().ref('/users/').child(user.uid).set(tempUser)
                .then((data) => {
                    console.log('Saved Data', data)
                })
                .catch((error) => {
                    console.log('Storing Error', error)
                })
            localStorage.setItem('localOrder', JSON.stringify(orderObj))
            localStorage.setItem('localUser', JSON.stringify(tempUser))
            history.push('/payment');
        } else {
            setOrderMessage("Sorry we are closed")
            setTimeout(
                function () {
                    setOrderMessage("Checkout")
                }, 1000)
        }
    }

    function getAddress(address) {
        const { name, street, zip, city } = address
        setName(name)
        setStreet(street)
        setZip(zip)
        setCity(city)
    }


    return !userLoaded ?
        (
            <Wrapper>
                <LoginContainer color={"#fff"}><LoadingDots>Loading</LoadingDots></LoginContainer>
            </Wrapper>
        ) : (
            <Wrapper>
                <Header hideProfile={true} showLogin={loginMenu} back={true} handleLogin={handleLogin} text="Menu" />
                {addressLoaded && userLoaded ?
                    <DeliveryContainer>
                        <InputContainer>
                            <Checkbox onChange={handleRadio} type='radio' name="deliveryoptions" value="delivery" checked={deliveryOption === "delivery"} />
                            <Label onClick={(r) => handleRadio(r)} id="delivery" htmlFor='delivery'>Delivery</Label><br />
                            {addressLoaded && <Address inputGrey={inputGrey} disabled={inputGrey} sendAddress={getAddress} name={name} street={street} zip={zip} city={city} />}
                        </InputContainer>
                        <InputContainer>
                            <DeliveryTime handleTime={handleTime} disabled={inputGrey}></DeliveryTime>
                        </InputContainer>
                        <InputContainer>
                            <Label bordert={true} grey={inputGrey}>Send a soup❤gram</Label>
                            <Text grey={inputGrey}>Make someone happy with a soup! Enter a greeting to your friend below. Max 100 char.</Text>
                            <Message
                                disabled={inputGrey}
                                id="message"
                                value={message}
                                onChange={handleMessage}
                                rows={3}
                            />

                        </InputContainer>
                        <InputContainer border={true} bordert={true}>
                            <Checkbox onChange={handleRadio} type='radio' name="deliveryoptions" value="pickup" checked={deliveryOption === "pickup"} />
                            <Label onClick={(r) => handleRadio(r)} id="pickup" htmlFor="pickup">Pick up at restaurant</Label><br />
                        </InputContainer>
                        <OrderButton onClick={handleOrder}>{orderMessage}</OrderButton>

                    </DeliveryContainer>
                    :

                    <>
                        <LoginContainer style={{ "color": "#fff" }}>
                            <Login color="white" check={logOutOrInListener} />
                        </LoginContainer>
                    </>}
            </Wrapper>

        )
}

export default Delivery;
