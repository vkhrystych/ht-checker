import OpenAI from "openai";
import { buildDirTree, readFileContent } from "./utils.js";

const openai = new OpenAI();

export const sendFilesStructureToAIAndAskReturnOnlyRelated = async () => {
  const fileTree = buildDirTree("./check");

  const selectOnlyNeededFilesMessage = `
    I have an AutoComplete component written in React.
    I will send you a structure of files and folders of this project.
    We need to check only .ts and .tsx files.
    Please select files related to the component (and also utils, hooks and things related to api) and send me the answer in JSON format:

    {
        neededFiles: [] // Array of file paths
    }

    The structure of the project is below:
    ${fileTree}

    P.S. Please send me ONLY the needed pure and valid json, without any other text!
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: selectOnlyNeededFilesMessage }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);

  const answerWithNeededFiles = JSON.parse(
    completion.choices[0].message.content
  );

  return answerWithNeededFiles.neededFiles;
};

export const sendRelatedFilesContentToAIAndAskToAnalyzeHometask = async (
  neededFilesPaths
) => {
  let filesContent = "";

  for (const filePath of neededFilesPaths) {
    const fullPath = `./check/${filePath}`;
    const fileContent = await readFileContent(fullPath);
    const fileName = fullPath.split("/").pop();

    filesContent += `
          ${fileName}
          ${fileContent}
        `;
  }

  const message = `
    We are checking the hometask for the front-end developer position. 
    The goal is to write an Autocomplete component with following features:

    - The auto-complete component is controlled
    - Component has loader
    - Debounce is implemented
    - Component has "No results found" (or something similar to it) block
    - Keyword highlight is implemented
    - Dropdown suggestion list is implemented
    - The component is using the Real API
    - Click on an item in the suggestion list is implemented
    - Click outside of the input field is implemented
    - Display a user-friendly error message 
    - Error handling is implemented
    - Keyboard navigation (with arrow keys) is implemented

    I will send you the code of the files related to the hometask.
    Please check this code carefully and compare with the list below. 
    Your task will be to check - is the feature from the list implemented or not.

    Send me back the list of the features with ✅ or ❌ for every feature.

    Your second task will be to calculate the final score of all the implemented features.
    Every feature has a certain amount of points.
    Please check the list below and calculate the final score.

    Autocomplete is controlled - 100
    Debounce - 80
    Well split/clean code - 20
    Proper message when no results found - 30
    Proper loading indicator - 30
    Error handling - 30
    Highlight keywords - 70
    Click on item in the suggestion list - 50
    Keyboard navigation - 20
    Click outside of the input field hide suggestion list - 30
    Real world API - 10

    The code of the component is below:
    ${filesContent}

    Your final answer should be in the following format:

    --- Features ---
    The auto-complete component is controlled
    Component has loader
    Debounce is implemented
    Component has "No results found" (or something similar to it) block
    Keyword highlight is implemented
    Dropdown suggestion list is implemented
    The component is using the Real API
    Click on an item in the suggestion list is implemented
    Click outside of the input field is implemented
    Display a user-friendly error message 
    Error handling is implemented
    Keyboard navigation (with arrow keys) is implemented

    --- Score ---
    Autocomplete is controlled - 100
    Debounce - 80
    Well split/clean code - 20
    Proper message when no results found - 30
    Proper loading indicator - 30
    Error handling - 30
    Highlight keywords - 70
    Click on item in the suggestion list - 50
    Keyboard navigation - 20
    Click outside of the input field hide suggestion list - 30
    Real world API - 10

    Please remember that the emoji should depends on the feature implementation.
    Please also mark every score feature with ✅ or ❌.
    `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-4",
  });

  console.log(completion.choices[0].message.content);
};
