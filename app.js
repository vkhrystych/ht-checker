import express from "express";
import ora from "ora";

const app = express();
const port = 666;

import {
  sendFilesStructureToAIAndAskReturnOnlyRelated,
  sendRelatedFilesContentToAIAndAskToAnalyzeHometask,
} from "./prompts.js";

async function askAIToCheckHometask() {
  const spinner = ora("Starting the process").start();

  spinner.color = "green";
  spinner.text = "Sending all the files list to OpenAI";
  const neededFiles = await sendFilesStructureToAIAndAskReturnOnlyRelated();

  spinner.text = "Analyzing the file structure with AI";
  await sendRelatedFilesContentToAIAndAskToAnalyzeHometask(neededFiles);

  spinner.succeed("The process is finished");
}

askAIToCheckHometask();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
