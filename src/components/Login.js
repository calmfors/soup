import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import firebase from './firebase';

const Btn = styled.button`
  font-family: 'Rubik', sans-serif;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #E05A33;
  color: white;
  padding: 2px 10px 2px 10px;
  &:focus {
    outline-color: #F005;
  }
`;
const TextBtn = styled.button`
  font-family: 'Rubik', sans-serif;
  font-size: 0.8rem;
  background: none;
`;
const Label = styled.h1`
  font-size: 1rem;
  margin: 10px 0 2px 0;
`;
const Text = styled.p`
  font-family: 'Rubik', sans-serif;
  color: #000;
  font-size: 1rem;
`;
const Error = styled(Text)`
  font-size: 0.8rem;
  color: ${props => props.color === "white" ? "#fff" : "#f00"};
`;

function Login(props) {

    const [name, setName] = useState('');
    const [psw, setPsw] = useState('');
    const [email, setEmail] = useState('');
    const [register, setRegister] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const mainButton = React.createRef();
    const { getLoggedInUser } = props
    const [errorMessage, setErrorMessage] = useState("\xa0");

    const getUsers = useCallback((id) => {
        firebase.database().ref('/users/' + id).once('value', (snapshot) => {
            // console.log(user);
            const userObj = snapshot.val();
            // const user = userObj.filter(user => user.id === id)
            if (!loggedInUser) setLoggedInUser(userObj);
            if (getLoggedInUser) getLoggedInUser(id, userObj)

        });
    }, [])

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth()
            .onAuthStateChanged(
                (user) => setLoggedIn(!!user)
            );
        const user = loggedIn && firebase.auth().currentUser
        if (user) getUsers(user.uid)
        return () => {
            unregisterAuthObserver();
        }

    }, [loggedIn, getUsers]);

    function handleRegister() {
        mainButton.current.focus();
        if (!register) setRegister(true);
        else {
            firebase.auth().createUserWithEmailAndPassword(email, psw)
                .then(function (userCredential) {
                    let tempUser = {
                        name,
                        "born": "",
                        email,
                        "street": "",
                        "zip": "",
                        "city": "",
                        "orderHistory": []
                    }

                    firebase.database().ref('/users/').child(userCredential.user.uid).set(tempUser)
                        .then((data) => {
                            console.log('Saved Data', data)
                        })
                        .catch((error) => {
                            console.log('Storing Error', error)
                        })
                    props.check(tempUser);
                    setLoggedIn(true);
                    setRegister(firebase.auth().currentUser);

                }).catch(function (error) {
                    console.log(error.code);
                    console.log(error.message);
                    if (error.message.includes("Password")) setErrorMessage("Password must be at least six characters long.")
                    if (error.message.includes("mail")) setErrorMessage("Please enter a valid e-mail address.")
                })

        }
    }

    function handleLogin(event) {
        if (register) setRegister(false);
        mainButton.current.focus();
        if (loggedIn) firebase.auth().signOut().then(function () {
            //setLoggedIn(false);
            //setLoggedInUser(null);
            console.log('Logged out!')
            props.check(false);
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
        if (!loggedIn && email && psw) firebase.auth().signInWithEmailAndPassword(email, psw).then(function () {
            // var user = firebase.auth().currentUser;
            //setLoggedIn(true);
            // setEmail('')
            // setPsw('');
            console.log('Logged in!')
            // getUsers(user.uid)
            props.check(firebase.auth().currentUser);
        }).catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            setErrorMessage("Wrong password or e-mail address.")

        })
        // setEmail('')
        // setPsw('');
    };

    function handleEmail(e) {
        if (errorMessage.length > 5) {
            setTimeout(
                function () {
                    setErrorMessage("\xa0")
                }, 1000)
        }
        setEmail(e.target.value);
    }
    function handlePsw(e) {
        if (errorMessage.length > 5) {
            setTimeout(
                function () {
                    setErrorMessage("\xa0")
                }, 1000)
        }
        setPsw(e.target.value);
    }
    function handleName(e) {

        if (errorMessage.length > 5) {
            setTimeout(
                function () {
                    setErrorMessage("\xa0")
                }, 1000)
        }
        setName(e.target.value);
    }
    return (
        < div >
            <Text>{loggedInUser && 'Logged in as ' + loggedInUser.name} </Text>
            {
                !loggedIn &&
                <div>
                    {register &&
                        <>
                            <label htmlFor='name'><Label>Name</Label></label>
                            <input type='text' placeholder='Enter Name' email='name' required onChange={handleName} value={name}></input><br />
                        </>}
                    <label htmlFor='email'><Label>Email</Label></label>
                    <input type='text' placeholder='Enter Email' email='email' required onChange={handleEmail} value={email}></input><br />
                    <label htmlFor='psw'><Label>Password</Label></label>
                    <input type='password' placeholder='Enter Password' email='psw' onChange={handlePsw} value={psw} required></input><br />
                </div>
            }
            {
                register ?
                    [<Btn key='a' onClick={handleRegister} ref={mainButton}>Register</Btn>, <TextBtn key='b' onClick={handleLogin}>Log in</TextBtn>]
                    :
                    [<Btn key='a' onClick={handleLogin} ref={mainButton}>{loggedIn ? 'Log out' : 'Log in'}</Btn>,
                    !loggedIn && <TextBtn key='b' onClick={handleRegister}>Register</TextBtn>
                    ]
            }
            <Error color={props.color}>{errorMessage}</Error>

        </div >
    );
}

export default Login;