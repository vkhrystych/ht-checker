import OpenAI from "openai";
import { buildDirTree, readFileContent } from "./utils.js";

const openai = new OpenAI();

export const sendFilesStructureToAIAndAskReturnOnlyRelated = async () => {
  const fileTree = buildDirTree("./check");

  const selectOnlyNeededFilesMessage = `
    I have an AutoComplete component written in React.
    I will send you a structure of files and folders of this project.
    We need to check only .ts and .tsx files.

    Please also try to find the file that called "questions" or something like this.

    Please select files related to the component (and also utils, hooks and things related to api) and send me the answer in JSON format:

    {
        neededFiles: [] // Array of file paths,
        questions: "" // Path to the questions file
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

  return answerWithNeededFiles;
};

export const sendRelatedFilesContentToAIAndAskToAnalyzeHometask = async (
  neededFilesPaths
) => {
  let filesContent = "";

  for (const filePath of neededFilesPaths.neededFiles) {
    const fullPath = `./check/${filePath}`;
    let fileContent;

    try {
      fileContent = await readFileContent(fullPath);
    } catch (error) {
      console.log(error);
    } finally {
      if (fileContent) {
        const fileName = fullPath.split("/").pop();
        filesContent += `
                  ${fileName}
                  ${fileContent}
                `;
      }
    }
  }

  const questionsFileContent = await readFileContent(
    `./check/${neededFilesPaths.questions}`
  );

  const message = `
    We are checking the hometask for the front-end developer position. 
    The goal of the hometask is to write an Autocomplete component with following features:
    - The auto-complete component is controlled (You can pass the value and onChange handler as a props to the main component)
    - Component has loader (component has a loader when the API request is in progress)
    - Debounce is implemented (component doesn't send a request on every key press, but only after the user stopped typing for a certain amount of time)
    - Component has "No results found" (or something similar to it) block (it's displayed when the API request is successful, but the response is empty)
    - Keyword highlight is implemented (highlight the keyword in the suggestion list items and in the input field value)
    - Dropdown suggestion list is implemented (the list of suggestions is displayed when it has at least one item)
    - The component is using the real-world API (not the "API" from the .json file or something like this)
    - Click on an item in the suggestion list is implemented (when the user clicks on an item in the suggestion list, the input field value is changed to the value of the clicked item)
    - Click outside of the input field is implemented (when the user clicks outside of the input field, the suggestion list is hidden)
    - Error handling is implemented (the logic for API calling is wrapped in a try-catch block and the error is handled properly)
    - Display a user-friendly error message (if the API request fails)
    - Keyboard navigation is implemented (the user can navigate through the suggestion list with the arrow keys)

    I will send you the code of the files related to this hometask.
    Your first task is to carefully check the code of the related files and compare it with the list of the features above.

    Send me back the list of the features with ✅ or ❌ for every feature. Emoji should be at start of the line and should be separated by space from the feature name!
    If you are not sure about the feature, please place 🤔 emoji and write a reason why you are not sure about the point.

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

    Please also check the answers to the questions about React below:
    ${questionsFileContent}

    Your final answer should be ONLY in the following format, please do not add any other text (except ✅ and ❌):

    --- Features ---
    The auto-complete component is controlled
    Component has loader
    Debounce is implemented
    Component has "No results found"
    Keyword highlight is implemented
    Dropdown suggestion list is implemented
    The component is using the real-world API
    Click on an item in the suggestion list is implemented
    Click outside of the input field is implemented
    Error handling is implemented
    Display a user-friendly error message 
    Keyboard navigation (with arrow keys) is implemented

    Right answers to the questions in % is: (please calculate the percentage of right answers to the questions about React and paste it here)

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

    Please also mark every score feature with ✅ or ❌.
    Please remember that the emoji should depends on the feature implementation.
    `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-4",
  });

  console.log("\n" + completion.choices[0].message.content);
};
