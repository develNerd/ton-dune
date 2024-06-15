// src/makeApiRequest.ts
import axios from 'axios';
import { requestPayload } from './requestPayload';


const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "tondune-86a6f";
const MODEL_ID = "text-bison";
const LOCATION_ID = "us-central1";

export const makeApiRequest = async (): Promise<any> => {
  const token = "AIzaSyCn_mWo4AhGXL0kX116ADfpq6niPgrIGYQ";

  const response = await axios.post(
    `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`,
    requestPayload,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
