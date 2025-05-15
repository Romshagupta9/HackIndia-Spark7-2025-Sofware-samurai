// config/openai.js
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
////openai.js
// This code initializes the OpenAI API client using the OpenAI SDK.    