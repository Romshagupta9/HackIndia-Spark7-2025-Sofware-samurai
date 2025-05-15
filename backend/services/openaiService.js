const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getJobTrendsAI(sector) {
  const prompt = `List the top 5 current job market trends in the ${sector} sector as JSON array of {trend, value}.`;
  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return JSON.parse(resp.choices[0].message.content);
}

async function getFuturePredictionsAI(sector) {
  const prompt = `Predict the top 5 future job trends in the ${sector} sector as JSON array of {trend, growthPercentage}.`;
  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return JSON.parse(resp.choices[0].message.content);
}

module.exports = { getJobTrendsAI, getFuturePredictionsAI };
/// openaiService.js