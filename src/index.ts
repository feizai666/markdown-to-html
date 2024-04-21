#!/usr/bin/env node
// path: src/index.ts
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { markdown } from "./utils/markdown.js";

const program = new Command();
program
  .version('1.0.0')
  .description('Convert Markdown files to HTML')
  .argument('<file>', 'Markdown file to convert')
  .action((file) => {
    convertMarkdownToHtml(file);
  });

program.parse(process.argv);

async function convertMarkdownToHtml(inputFilePath: string) {
  const content = await fs.readFile(inputFilePath, "utf8");
  const rendered = markdown.render(content);

  const outputFile = path.join(process.cwd(), path.basename(inputFilePath, '.md') + '.html');

  const htmlFile = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Markdown Conversion</title>
  <link rel="stylesheet" href="./public/github-markdown.css">
  <link rel="stylesheet" href="./public/default.css">
  <style>
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }
  </style>
</head>
<body class="markdown-body">
  ${rendered}
</body>
</html>`;

  await fs.writeFile(outputFile, htmlFile, "utf8");
  console.log(`HTML generated at: ${outputFile}`);
}
