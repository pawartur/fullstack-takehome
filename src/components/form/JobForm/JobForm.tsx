import React from 'react';
import { Bool, Button, Field, Text, Textarea } from 'components';
import { useFormValues } from 'hooks';
import { ThemeProvider } from 'styled-components';
import * as S from '../../Demo/styles';

type JobFormProps = {
    job: Frontier.Job
};

export const JobForm = ({ job }: JobFormProps) => {
  const { values, handleChange } = useFormValues(job);

  const onChangeFn = (id: string) => (nextVal: string) =>
    handleChange(id, nextVal);

  const handleSubmit = () => {
    console.log('submit vals: %o', values);
  };

  const renderSectionElement = (element: Frontier.Element) => {
    let renderedElement: React.ReactElement
    switch (element.type) {
      case 'text': {
        renderedElement = (<Text onChange={onChangeFn(element.id)} value={values?.[element.id]} />)
        break
      }
      case 'textarea': {
        renderedElement = (<Textarea onChange={onChangeFn(element.id)} value={values?.[element.id]} />)
        break
      }
      case 'boolean': {
        renderedElement = (<Bool onChange={onChangeFn(element.id)} value={values?.[element.id]} />)
        break
      }
      case 'multichoice': {
        renderedElement = (
          <Field label='Multichoice - unsupported'>
            {element.question_text}
          </Field>
        )
        break
      }
    }

    return (
      <Field label={element.question_text}>
        {renderedElement}
      </Field>
    )
  }

  const renderSection = (section: Frontier.Section) => {
    return (
        <div>
          <Field>
            <h2>{section.title}</h2>
          </Field>
          {section.content.map(renderSectionElement)}
        </div>
      );
  }

  return (
    <ThemeProvider theme={job.theme}>
      <S.Frame>
        <S.Elements>
          <Field label='Job Title'>
            <h1>{job.job.title}</h1>
          </Field>
          {job.sections.map(renderSection)}
          <Button onClick={handleSubmit}>Button</Button>
        </S.Elements>
        <S.Readout>
          {JSON.stringify(values, null, 4)}
        </S.Readout>
      </S.Frame>
    </ThemeProvider>
  );
}
