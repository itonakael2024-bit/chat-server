import express from "express";

const app = express();  // ←これが最初に必要

app.use(express.json());

app.post("/chat", async (req, res) => {

  console.log("受信:", req.body);

  const messages = req.body.messages;

  if (!messages) {
    return res.json({
      reply: "messagesがありません"
    });
  }

  const lastMessage = messages[messages.length - 1].content;

  res.json({
    reply: "テスト返信: " + lastMessage
  });
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
