import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import Thumbnail from "../Images/ReactJS.png";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creator, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/posts/${id}`
        );
        setPost(response.data);
        setCreatorID(response.data.creator);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const removePost = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/posts/${id}`,
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response) {
      setError("Post deletion failed. Please try again");
    }

    navigate("/");
  };

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={creator} createdAt={post?.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="post_detail_buttons">
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="btn sm primary"
                >
                  {" "}
                  Edit
                </Link>
                <Link className="btn sm danger" onClick={removePost}>
                  Delete
                </Link>
              </div>
            )}
          </div>
          <h1 className="ptpb">{post?.title}</h1>
          <div className="post-detail_thumbnail">
            <img src={`${post?.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post?.description }}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
