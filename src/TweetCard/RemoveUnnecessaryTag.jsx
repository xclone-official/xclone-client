import React, { useEffect, useState } from "react";

const RemoveUnnecessaryTag = ({ htmlContent }) => {
  const [modifiedHtml, setModifiedHtml] = useState("");

  useEffect(() => {
    try {
      const coloredHtmlContent = htmlContent.replace(
        /(https?:\/\/[^\s#]+)/g,
        (match) =>
          `<a href="${decodeURIComponent(match).replace(
            "</p>",
            ""
          )}" target="_blank" style="color: var(--theme-color); cursor: pointer;">${match.replace(
            /^(https?:\/\/)/,
            ""
          )}</a>`
      );
      // Replace #hashtags with orange styling
      const withHashTagsStyled = coloredHtmlContent.replace(
        /#(\w+)/g,
        '<span target="_blank" style="color: var(--theme-color); font-weight:700" class="orange">#$1</span>'
      );

      // Replace @mentions with orange styling
      const withMentionsStyled = withHashTagsStyled.replace(
        /@(\w+)/g,
        `<a target="_blank" style="color: var(--theme-color); cursor: pointer; font-weight:700" href="/p/$1" class="orange">@$1</a>`
      );

      // Wrap the entire paragraph content with the closing </a> tag
      const wrappedContent = withMentionsStyled.replace(
        /<p>(.*?)<\/p>/g,
        (match, p1) => `<p>${p1}</p>`
      );

      setModifiedHtml(wrappedContent);
    } catch (error) {}
  }, [htmlContent]);

  return <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} />;
};

export default RemoveUnnecessaryTag;
