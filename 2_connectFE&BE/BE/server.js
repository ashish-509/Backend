import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready.");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id : 1,
      punchline:
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
      setup: "What do you call a scarecrow that wins an award?",
    },
    {
      id : 2,
      punchline: "They just look confused.",
      setup: "What do you call a fish with no eyes? Fsh!",
    },
    {
      id : 3,
      punchline: "No, I'm still working on my PHP jokes.",
      setup:
        "Hey, did you hear about the restaurant on the moon? Great food, no atmosphere.",
    },
    {
      id : 4,
      punchline: "Because nobody likes a know-it-all!",
      setup: "Why did the bicycle fall over? Because it was two tired.",
    },
    {
      id : 5,
      punchline: "Because of the semicolon!",
      setup:
        "Why did the programmer quit his job? He got into an argument with the code.",
    },
  ];
  res.send(jokes)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
