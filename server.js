import express from "express";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  console.log("受信:", message);

  res.json({
    reply: "テスト返信: " + message
  });
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
