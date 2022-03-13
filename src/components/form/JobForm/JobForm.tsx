import { useState} from 'react';
import { 
  Error,
  Bool, 
  Button, 
  Field, 
  Text, 
  Textarea, 
  Multichoice 
} from 'components';
import { useFormValues } from 'hooks';
import { ThemeProvider } from 'styled-components';
import * as S from '../../Demo/styles';
import { postValuesToApplyAPI } from '../../../helpers/applyAPI';

type JobFormProps = {
  absoluteURL: string,
  job: Frontier.Job
};

type JobFormErrors = {
  [id: string]: string
}

export const JobForm = ({ absoluteURL, job }: JobFormProps) => {
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [errors, setErrors] = useState<JobFormErrors>({})
  const { values, handleChange } = useFormValues(job);

  const validateAllElements = (): JobFormErrors => {
    const allErrors: JobFormErrors = {}

    job.sections.map((section: Frontier.Section) => {
      section.content.map((element: Frontier.Element) => {
        const elementError = validateElement(element)
        if (elementError) {
          allErrors[element.id] = elementError
        }
      })
    })

    return allErrors;
  }

  const validateElement = (element: Frontier.Element): string | null => {
    if (element.metadata.required) {
      if (values[element.id] === undefined) {
        return `${element.id} is required`
      }
    }
    if (element.metadata.pattern && values[element.id] !== undefined) {
      if (!(values[element.id]! as String).toLowerCase().match(element.metadata.pattern)) {
        return `enter a valid ${element.id}`
      }
    }
    return null
  }

  const onChangeFn = (id: string) => (nextVal: string) =>
    handleChange(id, nextVal);

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    } else {
      setIsSubmitting(true)

      // TODO: Consider validating elements one by one in onChangeFn
      const currentErrors = validateAllElements()
      setErrors(currentErrors)

      if (Object.keys(currentErrors).length !== 0) {
        setIsSubmitting(false)
      } else {
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
        {errors[element.id] ?
          (<Error message={errors[element.id]} />) : 
          ""
        }
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
