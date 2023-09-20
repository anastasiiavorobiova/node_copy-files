"use strict";

const fs = require("fs");
const COPY = "cp";

function cp(fileToCopy, newFileName) {
  if (fileToCopy === newFileName) {
    console.log("Path should be different");
    process.exit();
  }

  const fileReader = fs.createReadStream(fileToCopy);
  const fileWriter = fs.createWriteStream(newFileName);

  fileReader.on("data", function (chunk) {
    fileWriter.write(chunk);
  });

  fileReader.on("end", function () {
    fileWriter.close();
    console.log("File is successfully copied");
    process.exit();
  });
}

process.stdin.once("data", (data) => {
  const [command, fileToCopy, newFileName] = data.toString().trim().split(" ");

  if (command !== COPY) {
    console.log("Unknown command");
    process.exit();
  }

  cp(fileToCopy, newFileName);
});

module.exports = {
  cp,
};
