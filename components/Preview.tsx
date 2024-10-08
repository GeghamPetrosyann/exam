import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IPost } from "../helpers/types";
import { IComment } from "../helpers/types";
import { BASE } from "../helpers/default";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleAddComment } from "../helpers/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  post: IPost;
  onClose: () => void;
}

export function Preview({ open, onClose, post }: IProps) {


  const [text, setText] = useState({ text: "" })


  const handleComment = (id: number, text: IComment) => {

    handleAddComment(id, text)
      .then(response => {
        console.log(response.message);
        setText({ text: "" })
      })
  }

  console.log("123213", post.comments);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {post.title}
        </Typography>
        <div className="contentStyle">
          <img
            src={BASE + post.picture}
            alt={post.title}
            style={{ width: 300, height: 400, objectFit: 'cover' }}
          />
          <div style={{ width: 400 }}>
            <Typography variant="subtitle1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <strong style={{ marginRight: "8px" }}>
                  {post.likes.length} likes
                </strong>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginRight: "8px" }}>likes:</p>
              </div>
            </Typography>
            {post.likes.length > 0 ? (
              <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
                {post.likes.map((user, index) => (
                  <li key={index} className="likeItemStyle">
                    <img
                      src={BASE + user.picture}
                      alt={`${user.name} ${user.surname}`}
                      className="profilePicStyle"
                    />
                    <Link to={`/profile/${user.id}`}>
                      {user.name} {user.surname}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No likes yet</Typography>
            )}
            <div className="commentsStyle">
              <Typography variant="subtitle1">
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <p style={{ marginRight: "8px" }}>comments:</p>
                  <div>
                    {post?.comments.map((comment, index) => (
                      <p key={index} style={{ margin: "0" }}>
                        {comment.content}
                      </p>
                    ))}
                  </div>
                </div>
              </Typography>

            </div>

            <input
              placeholder="What you think?"
              style={{ padding: "8px", width: "100%" }}
              onChange={(e) => setText({ text: e.target.value })}
              value={text.text}
            />
            <button onClick={() => handleComment(post.id, text)
            }>comment</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
