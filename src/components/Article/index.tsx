/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import $ from "jquery";
import ClipboardJS from "clipboard";
import "./index.less";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import hljs from "highlight.js";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import inserted from "markdown-it-ins";
import mark from "markdown-it-mark";
import alerts from "markdown-it-alerts";
import anchor from "markdown-it-anchor";
import uslug from "uslug";
import taskLists from "markdown-it-task-lists";
import emoji from "markdown-it-emoji";
import footnote from "markdown-it-footnote";
import abbr from "markdown-it-abbr";
import deflist from "markdown-it-deflist";
import mathjax3 from "markdown-it-mathjax3";
import mermaid from "mermaid";
import markdownIt from "markdown-it";
export interface ArticleProps {
  style?: React.CSSProperties;
  content: string;
  setCurrnetLink: React.Dispatch<React.SetStateAction<string>>;
  handleWindowScroll: any;
}
mermaid.initialize({
  gitGraph: { useMaxWidth: true },
  pie: { useMaxWidth: true },
  startOnLoad: false,
});
const fenceCodeAlias: { [index: string]: string } = {
  markmap: "markdown",
};

let md: any = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    const language = fenceCodeAlias[lang] || lang;
    if (language && hljs.getLanguage(language)) {
      try {
        const parsedCode = hljs.highlight(str, {
          language,
          ignoreIllegals: true,
        }).value;
        const lines = parsedCode.split(/\n/).slice(0, -1);
        const gutter = lines
          .map(
            (_: any, index: number) =>
              `<span class="code-line">${index + 1}</span><br>`
          )
          .join("");
        const html = `<pre class="code-highlight hljs"><span class="lang-label">${language}</span><div class="copy-btn">Copy</div><div class="codeWrapper"><table><tbody><tr><td class="gutter"><pre>${gutter}</pre></td><td><pre class="language-${lang} copy-target">${parsedCode}</pre></td></tr></tbody></table></div></pre>`;
        return html;
      } catch (_) {}
    }

    const parsedCode = md.utils.escapeHtml(str);
    const lines = parsedCode.split(/\n/).slice(0, -1);
    const gutter = lines
      .map(
        (_: string, index: number) =>
          `<span class="code-line">${index + 1}</span><br>`
      )
      .join("");
    const html = `<pre class="code-highlight hljs"><span class="lang-label">${language}</span><div class="copy-btn">Copy</div><div class="codeWrapper"><table><tbody><tr><td class="gutter"><pre>${gutter}</pre></td><td><pre class="language-${lang} copy-target">${parsedCode}</pre></td></tr></tbody></table></div></pre>`;
    return html;
  },
});

// 添加行号以进行精确滚动匹配
function injectLineNumbers(
  tokens: any,
  idx: number,
  options: any,
  env: any,
  slf: any
) {
  var line;
  if (tokens[idx].map && tokens[idx].level === 0) {
    line = tokens[idx].map[0];
    tokens[idx].attrJoin("class", "line");
    tokens[idx].attrSet("data-line", String(line));
  }
  return slf.renderToken(tokens, idx, options, env, slf);
}
md.renderer.rules.paragraph_open = md.renderer.rules.heading_open =
  injectLineNumbers;

// 添加a标签 target="_blank"
var defaultRender =
  md.renderer.rules.link_open ||
  function (tokens: any, idx: number, options: any, _: any, slf: any) {
    return slf.renderToken(tokens, idx, options);
  };
md.renderer.rules.link_open = function (
  tokens: any,
  idx: number,
  options: any,
  env: any,
  slf: any
) {
  var aIndex = tokens[idx].attrIndex("target");
  if (aIndex < 0) {
    tokens[idx].attrPush(["target", "_blank"]);
  } else {
    tokens[idx].attrs[aIndex][1] = "_blank";
  }
  return defaultRender(tokens, idx, options, env, slf);
};

// 表格外面包一层，使其可以横向滚动
md.renderer.rules.table_open = function (
  tokens: any,
  idx: number,
  options: any,
  env: any,
  slf: any
) {
  var line: number;
  const { map, level, type } = tokens[idx];
  if (map && level === 0 && type === "table_open") {
    line = tokens[idx].map[0];
    return (
      `<div class="table-container line" data-line=${line}>` +
      slf.renderToken(tokens, idx, options, env, slf)
    );
  }
  return slf.renderToken(tokens, idx, options, env, slf);
};

md.renderer.rules.table_close = function (
  tokens: any,
  idx: number,
  options: any,
  env: any,
  slf: any
) {
  if (tokens[idx].type === "table_close" && tokens[idx].level === 0) {
    return slf.renderToken(tokens, idx, options, env, slf) + "</div>";
  }
  return slf.renderToken(tokens, idx, options, env, slf);
};

const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);

md.renderer.rules.fence = (
  tokens: any,
  idx: string | number,
  opts: any,
  env: any,
  self: any
) => {
  const token = tokens[idx];
  const code = token.content.trim();
  const info = token.info.trim();
  if (/^mermaid=\S+$/.test(info)) {
    const id = info.split("=")[1];
    const uniqId = "render" + id;
    return `<div class="mermaid ${uniqId}" data-id=${uniqId}><div id="code-${uniqId}" style="display:none">${code}</div><div class="svg-container" id="svg-${uniqId}"></div></div>`;
  }
  return defaultRenderer(tokens, idx, opts, env, self);
};
md.use(emoji)
  .use(footnote)
  .use(abbr)
  .use(deflist)
  .use(sub)
  .use(sup)
  .use(inserted)
  .use(mark)
  .use(alerts)
  .use(anchor, {
    slugify: (s: string) => uslug(s),
  })
  .use(taskLists)
  .use(mathjax3);

const Article: React.FC<ArticleProps> = (props) => {
  const { content, setCurrnetLink, handleWindowScroll } = props;
  const [html, setHtml] = useState("");

  useEffect(() => {
    const html = md.render(content);
    setHtml(html);
  }, [content]);

  useEffect(() => {
    $(".mermaid").each((_, ele) => {
      const id = ele.dataset.id || "";
      const code = $(`#code-${id}`).text();
      mermaid.render(id, code, $(`#svg-${id}`)[0]).then((res) => {
        if (res.svg.length > 0) {
          $(`#svg-${id}`).html(res.svg);
        }
      });
    });
  }, [html]);

  useEffect(() => {
    Fancybox.bind("img", {
      hideScrollbar: false,
      Toolbar: {
        enabled: false,
      },
    });

    return () => {
      Fancybox.unbind("img");
    };
  }, [html]);

  useEffect(() => {
    var clipboard = new ClipboardJS(".copy-btn", {
      target: function (trigger) {
        $(trigger).text("Copied");
        return $(trigger).next().find(".copy-target")[0];
      },
    });

    clipboard.on(
      "success",
      function (e: {
        action: any;
        text: any;
        trigger: any;
        clearSelection: () => void;
      }) {
        e.clearSelection();
        setTimeout(() => {
          $(e.trigger).text("Copy");
        }, 2000);
      }
    );
    return () => {
      clipboard.destroy();
    };
  }, []);

  useEffect(() => {
    const first = Array.from(
      document.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]")
    )[0];
    if (!first) return;
    setCurrnetLink(first.getAttribute("id") || "");
    $(window).on("scroll", handleWindowScroll);
  }, [html]);

  return (
    <div>
      <div
        className="article-wrap rmdcm5-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default Article;
