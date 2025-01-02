import { useEffect, useState } from "react";

declare global {
  interface Window {
    edjsHTML: any;
  }
}

const EditorJsRenderer = ({ content }: { content: string | object }) => {
  const [parsedHtml, setParsedHtml] = useState<string[]>([]);

  useEffect(() => {
    const loadEditorJsHTML = async () => {
      // Load the editorjs-html library dynamically
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/editorjs-html@3.4.0/build/edjsHTML.browser.js";
      script.onload = () => {
        const edjsParser = window.edjsHTML();
        try {
          // Parse Editor.js content
          const parsedContent =
            typeof content === "string" ? JSON.parse(content) : content;
          if (parsedContent.blocks) {
            const html = edjsParser.parse(parsedContent);
            setParsedHtml(html);
          }
        } catch (error) {
          console.error("Failed to parse content:", error);
        }
      };
      document.body.appendChild(script);
    };

    loadEditorJsHTML();
  }, [content]);

  return (
    <div className="editorjs-content">
      {parsedHtml.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block }} />
      ))}
    </div>
  );
};

export default EditorJsRenderer;
