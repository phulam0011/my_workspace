const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

// Đặt khóa API của GPT-3 vào biến environment
const gptAPIKey = process.env.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;

app.post('/api', (req, res) => {
  const { message } = req.body;

  // Gửi yêu cầu POST tới API của GPT-3 để lấy phản hồi
  axios
    .post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 50,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gptAPIKey}`,
      },
    })
    .then(response => {
      const botReply = response.data.choices[0].text.trim();

      // Trả về phản hồi của GPT-3 cho frontend
      res.json({ reply: botReply });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
