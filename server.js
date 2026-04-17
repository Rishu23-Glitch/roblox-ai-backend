const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());


const API_KEY = "80b06d324d634c508d68260f9a6bd089.Rubp1li8H8ZIYYOLXU92IG_i";

app.post("/ai", async (req, res) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a powerful boss enemy." },
                    { role: "user", content: req.body.prompt }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            reply: response.data.choices[0].message.content
        });

  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
        error: error.response?.data || error.message
    });
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
