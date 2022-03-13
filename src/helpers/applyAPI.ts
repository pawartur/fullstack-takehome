import { SupportedValues } from 'hooks';

export async function postValuesToApplyAPI(
  absoluteURL: string,
  values: {[id: string]: SupportedValues}
): Promise<Response>  {

  const body = {
    data: values
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return fetch(absoluteURL+'/api/apply', requestOptions)
}
