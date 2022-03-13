import * as S from './styles';
import { ChangeEvent, FormEvent } from 'react';
import { BaseField } from '../form';

type TextProps = BaseField & {
  placeholder?: string
};

export const Text = ({ onChange, value, placeholder }: TextProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value || undefined);
  };

  return (
    <S.Frame>
      <S.Input placeholder={placeholder} type="text" value={value ?? ''} onChange={handleChange} />
    </S.Frame>
  );
};
