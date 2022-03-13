import React from 'react';
import { BaseField } from '../form';
import * as S from './styles';

type BoolProps = {
} & BaseField;

export const Multichoice = ({ options, onChange, value }: BoolProps) => {
  if (value == undefined) {
    value = []
  }

  const handleClick = (clickedOption: Frontier.Option) => () => {
    const indexOf = value.indexOf(clickedOption)
    if (indexOf > -1) {
      value.splice(indexOf, 1)
    } else {
      value.push(clickedOption)
    }
    onChange(value)
  };

  return (
    <S.Multichoice>
      {options?.map((o) => (
        <S.MultichoiceOption key={o.label} onClick={handleClick(o)} $active={value.includes(o) }>
          {o.label}
        </S.MultichoiceOption>
      ))}
    </S.Multichoice>
  );
};
