import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from './firebase';

const Btn = styled.button`
  align-items: center;
`;

const TextBtn = styled.button`
  font-size: 1rem;
  background: none;
  border: 0;
`;

function Login(props) {

    const [psw, setPsw] = useState('');
    const [email, setEmail] = useState('');
    const [register, setRegister] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);



    function handleRegister() {
        if (!register) setRegister(true);
        else {
            firebase.auth().createUserWithEmailAndPassword(email, psw);
            setRegister(false);

        }
        console.log('email: ' + email + ' psw:' + psw);
    }

    function handleLogin() {
        if (loggedIn) firebase.auth().signOut().then(function () {
            setLoggedIn(false);
            setLoggedInUser(null);
            console.log('Logged out!')
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
        firebase.database().ref('/users/').on('value', (snapshot) => {
            const userObj = snapshot.val();
            const user = userObj.filter(user => user.id === id)
            setLoggedInUser(user[0]);
        });
    }
    function handleemail(e) {
        setEmail(e.target.value);
    }
    function handlePsw(e) {
        setPsw(e.target.value);
    }
    console.log(loggedInUser)

    return (
        < div >
            { loggedInUser && 'Hello ' + loggedInUser.name}
            {
                !loggedIn &&
                <div>
                    <label htmlFor='uemail'><b>Useremail</b></label>
                    <input type='text' placeholder='Enter Useremail' email='uemail' required onChange={handleemail} value={email}></input><br />
                    <label htmlFor='psw'><b>Password</b></label>
                    <input type='password' placeholder='Enter Password' email='psw' onChange={handlePsw} value={psw} required></input><br />
                </div>
            }
            {
                register ?
                    <Btn onClick={handleRegister}>Register</Btn>
                    :
                    [<Btn key='a' onClick={handleLogin}>{loggedIn ? 'Log out' : 'Log in'}</Btn>,
                    !loggedIn && <TextBtn key='b' onClick={handleRegister}>Register</TextBtn>
                    ]
            }
        </div >
    );
}

export default Login;