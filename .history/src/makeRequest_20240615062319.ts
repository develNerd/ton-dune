// src/makeApiRequest.ts
import axios from 'axios';
import { requestPayload } from './requestPayload';


export const makeApiRequest = async (input: String): Promise<any> => {

  const response = await axios.post(
    `https://getprediction-ppfqftrw5a-uc.a.run.app`,
    {input:input },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
