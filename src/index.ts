//-Path: "uno tool/src/index.ts"
import * as path from "path";
import express from "express";

const PORT = 2000;
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.listen(PORT, () => console.log("server run at port " + PORT));
