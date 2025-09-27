"use client";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

export default function QuillEditor({
  value,
  onChange,
  modules,
  formats,
  placeholder,
}) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    let Quill;
    let ImageResize;

    (async () => {
      // Dynamically import Quill + ImageResize only on client
      const quillModule = await import("quill");
      Quill = quillModule.default;

      const imageResizeModule = (await import("quill-image-resize-module-react")).default;

      if (Quill && imageResizeModule) {
        Quill.register("modules/imageResize", imageResizeModule);
      }

      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder,
          modules,
          formats,
        });

        // Listen for changes
        quillRef.current.on("text-change", () => {
          if (onChange) {
            let html = quillRef.current.root.innerHTML;

            // 🔹 unwrap images from <p>
            html = html.replace(/<p><img(.*?)><\/p>/g, "<img$1>");

            onChange(html);
          }
        });
      }

      // Set initial content
      if (quillRef.current && value) {
        quillRef.current.root.innerHTML = value;
      }
    })();

    return () => {
      quillRef.current = null;
    };
  }, []);

  // Sync external value updates
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return <div ref={editorRef} />;
}
