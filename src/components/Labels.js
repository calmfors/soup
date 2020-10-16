import React from 'react';
import styled from 'styled-components';

const LabelContainer = styled.div`
  box-sizing:border-box;
  padding-left: calc(100vw - 100% + 5px);
  padding-right: 5px;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 40px;
  z-index: 1;
  background-color: #fffe;
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
  const labelTitles = props.labels
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
