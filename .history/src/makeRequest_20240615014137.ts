// src/makeApiRequest.ts
import axios from 'axios';
import { requestPayload } from './requestPayload';


const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "tondune-86a6f";
const MODEL_ID = "text-bison";
const LOCATION_ID = "us-central1";

export const makeApiRequest = async (): Promise<any> => {
  const token = "ya29.a0AXooCguZPMwYhvxHqTPjDZWwdtitILxh55pS8aJ_5UTc38LAtjAhI7zvZOdJaVEUovww_ux2GidATT90Pki8hd4IQDFeFLByB3CId-upUe_mXhI8L6VWL543ZYepv83iRW-nHvBVjakLMIu48dxMj51qjkzMZ7cx5JJ_MOrCGAaCgYKAW8SARESFQHGX2MiFwn-JUtBxmYiQjYVZ4ZRDQ0177";

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
