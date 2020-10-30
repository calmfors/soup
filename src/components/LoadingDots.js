import React from 'react';
import styled from 'styled-components';


const Dots = styled.h1`
  font-size: 1rem;
  &:after {
    content: '.';
    animation: dots 1s steps(5, end) infinite;}
  @keyframes dots {
    0%, 20% {
      color: rgba(0,0,0,0);
      text-shadow:
        .5em 0 0 rgba(0,0,0,0),
        1em 0 0 rgba(0,0,0,0);}
    40% {
      color: black;
      text-shadow:
        .5em 0 0 rgba(0,0,0,0),
        1em 0 0 rgba(0,0,0,0);}
    60% {
      text-shadow:
        .5em 0 0 black,
        1em 0 0 rgba(0,0,0,0);}
    80%, 100% {
      text-shadow:
        .5em 0 0 black,
        1em 0 0 black;}
      }
`;
const LoadingContainer = styled.div`
  box-sizing: border-box;
  padding-left: calc(100vw - 100%);
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${props => props.color || "#6094AA"};
  justify-content: center;
  align-items: center;
`;

function LoadingDots() {
  return (
    <LoadingContainer color="#fff">
      <Dots>Loading</Dots>
    </LoadingContainer>
  )
}
export default LoadingDots;