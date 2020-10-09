import React from 'react';
import styled from 'styled-components';

// const LabelContainer = styled.div`
//   margin-left: calc(100vw - 100%);
//   box-sizing:border-box;
//   position: fixed;
//   display: flex;
//   justify-content: space-around;
//   width: 100%;
//   height: 28px;
//   top: 40px;
//   background-color: #fffe;
//   z-index:1;
//   padding: 10px 5px 5px 5px;
//   @media (min-width: 600px) {
//     justify-content: center;
//     max-width: 1350px;
//     left: 50%;
//     transform: translate(-50%, 0);
//   }
// `;

const LabelContainer = styled.header`
  margin: 0 auto;
  box-sizing:border-box;
  padding-left: calc(100vw - 100% + 5px);
  padding-top:10px;
  padding-right: 5px;
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 40px;
  z-index: 1;
  background-color: #fffe;
  justify-content: space-between;
  @media (min-width: 600px) {
    justify-content: center;
    max-width: 1300px;
    left: 50%;
    transform: translate(-50%, 0);
   }
`;


const Label = styled.button`
  height: 25px;
  font-family: 'Rubik Mono One', sans-serif;
  color: ${props => props.selected ? '#fff' : '#000'};
  background-color: ${props => props.selected ? '#6094AA' : '#FFCC00'};
  border:0;
  border-radius: 5px;  
  font-size: 0.6rem;
  :hover{
    background-color:${props => props.selected ? '#81adbf' : '#ffe066'};
  }
  @media (min-width: 600px) {
    margin:0 10px 0 10px;
  }
`;

function Labels(props) {
  const labelTitles = ['Vegetarian', 'Vegan', 'Chicken', 'Fish', 'Meat']
  let labelRef = []
  for (let i = 0; i < labelTitles.length; i++) {
    labelRef.push(React.createRef());
  }

  return (
    <LabelContainer>
      {labelTitles.map((title, i) =>
        <Label ref={labelRef[i]} key={"d" + i} onClick={() => { props.handleFilter(i); labelRef[i].current.blur() }} selected={i === props.selected}>{title}</Label>)}
    </LabelContainer>
  );
}

export default Labels;
