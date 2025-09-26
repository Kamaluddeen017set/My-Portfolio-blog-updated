"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import QuillEditor from "./QuillEditor";
import "../styles/BlogForm.css";
import { useAlert } from "./AlertContext";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: null,
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "script",
  "list",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "code-block",
];

function BlogForm({ onSubmit, initialData = {} }) {
  // Client-side Quill registration
  const { showAlert } = useAlert();
  const [title, setTitle] = useState(initialData.title || "");
  const [image, setImage] = useState(initialData.image || "");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [date, setDate] = useState(
    initialData.date ? initialData.date.slice(0, 10) : ""
  );
  const [excerpt, setExcerpt] = useState(initialData.excerpt || "");
  const [content, setContent] = useState(initialData.content || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [tags, setTags] = useState(initialData.tags?.join(", ") || "");
  const [comments, setComments] = useState(
    initialData.comments || [{ email: "", text: "" }]
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bpog_images");

    try {
      setUploading(true);
      setUploadProgress(0);

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dg1zkgl6n/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      setImage(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      showAlert("Failed to upload image");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCommentChange = (idx, value) => {
    const updatedComments = [...comments];
    updatedComments[idx] = value;
    setComments(updatedComments);
  };
  const addComment = () => setComments([...comments, { email: "", text: "" }]);
  const removeComment = (idx) =>
    setComments(comments.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      image,
      date,
      excerpt,
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()),
      comments,
    });
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h1>{initialData._id ? "Edit Post" : "Create Post"}</h1>

      <div className="form-columns">
        <div className="left-column">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {uploading && (
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p>{uploadProgress}%</p>
            </div>
          )}
          {image && (
            <img src={image} alt="Preview" style={{ marginTop: "10px" }} />
          )}
        </div>

        <div className="right-column">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>
      <h3>Content</h3>
      <QuillEditor
        value={content}
        className="blog_content"
        modules={modules}
        formats={formats}
        placeholder="Start writing your blog here..."
        onChange={(value) => setContent(value)}
        theme="snow"
      />
      {initialData._id && (
        <div className="comments-section">
          <h3>Comments</h3>
          {comments.map((comment, idx) => (
            <div key={idx} className="comment-item">
              <input
                type="text"
                placeholder="User"
                disabled
                value={comment.email || ""}
              />
              <input
                type="text"
                placeholder="User"
                disabled
                value={comment.text || ""}
              />
              <button type="button" onClick={() => removeComment(idx)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="summit" type="submit">
        {initialData._id ? "Update" : "Submit"}
      </button>
    </form>
  );
}

export default BlogForm;
