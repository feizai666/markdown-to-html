"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown = void 0;
// path: src/utils/markdown.ts
const highlight_js_1 = __importDefault(require("highlight.js"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const markdown = (0, markdown_it_1.default)({
    html: true,
    highlight: function (str, lang) {
        if (lang && highlight_js_1.default.getLanguage(lang)) {
            try {
                return ('<pre><code class="hljs">' +
                    highlight_js_1.default.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    "</code></pre>");
            }
            catch (__) { }
        }
        return ('<pre><code class="hljs">' +
            markdown.utils.escapeHtml(str) +
            "</code></pre>");
    },
});
exports.markdown = markdown;
//# sourceMappingURL=markdown.js.map