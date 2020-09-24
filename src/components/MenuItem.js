import React from 'react';
import styled from 'styled-components';
import img0 from '../img/1.png'
import img1 from '../img/2.png'
import img2 from '../img/3.png'
import img3 from '../img/4.png'

const images = [img0, img1, img2, img3];

const SoupContainer = styled.header`
  position: relative;
  height: 480px;
  display: flex;
  flex-direction:column;
  margin-top:10px;
  text-align:left;
`;

const SoupTitle = styled.p`
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  padding: 10px;
  margin:0;
`;

const Item = styled.img`
  height: 440px;
  object-fit: cover;
`;

const Price = styled.p`
  position: absolute;
  right: 10px;
  bottom: 10px;
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  background: #fff7;
  border: 0;
  padding: 5px;
  margin:0;
  border-radius:4px;
`

function MenuItem(props) {

    return (
        <SoupContainer>
            <SoupTitle>{props.title}</SoupTitle>
            <Item src={images[props.src]} />
            <Price>{props.price}</Price>
        </SoupContainer>
    );
}

export default MenuItem;
