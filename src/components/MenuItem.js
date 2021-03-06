import React, { useState } from 'react';
import styled from 'styled-components';

const Order = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 20px;
  bottom: 20px;
  height: 110px;
  width: 110px;
  transform:scale(0.9);
  text-align:center;
  background: #E05A33CC;
  padding: 5px;
  margin: 0;
  border-radius: 50%;
  box-shadow: 0 0 10px #5557;
  transition-duration: 0.2s;
`;
const OrderText = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 0.8rem;
  color: #fff;
`;
const LabelBox = styled.section`
  position: absolute;
  left: 10px;
  top: ${props => props.customize ? '10px' : '50px'};
`;
const Label = styled.span`
  display:inline-block;
  margin-right: 10px;
  height: 13px;
  font-family: 'Rubik Mono One', sans-serif;
  padding:7px 6px 5px 6px;
  background-color: ${props => props.edit ? "#e3714f" : "#FFCC00CC"};
  color: ${props => props.edit ? "#fff" : "#000"};
  border-radius: 5px;  
  font-size: 0.6rem;
`;
const SoupButton = styled.button`
  border:0;
  padding:0;
  height: ${props => props.customize ? '300px' : '480px'};
  width:100%;
  background-color: Transparent;
  margin-top:${props => props.customize ? '0px' : '5px'};
  @media (min-width: 600px) {
    margin: ${props => props.customize ? "60px 20px 20px 2px" : "20px"};
    height:480px;
    width:auto;
  }
`;
const SoupContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction:column;
  text-align:left;
  &:hover ${Order} {
    background: #f43c;
    transform: scale(1);
  }
  @media (min-width: 600px) {
    max-width: 290px;
  }
`;
const SoupTitle = styled.p`
  text-transform: uppercase;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 1rem;
  padding: 15px 10px 5px 10px;
  margin:0;
  @media (min-width: 600px) {
    padding: 15px 10px 5px 0px;
  }
`;
const Item = styled.img`
  height: ${props => props.customize ? '100%' : 'calc(100% - 40px)'};
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
`;

function MenuItem(props) {
  const [loaded, setLoaded] = useState(false)

  function handleLoad() {
    setLoaded(true);
  }
  function tellMenuIfLoaded() {
    if (loaded) return props.handleLoading(props.itemId, loaded);
  }

  return (
    <SoupButton customize={props.customize} onClick={props.click}>
      <SoupContainer >
        {!props.customize && <SoupTitle>{loaded && props.title}</SoupTitle>}
        <Item customize={props.customize} onLoad={handleLoad} style={{ display: loaded ? 'block' : 'none' }} src={props.src} />
        {!props.customize && tellMenuIfLoaded()}
        {props.edit && <LabelBox customize={true}><Label edit="true">EDIT</Label></LabelBox>}
        {loaded && !props.edit &&
          <div>
            <LabelBox customize={props.customize}>
              {props.categories.map((title, i) => <Label key={i}>{title}</Label>)}
            </LabelBox>
            <Price>{props.price}</Price>
            <Order><OrderText>{props.customize ? "Choose your favourite toppings!" : "Click to customize &\xa0order!"}</OrderText></Order>
          </div>}
      </SoupContainer>
    </SoupButton>
  )
}

export default MenuItem;