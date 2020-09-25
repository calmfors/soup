import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';
import Login from '../components/Login';

const Wrapper = styled.div`
margin:0 auto;
width: 100vw;
@media (min-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    flex-wrap: wrap;
  }

`

function Menu() {

    const [seeOrder, setSeeOrder] = useState(false);
    const [cart, setCart] = useState(0);
    const soups = [{ name: "Butternut Soup", price: "100" },
    { name: "Noodle Soup", price: "100" },
    { name: "Broccoli Soup", price: "100" },
    { name: "Ramen Soup", price: "100" }]

    return (
        <>
            <Header text="Menu" />
            <Login />
            <Wrapper>

                {soups.map((item, i) =>
                    <MenuItem key={i} title={item.name} src={i} price={item.price + " kr"} />
                )}
            </Wrapper>
        </>
    );
}

export default Menu;
