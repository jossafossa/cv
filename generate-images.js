// const sharp = require("sharp");
// const chokidar = require("chokidar");
// const fs = require("fs");
import sharp from "sharp";
import chokidar from "chokidar";
import fs from "fs";

const inputDir = "./src/assets/img";
const outputDir = "./public/img";

// ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

let sizes = [
  {},
  { width: 200, height: 200, suffix: "-200x200" },
  { width: 400, height: 400, suffix: "-400x400" },
  { width: 800, height: 800, suffix: "-800x800" },
  { width: 1500, height: 1500, suffix: "-1500x1500" },
  { width: 2000, height: 2000, suffix: "-2000x2000" },
];
const formats = ["webp"];

// Function to resize images
function resizeImages() {
  fs.readdir(inputDir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      let ext = file.split(".").pop();
      for (let size of sizes) {
        let resized = sharp(`${inputDir}/${file}`).resize(
          size?.width,
          size?.height,
          {
            fit: "outside",
          }
        );
        [...formats, ext].forEach((format) => {
          let newFilename = file.replace(
            `.${ext}`,
            `${size?.suffix || ""}.${format}`
          );
          resized.toFile(`${outputDir}/${newFilename}`);
        });
      }
    });
  });
}

// Resizen van afbeeldingen bij start
resizeImages();

// Watcher voor veranderingen in de afbeeldingen map
chokidar.watch(inputDir).on("all", (event, path) => {
  console.log(`Event: ${event}, Path: ${path}`);
  resizeImages();
});
