import * as S from './styles';
import { ChangeEvent, FormEvent } from 'react';
import { BaseField } from '../form';

type TextareaProps = BaseField & {
  placeholder?: string
};

export const Textarea = ({ onChange, value, placeholder }: TextareaProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value || undefined);
  };

  return (
    <S.Frame>
      <S.Textarea placeholder={placeholder} onChange={handleChange} value={value ?? ''} />
    </S.Frame>
  );
};
