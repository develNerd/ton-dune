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


export const makeTonRequest = async (api:String,query: Map<string,string>): Promise<any> => {

  const querySting = queryString(query);

  const response = await axios.get(
    `${api}?${querySting}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};


const queryString = (query: Map<string, string>): string => {
  return Array.from(query.entries())
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};
