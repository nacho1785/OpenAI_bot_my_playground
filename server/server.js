import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Configuration, OpenAIApi } from 'openai';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const customAxios = axios.create();
axiosRetry(customAxios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

const configuration = new Configuration({
  organization: 'org-zs5TqBhYY2ilhDVtZFUNOP6u',
  apiKey: process.env.OPENAI_API_KEY,
  baseClient: customAxios,
});

const openai = new OpenAIApi(configuration);


const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://open-ai-bot-kappa.vercel.app',
]; 

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
});
app.use(limiter);

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Life, liberty and property.',
  });
});

app.post('/', async (req, res) => {
  try {
  /*  const validModels = [
      'text-davinci-002',
      'text-curie-002',
      'text-babbage-002',
      'text-ada-002',
      'text-davinci-003',
      'text-curie-003',
      'text-babbage-001',
      'text-ada-001',
    ]; */
    const prompt = req.body.prompt;
    /* const model = req.body.model;

    if (!validModels.includes(model)) {
      return res.status(400).send({ error: 'Invalid model name.' });
    } */
    const defaultModel = 'text-davinci-003';
    const response = await openai.createCompletion({
      model: defaultModel,
      prompt: `${prompt}`,
      temperature: 0.2,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || 'Something went wrong');
  }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));