import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from './firebase';

const Btn = styled.button`
  align-items: center;
  margin-top:10px;
  margin-bottom:10px;
  border: 0;
  background-color:#E05A33;
  color:white;
  padding:2px 10px 2px 10px;
  &:focus {
      outline-color: #F005;
  }
`;

const TextBtn = styled.button`
  font-size: 0.7rem;
  background: none;
  border: 0;
`;

const Label = styled.p`
  margin: 10px 0 2px 0;
`;

function Login(props) {

    const [name, setName] = useState('');
    const [psw, setPsw] = useState('');
    const [email, setEmail] = useState('');
    const [register, setRegister] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const mainButton = React.createRef();

    console.log("Login mounted")
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
    }, [loggedIn]);

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
                })
            setRegister(false);

        }
        console.log('email: ' + email + ' psw:' + psw);
    }

    function handleLogin(event) {
        if (register) setRegister(false);
        mainButton.current.focus();
        if (loggedIn) firebase.auth().signOut().then(function () {
            setLoggedIn(false);
            setLoggedInUser(null);
            console.log('Logged out!')
            props.check(false);
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
        if (!loggedIn && email && psw) firebase.auth().signInWithEmailAndPassword(email, psw).then(function () {
            var user = firebase.auth().currentUser;
            setLoggedIn(true);
            setEmail('')
            setPsw('');
            console.log('Logged in!')
            getUsers(user.uid)
            props.check(firebase.auth().currentUser);
        }).catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        })
        setEmail('')
        setPsw('');
    };

    function getUsers(id) {
        console.log(id)
        firebase.database().ref('/users/' + id).once('value', (snapshot) => {
            // console.log(user);
            const userObj = snapshot.val();
            // const user = userObj.filter(user => user.id === id)
            setLoggedInUser(userObj);
        });
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePsw(e) {
        setPsw(e.target.value);
    }
    function handleName(e) {
        setName(e.target.value);
    }
    return (
        < div >
            <p>{loggedInUser && 'Hello ' + loggedInUser.name} </p>
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
        </div >
    );
}

export default Login;