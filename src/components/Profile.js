import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Address from './Address';
import Login from './Login';
import firebase from '../components/firebase';
import { useHistory } from 'react-router-dom';


const ProfileMenu = styled.div`
  box-sizing: border-box;
  background-color: #fffe;  
  width: 100%;
  height: calc(100vh - 40px);
  position: absolute;
  right:0;
  top:40px;
  padding:15px;
  text-align:left;
  @media (min-width: 600px) {
    // max-width: 50%;
    width: 400px;
    }
`;
const Hide = styled.section`
  position:relative; 
  max-height: ${props => props.hide ? "0px" : "200px"};
  transition: max-height 0.3s ease-out;
  overflow: auto;
  margin:0;
  paddnig:0;
`
const Title = styled.p`
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  color: #000;
  margin: 20px 0 20px 0;
  border-bottom: 1px solid black;
  cursor:pointer;
  
`;
const Rotate = styled.span`
  display: inline-block;
  margin-right:5px;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  color: #000;
  transform: ${props => props.hide ? "rotate(90deg)" : "rotate(-90deg)"};
  transition-duration: 0.3s;
`;
const Text = styled.p`
  font-family: 'Rubik', sans-serif;
  color: ${props => props.saved ? "#fff" : "#000"};
  font-size: 1rem;
  line-height: 1.4rem;
  background-color: ${props => props.saved && "#E05A33cc"};
  padding: ${props => props.saved && "5px"};
  border-radius: 5px;
`
const Saved = styled.div`
  position: absolute;
  left: 0;
  top: 25%;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`
const TextBtn = styled.button`
  font-size: 1rem;
  font-weight: 500;
  background: none;
  border: 0;
  margin: 0 0 10px 0;
  padding: 0;
  color: #E05A33;
`;
const Bottom = styled.div`
 position: fixed;
 bottom: ${props => !props.top && "20px"};
 top: ${props => props.top && "60px"};
 left:20px;
 width:calc(100% - 40px);
 border-top: ${props => !props.top && "1px solid grey"};
 transition-duration: 0.3s;
 @media(min-width: 600px) {
    margin-top: 20px;
    position: static;
}
`
function ProfilePage(props) {
    // console.log(props.loggedInUser)
    const [id, setId] = useState("")
    const [userObj, setUserObj] = useState(null)
    const [name, setName] = useState("")
    const [street, setStreet] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [saved, setSaved] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [hideAddress, setHideAddress] = useState(true)
    const [hideOrders, setHideOrders] = useState(true)

    const history = useHistory();

    const debounce = useCallback((callback, wait) => {
        let timeout;
        return (...args) => {
            window.removeEventListener('keyup', debounce())

            clearTimeout(timeout);
            timeout = setTimeout(function () { callback.apply(this, args) }, wait);
        };
    }, [])


    useEffect(() => {
        if (userObj && !name) {
            const { name, street, zip, city } = userObj
            console.log("USEEFFECT")
            setName(name)
            setStreet(street)
            setZip(zip)
            setCity(city)
            if (name) setLoaded(true)
        }
        if (id && userObj && name) {
            //setup before functions
            console.log("USEEFFECT2")

            document.addEventListener('keyup', debounce(() => {
                // code you would like to run xxxx ms after the keyup event has stopped firing
                // further keyup events reset the timer, as expected
                // function saveToFirebase(user) {
                let tempUser = userObj
                tempUser = { ...tempUser, name, street, zip, city }
                localStorage.setItem('localUser', JSON.stringify(tempUser))
                firebase.database().ref('/users/').child(id).set(tempUser)
                    .then((data) => {
                        console.log('Saved Data', data)
                    })
                    .catch((error) => {
                        console.log('Storing Error', error)
                    })
                setSaved(true)
                setTimeout(
                    function () {
                        setSaved(false)
                    }, 2000)
                // }
            }, 2000))
        }

    }, [userObj, name, id, city, street, zip, debounce])



    function getLoggedInUser(id, userObj) {
        setId(id)
        setUserObj(userObj)
    }

    function getAddress(address) {
        console.log(address)
        const { name, street, zip, city } = address
        setName(name)
        setStreet(street)
        setZip(zip)
        setCity(city)
    }
    function handleClick(i) {
        let localSoups = JSON.parse(localStorage.getItem('localSoups'))
        let tempOrder = userObj.orderHistory[i].order
        tempOrder.forEach(order => {
            if (!order.choosenToppings) order.choosenToppings = [];
            if (localSoups) localSoups.push(order)
        });
        localStorage.setItem('localSoups', JSON.stringify(localSoups))
        // history.push('/delivery');
        //history.push('/');
        props.close()
    }

    return (
        <>
            <ProfileMenu onClick={(e) => { e.stopPropagation() }}>
                {userObj && name &&
                    <>
                        <Title onClick={() => setHideOrders(!hideOrders)}><Rotate hide={hideOrders}>{'>'}</Rotate>My Orders</Title>
                        <Hide hide={hideOrders}>
                            {userObj.orderHistory ? userObj.orderHistory.map((order, i) =>
                                <div key={"c" + i} style={{ "borderBottom": "1px solid lightgrey" }}>
                                    <Text key={"a" + i}>{order.date + ": "}
                                        {order.order.map((soup, j) => (j + 1 !== order.order.length ? soup.name + ", " : soup.name))}</Text>
                                    <TextBtn key={"b" + i} onClick={() => handleClick(i)}>Order again</TextBtn>
                                </div>
                            ) : <Text>No previous orders</Text>}
                        </Hide>
                        <Title onClick={() => setHideAddress(!hideAddress)}><Rotate hide={hideAddress}>{'>'}</Rotate>Change Address</Title>
                        <Hide hide={hideAddress}>
                            {saved && <Saved><Text saved={true}>Address saved</Text></Saved>}
                            {loaded && <Address sendAddress={getAddress} name={name} street={street} zip={zip} city={city} />}
                        </Hide>
                    </>}
                <Bottom top={name === "" || name === undefined}><Login getLoggedInUser={getLoggedInUser} check={props.check} /></Bottom>

            </ProfileMenu >
        </>
    )
}
export default ProfilePage; 