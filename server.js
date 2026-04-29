app.use(express.json());

app.post("/chat", async (req, res) => {

  console.log("受信データ:", req.body);

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
