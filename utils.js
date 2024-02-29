import fs from "fs";
import path from "path";

export const readFileContent = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

export const buildDirTree = (startPath, indent = "") => {
  let treeString = "";

  if (!fs.statSync(startPath).isDirectory()) {
    return `${startPath} is not a directory\n`;
  }

  const items = fs.readdirSync(startPath);

  items.forEach((item) => {
    const location = path.join(startPath, item);

    if (fs.statSync(location).isDirectory()) {
      treeString += `${indent}${item}/\n`;
      treeString += buildDirTree(location, indent + "  ");
    } else {
      treeString += `${indent}${item}\n`;
    }
  });

  return treeString;
};
