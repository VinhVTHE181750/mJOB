const config = require("../../config.json");
const API_KEY = config.openai.api_key;
const OpenAI = require("openai");
const { log } = require("./Logger");

const client = new OpenAI({
  apiKey: API_KEY, // This is the default and can be omitted
});

async function calcRelevance(type, title, content) {
  try {
    let prompt;
    if (type === "job") {
      prompt = `Evaluate the relevance of the following job title and content:\nTitle: ${title}\nContent: ${content}\nProvide a relevance score from 0 to 100 and a harmfulness score from 0 to 100.`;
    } else if (type === "post") {
      prompt = `Evaluate the relevance of the following post content to the title:\nTitle: ${title}\nContent: ${content}\nProvide a relevance score from 0 to 100 and a harmfulness score from 0 to 100.`;
    } else {
      throw new Error("Invalid type. Must be 'job' or 'post'.");
    }

    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const response = chatCompletion.choices[0].message.content;
    const scores = response.match(/(\d+)/g).map(Number);
    return {
      relevanceScore: scores[0],
      harmfulnessScore: scores[1],
    };
  } catch (error) {
    log(error, "ERROR", "OPENAI");
  }
}

async function generateResponse(prompt) {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const response = chatCompletion.choices[0].message.content;
    return response;
  } catch (error) {
    log(error, "ERROR", "OPENAI");
  }
}

module.exports = { calcRelevance, generateResponse };