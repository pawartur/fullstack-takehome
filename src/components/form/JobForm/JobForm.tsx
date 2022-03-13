import { useState} from 'react';
import { Bool, Button, Field, Text, Textarea, Multichoice } from 'components';
import { useFormValues } from 'hooks';
import { ThemeProvider } from 'styled-components';
import * as S from '../../Demo/styles';
import { postValuesToApplyAPI } from '../../../helpers/applyAPI';

type JobFormProps = {
  absoluteURL: string,
  job: Frontier.Job
};

export const JobForm = ({ absoluteURL, job }: JobFormProps) => {
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const { values, handleChange } = useFormValues(job);

  const onChangeFn = (id: string) => (nextVal: string) =>
    handleChange(id, nextVal);

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    } else {
      setIsSubmitting(true)
      postValuesToApplyAPI(
        absoluteURL,
        values
      ).then((response) => {
        console.log('submit response: %o', response);
        if (response.status == 200) {
          alert(job.messages.success)
        } else {
          alert("Something went wrong")
        }
        setIsSubmitting(false)
      })
    }
  };

  const renderSectionElement = (element: Frontier.Element) => {
    let renderedElement: React.ReactElement
    switch (element.type) {
      case 'text': {
        renderedElement = (
          <Text 
            placeholder={element.metadata.placeholder}
            onChange={onChangeFn(element.id)} 
            value={values?.[element.id]} 
          />
        )
        break
      }
      case 'textarea': {
        renderedElement = (
          <Textarea 
            placeholder={element.metadata.placeholder}
            onChange={onChangeFn(element.id)} 
            value={values?.[element.id]} 
          />
        )
        break
      }
      case 'boolean': {
        renderedElement = (<Bool onChange={onChangeFn(element.id)} value={values?.[element.id]} />)
        break
      }
      case 'multichoice': {
        renderedElement = (
          <Multichoice 
            options={element.metadata.options} 
            onChange={onChangeFn(element.id)} 
            value={values?.[element.id]} 
          />
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
      </S.Frame>
    </ThemeProvider>
  );
}
