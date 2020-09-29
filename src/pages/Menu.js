import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';
import firebase from '../components/firebase';
import Customize from '../components/Customize';
import Labels from '../components/Labels';
import soups from '../soups.json';

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: ${props => props.customize ? '38px' : '75px'};
  width: 100%;
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
    const [choosenSoup, setChoosenSoup] = useState(null);
    const [customize, setCustomize] = useState(false);
    const [back, setBack] = useState(false);
    const [selected, setSelected] = useState(null);
    const [soupFilter, setSoupFilter] = useState({
        selected: null,
        filteredSoups: soups,
    });
    const labels = ['vegetarian', 'vegan', 'chicken', 'fish', 'meat'];


    const user = firebase.auth().currentUser ? firebase.auth().currentUser : 'no user';
    console.log("From menu: " + user.uid)

    function handleClick(i) {
        if (i !== 99) {
            setBack(true);
            setCustomize(true);
            setChoosenSoup(soupFilter.filteredSoups[i]);
        } else {
            setBack(false)
            setCustomize(false);
            setSoupFilter({
                selected: null,
                filteredSoups: soups
            })
        }
    }
    function handleFilter(i) {
        if (i !== soupFilter.selected && i !== null) {
            const selectedSoups = soups.filter(soup => soup.filter.includes(labels[i]))
            setSoupFilter({
                selected: i,
                filteredSoups: selectedSoups
            })
        }
        else setSoupFilter({
            selected: null,
            filteredSoups: soups
        })
    }


    return (
        <>
            <Header back={back} handleClick={() => handleClick(99)} text="Menu" />
            {!customize && <Labels selected={soupFilter.selected} handleFilter={handleFilter} />}
            <Wrapper customize={customize}>
                {!customize ?
                    soupFilter.filteredSoups.map((item, i) =>
                        <MenuItem categories={labels.filter(label => item.filter.includes(label))}
                            click={() => handleClick(i)} key={i} title={item.name} src={i} price={item.price + " kr"} />
                    )
                    :
                    <Customize customize={customize} choosenSoup={choosenSoup} src="0" />
                }


            </Wrapper>
        </>
    );
}

export default Menu;
