// src/makeApiRequest.ts
import axios from 'axios';
import { requestPayload } from './requestPayload';


export const makeApiRequest = async (input: String): Promise<any> => {

  const response = await axios.post(
    `http://127.0.0.1:5001/tondune-86a6f/us-central1/getPrediction`,
    {input:input },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
