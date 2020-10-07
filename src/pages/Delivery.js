import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import firebase from '../components/firebase';
import Login from '../components/Login';
import DeliveryTime from '../components/DeliveryTime'

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${props => props.color || "#6094AA"};
  justify-content: center;
  align-items: center;  
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
const Input = styled.input`
  box-sizing: border-box;
  padding:11px;
  border: none;
  width:100%;
  border-radius: 5px;
  margin-bottom:10px;
  color: ${props => props.grey ? "#777" : "#000"};
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
    const [checkout, setCheckout] = useState(false)

    const history = useHistory();


    useEffect(() => {
        if (!loggedInUser && user) setLoggedInUser(getUserFromDatabase(user.uid));
        setTimeout(
            function () {
                if (loggedInUser === null && user === null) setUserLoaded(true)
            }, 4000)
    }, [user, loggedInUser, getUserFromDatabase]
    );


    function handleLogin() {
        setLoginMenu(!loginMenu);
    }

    function getUserFromDatabase(id) {
        let tempUser

        firebase.database().ref('/users').once('value', (snapshot) => {
            //firebase.database().ref('/users/').on('value', (snapshot) => {
            setUserLoaded(true)
            let userObj = snapshot.val();
            tempUser = userObj.filter(user => user.id === id)[0]

            if (!tempUser) {
                tempUser = {
                    "id": id,
                    "name": "",
                    "age": "",
                    "email": "",
                    "street": "",
                    "zip": "",
                    "city": "",
                    "orderHistory": []
                }
            }
            if (tempUser) updateUser(tempUser)
        })

        return tempUser
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
    function handleMessage(e) {
        if (message.length <= 100) setMessage(e.target.value)
        if (message.length === 100) setMessage(message.substring(0, 99))
        if (message.length > 100) setMessage(message.substring(0, 99))
    }

    function handleTime(time) {
        setDeliveryTime(time)
    }

    function handleOrder() {
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
            order,
        }
        let tempUser = loggedInUser
        // if (tempUser.orderHistory) tempUser.orderHistory.push({ date, order })
        // else tempUser.orderHistory = [{ date, order }]
        tempUser = { ...tempUser, street, zip, city }
        console.log(orderObj)
        console.log(tempUser)
        localStorage.setItem('localOrder', JSON.stringify(orderObj))
        localStorage.setItem('localUser', JSON.stringify(tempUser))
        history.push('/payment');
    }

    return !userLoaded ?
        (
            <LoginContainer color={"#fff"}><LoadingDots>Loading</LoadingDots></LoginContainer>
        ) :
        (loggedInUser ?
            <>
                <Wrapper>
                    <Header check={logOutOrInListener} showLogin={loginMenu} back={true} handleLogin={handleLogin} text="Menu" />
                    <DeliveryContainer>
                        <InputContainer>
                            <Checkbox onChange={handleRadio} type='radio' name="deliveryoptions" value="delivery" checked={deliveryOption === "delivery"} />
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
                        <InputContainer>
                            <DeliveryTime handleTime={handleTime} disabled={inputGrey}></DeliveryTime>
                        </InputContainer>
                        <InputContainer>
                            <Label bordert={true} grey={inputGrey}>Send a soupogram</Label>
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
                        <OrderButton onClick={handleOrder}>Checkout</OrderButton>

                    </DeliveryContainer>
                </Wrapper>
                {/* :
                    <LoginContainer style={{ "color": "#fff" }}>
                        Thank you!
                    </LoginContainer>
                } */}
            </>
            :
            <>
                <LoginContainer style={{ "color": "#fff" }}>
                    <Login check={logOutOrInListener} />
                </LoginContainer>
            </>
        )
}

export default Delivery;
