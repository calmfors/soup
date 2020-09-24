import React, { useState } from 'react';
import styled from 'styled-components';
import firebase, { auth } from "./firebase";

const Btn = styled.button`
  align-items: center;
`;

const TextBtn = styled.button`
  font-size: 1rem;
  background: none;
  border: 0;
`;

const Item = styled.img`
  height: 20px;
`;

function Login(props) {

    const [psw, setPsw] = useState(null);
    const [email, setEmail] = useState(null);
    const [register, setRegister] = useState(false);


    function handleRegister() {
        if (!register) setRegister(true);
        else {
            firebase.auth().createUserWithEmailAndPassword(email, psw);
        }
        console.log("email: " + email + " psw:" + psw);
    }
    function handleLogin() {
        firebase.auth().signInWithEmailAndPassword(email, psw)
            .catch(function (error) {
                // Handle Errors here.
                console.log(error.code);
                console.log(error.message);

                console.log("email: " + email + " psw:" + psw);
            })
    };
    function handleemail(e) {
        setEmail(e.target.value);
        console.log(email);
    }
    function handlePsw(e) {
        setPsw(e.target.value);
        console.log(psw);
    }
    return (
        <div>
            <label htmlFor="uemail"><b>Useremail</b></label>
            <input type="text" placeholder="Enter Useremail" email="uemail" required onChange={handleemail}></input><br />
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" email="psw" onChange={handlePsw} required></input><br />
            {register ?
                <Btn onClick={handleRegister}>Register</Btn>
                :
                [<Btn onClick={handleLogin}>Login</Btn>,
                <TextBtn onClick={handleRegister}>Register</TextBtn>
                ]
            }
        </div>
    );
}

export default Login;