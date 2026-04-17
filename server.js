const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const API_KEY = "PASTE_YOUR_API_KEY_HERE";

app.post("/ai", async (req, res) => {
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a powerful game boss." },
                { role: "user", content: req.body.prompt }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        res.json({
            reply: response.data.choices[0].message.content
        });

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).send("error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
