"use client";

import "../styles/ShareMenu.css";
import { useState, useEffect, useRef } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

function ShareMenu({ blog }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ Use your Next.js site URL directly
  const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;
  const shareUrl = `${frontendBaseUrl}/blog/${blog._id}`;
  const title = blog.title;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="share-menu" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="share-toggle"
      >
        <FontAwesomeIcon icon={faShareAlt} style={{ marginRight: "6px" }} />
        Share
      </button>

      {open && (
        <div className="share-options">
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
}

export default ShareMenu;
