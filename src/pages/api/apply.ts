import { SupportedValues } from 'hooks';
import type { NextApiRequest, NextApiResponse } from 'next';
const axios = require('axios').default;

const ECHO_API_URL = 'https://postman-echo.com/post'

type FormValues = {
  [id: string]: SupportedValues
}

type FrontierPayload = {
  data: FormValues
}

type ResponseData = {
  message: string | undefined,
  error: string | undefined,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  switch(req.method) {
    case "POST": {
      const data: FormValues = req.body['data']
      console.log(data)

      axios.post(
        ECHO_API_URL,
        data
      ).then((postmanRes: any) => {
        console.log(postmanRes)
      })
      
      res.status(200).json({
        message: "Job submission saved", 
        error: undefined
      })
      break
    }
    default: {
      res.status(405).json({
        message: undefined, 
        error: "Unsupported method"
      })
      break
    }
  }
}
