import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';

function Menu() {

    const [seeOrder, setSeeOrder] = useState(false);
    const [cart, setCart] = useState(0);

    return (
        <div>
            <Header text="Menu" />
            <MenuItem />
        </div>
    );
}

export default Menu;
