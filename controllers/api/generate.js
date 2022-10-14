const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: "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",
    // apiKey: PROCESS.ENV.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.post('/', async (req, res)=> {

    try {
        const AIgen = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: req.body.textSelected,
            max_tokens: 100,
            temperature: 0.5,
        });

        // console.log("test")
        // console.log(req.body)

        res.status(200).json({checkresult: AIgen.data.choices[0].text}); 

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;