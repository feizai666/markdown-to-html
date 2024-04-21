#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// path: src/index.ts
const commander_1 = require("commander");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const markdown_js_1 = require("./utils/markdown.js");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('Convert Markdown files to HTML')
    .argument('<file>', 'Markdown file to convert')
    .action((file) => {
    convertMarkdownToHtml(file);
});
program.parse(process.argv);
function convertMarkdownToHtml(inputFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield fs_extra_1.default.readFile(inputFilePath, "utf8");
        const rendered = markdown_js_1.markdown.render(content);
        const outputFile = path_1.default.join(process.cwd(), path_1.default.basename(inputFilePath, '.md') + '.html');
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
        yield fs_extra_1.default.writeFile(outputFile, htmlFile, "utf8");
        console.log(`HTML generated at: ${outputFile}`);
    });
}
//# sourceMappingURL=index.js.map