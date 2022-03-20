import styled from "styled-components";

export const PrimaryButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.707rem 1.414rem;
  cursor: pointer;
  background: ${({theme}) => theme.primary_color};
  color: ${({theme}) => theme.background_color};
  text-align: center;
  border-radius: 0.5rem;
  border: none;
`;

export const SecondaryButton = styled.button`
  display: block;
  margin-bottom: 20px;
  width: 100%;
  padding: 0.707rem 1.414rem;
  cursor: pointer;
  background: ${({theme}) => theme.secondary_color};
  color: ${({theme}) => theme.background_color};
  text-align: center;
  border-radius: 0.5rem;
  border: none;
`;