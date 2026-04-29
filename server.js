import express from "express";

const apiKey = process.env.OPENAI_API_KEY;

const app = express();
app.use(express.json());

// Unityから受ける入口
app.post("/chat", async (req, res) => {

  console.log("受信:", req.body);

  const messages = req.body.messages;

  if (!messages) {
    return res.json({
      reply: "エラー: messagesがありません"
    });
  }

  try {
    // OpenAI API呼び出し
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}` // ←ここだけ自分のキーに変更
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        messages: messages,
        max_completion_tokens: 120,
      })
    });

    const data = await response.json();

    console.log("OpenAIレスポンス:", data);

    // エラーでも中身返す（テスト用）
    if (!response.ok) {
      return res.json({
        reply: "OpenAIエラー: " + JSON.stringify(data)
      });
    }

    const reply = data.choices[0].message.content;

    return res.json({
      reply: reply
    });

  } catch (error) {
    console.log("サーバーエラー:", error);

    return res.json({
      reply: "サーバー例外エラー: " + error.message
    });
  }
});

// 動作確認用
app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
