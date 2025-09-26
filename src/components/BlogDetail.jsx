"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";

import "../styles/BlogDetail.css";
import ShareMenu from "./ShareMenu";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function BlogDetail({ blog, setLatestTittle }) {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [anonId, setAnonId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [localBlog, setLocalBlog] = useState(blog);

  // Set latest title flag
  // useEffect(() => {
  //   setLatestTittle(true);
  // }, [setLatestTittle]);

  // Initialize anonId safely on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("anonId");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("anonId", id);
      }
      setAnonId(id);
    }
  }, []);

  // Handle like toggle
  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);

    setLocalBlog((prev) => ({
      ...prev,
      likes: newLiked ? prev.likes + 1 : prev.likes - 1,
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${localBlog._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonId }),
      });
      const data = await res.json();
      setLocalBlog((prev) => ({ ...prev, likes: data.likes }));
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  // Add comment
  const handleComment = async (e) => {
    e.preventDefault();
    setOpenComment(false);

    if (!newComment || !name || !email) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs/${localBlog._id}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, comment: newComment }),
        }
      );
      const data = await res.json();
      setLocalBlog((prev) => ({ ...prev, comments: data.comments }));

      // Optional: send to formsubmit.co
      await fetch(
        "https://formsubmit.co/ajax/807acf1b8279e881d111297b8c3f0b55",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            Name: name,
            Email: email,
            Comment: newComment,
            BlogTitle: blog.title,
          }),
        }
      );

      setNewComment("");
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  return (
    <article className="blog-detail">
      <h1 className="skills_heading">{localBlog.title}</h1>
      <p className="date">
        {new Date(localBlog.date).toLocaleDateString("en-US", {
          dateStyle: "long",
        })}
      </p>
      <p className="date">Author: {localBlog.author}</p>
      <img className="main-Image" src={localBlog.image} alt={localBlog.title} />
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: localBlog.content }}
      />
      {/* Like + Share */}
      <div className="like-container">
        <button onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} size="lg" />
        </button>
        <p>{localBlog.likes || 0} likes</p>
        <ShareMenu blog={localBlog} />
      </div>
      {/* Comment Section */}
      <div className="comment-section">
        <button
          className="add-comment"
          onClick={() => setOpenComment(!openComment)}
        >
          <FontAwesomeIcon icon={faComment} size="lg" /> add Comment
        </button>
        <div className="displa-comment">
          {openComment && (
            <form onSubmit={handleComment} style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button type="submit">Comment</button>
            </form>
          )}
          <ul>
            <p
              style={{
                fontSize: "25px",
                color: "var(--sc)",
                marginTop: "-25px",
              }}
            >
              Comments
            </p>
            <hr style={{ width: "105%", height: "1px", marginLeft: "-25px" }} />
            {Array.isArray(localBlog.comments) &&
              localBlog.comments.map((c, i) => (
                <li key={i}>
                  <p
                    className={
                      c.email.includes("kamaluddeenaliyuahmad")
                        ? "admin"
                        : "visiter"
                    }
                  >
                    {c.name}{" "}
                    <span>
                      {c.email.includes("kamaluddeenaliyuahmad")
                        ? "author"
                        : ""}
                    </span>
                  </p>
                  <p className="comment">{c.text}</p>
                  <small>{new Date(c.date).toLocaleString()}</small>
                  <br />
                  <hr />
                </li>
              ))}
          </ul>{" "}
        </div>
      </div>{" "}
    </article>
  );
}

export default BlogDetail;
