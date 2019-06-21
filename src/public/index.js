"use babel";
import express from "express";
const app = express();
const port = 8000;

app.use(express.static("./src/public"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
