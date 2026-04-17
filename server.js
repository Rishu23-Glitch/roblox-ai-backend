const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/ai", async (req, res) => {
    console.log("Request received:", req.body);

    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama3",
            prompt: req.body.prompt,
            stream: false
        });

        res.json({
            reply: response.data.response
        });

    } catch (error) {
        console.log("ERROR:", error.message);
        res.status(500).send("error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});