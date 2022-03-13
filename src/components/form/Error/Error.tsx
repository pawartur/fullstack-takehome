import React from 'react';
import { BaseField } from '../form';
import * as S from './styles';

type ErrorProps = {
  message: string
};

export const Error = ({ message }: ErrorProps) => {
  return (
    <S.Error>
      {message}
    </S.Error>
  );
};
