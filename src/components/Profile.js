import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Address from './Address';
import Login from './Login';
import fb from '../graphics/facebook.png';
import insta from '../graphics/instagram.png';
import firebase from '../components/firebase';


const ProfileMenu = styled.div` 
  box-sizing: border-box;
  background-color: #fffe;  
  width: 100%;
  height: calc(100vh - 40px);
  position: absolute;
  right: ${props => props.open ? "0" : "-400px"};
  top: 40px;
  padding: 15px;
  text-align: left;
  transition: right 0.6s;
  @media (min-width: 600px) {
    // max-width: 50%;
    width: 400px;
    }
`;
const Fade = styled.section`
  opacity: ${props => props.visible ? "1" : "0"};
  transition-duration: 0.4s;
`;
const Hide = styled.section`
  position: relative;
  max-height: ${props => props.hide ? "0px" : "200px"};
  transition: max-height 0.3s ease-out;
  overflow: ${props => props.orders ? "auto" : "hidden"};
  margin: 0;
  padding: 0;
`;
const Title = styled.h1`
  display: inline-block;
  font-size: 1rem;
  color: #000;
  margin: 20px 0 20px 0;
  border-bottom: 1px solid grey;
  cursor:pointer;
  width:100%;
`;
const Rotate = styled.span`
  display: inline-block;
  margin-right: 5px;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  color: #000;
  transform: ${props => props.hide ? "rotate(90deg)" : "rotate(-90deg)"};
  transition-duration: 0.3s;
`;
const Text = styled.p`
  color: ${props => props.saved ? "#fff" : "#000"};
  font-size: 1rem;
  line-height: 1.4rem;
  background-color: ${props => props.saved && "#E05A33cc"};
  padding: ${props => props.saved ? "5px" : "0"};
  border-radius: 5px;
`;
const Saved = styled.div`
  position: absolute;
  left: 0;
  top: 25%;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`;
const TextBtn = styled.button`
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  background: none;
  margin: 0 0 10px 0;
  padding: 0;
  color: #E05A33;
`;
const Bottom = styled.div`
  opacity: ${props => props.visible ? "1" : "0"};
  bottom: ${props => !props.top && "0px"};
  position: ${props => props.top ? "static" : "absolute"};
  left: 15px;
  width:calc(100% - 30px);
  border-top: ${props => !props.top && "1px solid grey"};
  transition-duration: 0.3s;
  @media(min-width: 600px) {
    width: 100%;
    margin-top: 20px;
    position: static;
}
`;
const Image = styled.img`
  width: 6%;
  margin:10px 10px 10px 0;
`;

function ProfilePage(props) {
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
    const [hideContact, setHideContact] = useState(true)
    const [open, setOpen] = useState(false)
    const [loginDelay, setLoginDelay] = useState(false)
    const [edit, setEdit] = useState(false)

    const debounce = useCallback((callback, wait) => {
        let timeout;
        return (...args) => {
            window.removeEventListener('keyup', debounce())

            clearTimeout(timeout);
            timeout = setTimeout(function () { callback.apply(this, args) }, wait);
        };
    }, [])


    useEffect(() => {
        setTimeout(
            function () {
                setLoginDelay(true)
            }, 300)
        setOpen(true)
        if (userObj && !name) {
            const { name, street, zip, city } = userObj
            setName(name)
            setStreet(street)
            setZip(zip)
            setCity(city)
            if (name) setLoaded(true)
        }
        if (id && userObj && name && edit) {
            //setup before functions
            document.addEventListener('keyup', debounce(() => {
                // code you would like to run xxxx ms after the keyup event has stopped firing
                // further keyup events reset the timer, as expected
                // function saveToFirebase(user) {
                let tempUser = userObj
                let tempStreet = street.length > 2 ? street : ""
                let tempZip = zip.length > 2 ? zip : ""
                let tempCity = city.length > 2 ? city : ""
                tempUser = { ...tempUser, name, street: tempStreet, zip: tempZip, city: tempCity }
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

    }, [userObj, name, id, city, street, zip, edit, debounce])

    function getLoggedInUser(id, userObj) {
        setId(id)
        setUserObj(userObj)
    }

    function getAddress(address) {
        const { name, street, zip, city, edit } = address
        setName(name)
        setStreet(street)
        setZip(zip)
        setCity(city)
        setEdit(edit)
    }
    function handleClick(i) {
        let localSoups = JSON.parse(localStorage.getItem('localSoups'))
        let tempOrder = userObj.orderHistory[i].order
        tempOrder.forEach(order => {
            if (!order.choosenToppings) order.choosenToppings = [];
            if (localSoups) localSoups.push(order)
        });
        if (!localSoups) localSoups = tempOrder
        localStorage.setItem('localSoups', JSON.stringify(localSoups))
        props.close()
    }
    function setHide(e) {
        setHideAddress(e.target.id === 'address' ? !hideAddress : true);
        setHideContact(e.target.id === 'contact' ? !hideContact : true)
        setHideOrders(e.target.id === 'orders' ? !hideOrders : true)
    }

    return (
        <>
            <ProfileMenu open={open} onClick={(e) => { e.stopPropagation() }}>
                <Fade visible={loginDelay} >
                    <Title id="contact" onClick={setHide}><Rotate hide={hideContact}>{'>'}</Rotate>Contact</Title><br />
                    <Hide hide={hideContact}>
                        <Text>Pickup: Ringvägen 100</Text>
                        <Text>Follow us on Facebook and Instagram for offers and latest news!</Text>
                        <Image src={fb} /><Image src={insta} />
                    </Hide>
                    {userObj && name && <Title id="orders" onClick={setHide}><Rotate hide={hideOrders}>{'>'}</Rotate>My Orders</Title>}
                    {userObj && name &&
                        <Hide orders={!hideOrders} hide={hideOrders}>
                            {userObj.orderHistory ? userObj.orderHistory.map((order, i) =>
                                <div key={"c" + i} style={{ "borderBottom": "1px solid lightgrey" }}>
                                    <Text key={"a" + i}>{order.date + ": "}
                                        {order.order.map((soup, j) => (j + 1 !== order.order.length ? soup.name + ", " : soup.name))}</Text>
                                    <TextBtn key={"b" + i} onClick={() => handleClick(i)}>Order again</TextBtn>
                                </div>
                            ) : <Text>No previous orders</Text>}
                        </Hide>
                    }
                    {userObj && name && <Title id="address" onClick={setHide}><Rotate hide={hideAddress}>{'>'}</Rotate>My Address</Title>}
                    {userObj && name &&

                        <Hide hide={hideAddress}>
                            {saved && <Saved><Text saved={true}>Address saved</Text></Saved>}
                            {loaded && <Address sendAddress={getAddress} name={name} street={street} zip={zip} city={city} />}
                        </Hide>
                    }
                </Fade>
                {<Bottom visible={loginDelay} top={name === "" || name === undefined}><Login getLoggedInUser={getLoggedInUser} check={props.check} /></Bottom>}
            </ProfileMenu >
        </>
    )
}
export default ProfilePage; 