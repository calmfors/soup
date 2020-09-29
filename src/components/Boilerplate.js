import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from './firebase';

const Container = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
`;

function Xxxxxxx(props) {
    const [showLogin, setShowLogin] = useState(false);

    function handleClick() {
        setShowLogin(!showLogin);
    }
    console.log(showLogin);

    return (
        <>
            <MenuItem title={props.title} src={props.src} price={props.price + " kr"} />
        </>
    );
}

export default Xxxxxxxx;
