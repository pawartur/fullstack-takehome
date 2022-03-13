import styled from 'styled-components';

export const Frame = styled.div``;

export const Multichoice = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

export const MultichoiceOption = styled.li<{$active: boolean}>`
  display: block;
  flex-basis: 100%;
  padding: ${Math.pow(1.414, -2)}rem 1.414rem;
  cursor: pointer;
  background: ${({theme, $active}) => $active ? theme.primary_color : 'transparent'};
  color: ${({theme, $active}) => $active ? theme.background_color : 'black'};
  text-align: center;
  border-radius: ${Math.pow(1.414, -3)}rem;
`;
