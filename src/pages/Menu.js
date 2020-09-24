import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';
import firebase from '../components/firebase';
import Login from '../components/Login';

function Menu() {

    const [seeOrder, setSeeOrder] = useState(false);
    const [cart, setCart] = useState(0);
    const soups = [{ name: "Butternut Soup", price: "100" },
    { name: "Noodle Soup", price: "100" },
    { name: "Broccoli Soup", price: "100" },
    { name: "Ramen Soup", price: "100" }]

    return (
        <div>
            <Header text="Menu" />
            <Login />
            {soups.map((item, i) =>
                <MenuItem title={item.name} src={i} price={item.price + " kr"} />
            )}
        </div>
    );
}

export default Menu;
