import React, { useEffect, useState } from "react";

function RemoveUnnecessaryTag({ htmlContent }) {
  const [modifiedHtml, setModifiedHtml] = useState("");

  useEffect(() => {
    // Create a temporary DOM element to manipulate the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Find the last <p> tag with &nbsp; elements
    const lastPTag = tempDiv.querySelector("p:last-child");
    if (lastPTag && lastPTag.innerHTML === "&nbsp;") {
      // Remove the last <p> tag with &nbsp; elements
      lastPTag.remove();
    }

    // Get the modified HTML content without the unnecessary &nbsp; elements
    const modifiedHtmlContent = tempDiv.innerHTML;

    // Set the modified HTML content in the component's state
    setModifiedHtml(modifiedHtmlContent);
  }, [htmlContent]);

  return (
    <span
      className="tweet_text"
      dangerouslySetInnerHTML={{ __html: modifiedHtml }}
    ></span>
  );
}

export default RemoveUnnecessaryTag;
