import { SupportedValues } from 'hooks';
import type { NextApiRequest, NextApiResponse } from 'next';

const ECHO_API_URL = 'https://postman-echo.com/post'

type FormValues = {
  [id: string]: SupportedValues
}

type FrontierPayload = {
  data: FormValues
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Frontier.Job>,
) {
  /* [TODO] Receive form data here and send to echo api */
  console.log('Handle save data');
}
