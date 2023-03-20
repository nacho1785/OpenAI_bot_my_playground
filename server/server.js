import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const configuration = new Configuration({
  organization: 'org-NGUpAObYj4LEw5wCyw46ZnGY',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors({ origin: 'https://open-ai-bot-kappa.vercel.app/' }));
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!',
  });
});

app.post('/', async (req, res) => {
  try {
    const validModels = [
      'text-davinci-002',
      'text-curie-002',
      'text-babbage-002',
      'text-ada-002',
      'text-davinci-003',
      'text-curie-003',
      'text-babbage-001',
      'text-ada-001',
    ];
    const prompt = req.body.prompt;
    const model = req.body.model;

    if (!validModels.includes(model)) {
      return res.status(400).send({ error: 'Invalid model name.' });
    }
    const response = await openai.createCompletion({
      model: model,
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