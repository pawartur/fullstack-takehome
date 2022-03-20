import React, { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'changeSection';
}

export const Button = ({onClick, type, children}: ButtonProps) => {
  const elementType = type === 'changeSection' ? S.SecondaryButton : S.PrimaryButton

  if (type == 'changeSection') {
    return (
      <S.SecondaryButton 
        onClick={onClick}>
        {children}
      </S.SecondaryButton>
    )
  } else {
    return (
      <S.PrimaryButton 
        onClick={onClick}>
        {children}
      </S.PrimaryButton>
    )
  }
}