import React, { useEffect, useState } from "react";

const EditorJsRenderer = ({ data }: { data: string }) => {
  const [jsonData, setJsonData] = useState<any | null>(null);

  useEffect(() => {
    // Parse the JSON data and set it in state
    try {
      const parsedData = JSON.parse(data);
      setJsonData(parsedData);
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  }, [data]);

  if (!jsonData) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      {jsonData && jsonData.blocks?.map((block: any, index: number) => {
        switch (block.type) {
          case "header":
            const HeaderTag = `h${block.data.level}`;
            return <HeaderTag key={index}>{block.data.text}</HeaderTag>;

          case "paragraph":
            return (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              ></p>
            );

          case "list":
            if (block.data.style === "unordered") {
              return (
                <ul key={index}>
                  {block.data.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            } else {
              return (
                <ol key={index}>
                  {block.data.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            }

          case "checklist":
            return (
              <div key={index}>
                {block.data.items.map((item: any, i: number) => (
                  <div key={i}>
                    <input type="checkbox" checked={item.checked} readOnly />
                    <label>{item.text}</label>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <table key={index}>
                <tbody>
                  {block.data.content.map((row: any[], i: number) => (
                    <tr key={i}>
                      {row.map((cell: string, j: number) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );

          case "code":
            return (
              <pre key={index}>
                <code>{block.data.code}</code>
              </pre>
            );

          case "inlineCode":
            return <code key={index}>{block.data.text}</code>;

          case "quote":
            return (
              <blockquote key={index}>
                <p>{block.data.text}</p>
                {block.data.caption && <cite>{block.data.caption}</cite>}
              </blockquote>
            );

          case "marker":
            return (
              <span
                key={index}
                style={{
                  backgroundColor: "yellow",
                }}
              >
                {block.data.text}
              </span>
            );

          case "delimiter":
            return <hr key={index} />;

          case "embed":
            return (
              <div key={index}>
                <iframe
                  width={block.data.width || "100%"}
                  height={block.data.height || "315"}
                  src={block.data.embed}
                  title={block.data.caption || "Embedded content"}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                {block.data.caption && <p>{block.data.caption}</p>}
              </div>
            );

          default:
            return <div key={index}>Unsupported block type: {block.type}</div>;
        }
      })}
    </div>
  );
};

export default EditorJsRenderer;
