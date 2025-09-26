"use client";
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

// Register image resize module
if (typeof window !== "undefined" && Quill && ImageResize) {
  Quill.register("modules/imageResize", ImageResize);
}

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
    if (!editorRef.current) return;

    if (!quillRef.current) {
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
  }, []);

  // Update when value changes from outside (edit form)
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return <div ref={editorRef} />;
}
