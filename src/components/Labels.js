import React from 'react';
import styled from 'styled-components';

const LabelContainer = styled.div`
  box-sizing:border-box;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: ${props => props.edit ? "static" : "fixed"};
  top: 40px;
  z-index: 1;
  margin-top: ${props => props.edit && "8px"};
  background-color:   ${props => props.edit ? "#efefef" : "#fffe"};
  @media (min-width: 600px) {
    height: ${props => props.edit ? "91px" : "40px"};
    padding: ${props => props.edit ? "7px 0 7px 0" : "0 0 0 calc(100vw - 100%)"};
    flex-wrap:${props => props.edit && "wrap"};
    justify-content: center;
    max-width: ${props => props.edit ? "100%" : "1300px"};
    left: 50%;
    transform: ${props => !props.edit && "translate(-50%, 0)"};
   }
`;

const Label = styled.button`
  height: 25px;
  color: ${props => props.selected ? '#fff' : '#000'};
  background-color: ${props => props.selected ? '#6094AA' : '#FFCC00'};
  border-radius: 5px;  
  font-size: 0.6rem;
  :hover{
    background-color:${props => props.selected ? '#81adbf' : '#ffe066'};
  }
  @media (min-width: 600px) {
    margin: 0 10px 0 10px;
  }
`;

function Labels(props) {
  const labelTitles = props.labels
  let labelRef = []
  for (let i = 0; i < labelTitles.length; i++) {
    labelRef.push(React.createRef());
  }

  return (
    <LabelContainer edit={props.edit} >
      {labelTitles.map((title, i) =>
        <Label ref={labelRef[i]} key={"d" + i} onClick={() => { props.handleFilter(i); labelRef[i].current.blur() }} selected={props.selected && props.selected.includes(i)}>{title}</Label>)}
    </LabelContainer>
  );
}

export default Labels;
