import React, { useEffect, useState } from "react";

const RemoveUnnecessaryTag = ({ htmlContent }) => {
  const [modifiedHtml, setModifiedHtml] = useState("");

  useEffect(() => {
    try {
      const coloredHtmlContent = htmlContent.replace(
        /(https?:\/\/[^\s]+)/g,
        (match) =>
          `<a href="${decodeURIComponent(match).replace(
            "</p>",
            ""
          )}" target="_blank" style="color: orange; cursor: pointer;">${match.replace(
            /^(https?:\/\/)/,
            ""
          )}</a>`
      );

      // Remove trailing </p> tags
      const cleanedHtmlContent = coloredHtmlContent.replace(/<\/p>$/, "");

      setModifiedHtml(cleanedHtmlContent);
    } catch (error) {
      console.log("RemoveUnnecessary Tag", error);
    }
  }, [htmlContent]);

  return <span dangerouslySetInnerHTML={{ __html: modifiedHtml }} />;
};

export default RemoveUnnecessaryTag;
