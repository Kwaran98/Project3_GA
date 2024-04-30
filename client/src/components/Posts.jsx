import React, { useState } from "react";
import PostItem from "./PostItem";
import { postDummy } from "../data";

const Posts = () => {
  const [posts, setPosts] = useState(postDummy);

  return (
    <section className="posts">
      {posts.length > 0 ? <div className="container posts__container">
        {posts.map(
          ({ id, thumbnail, category, title, Description, AuthorID }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              Description={Description}
              authorID={AuthorID}
            />
          )
        )}
      </div> : <h2 className="center">No posts found</h2>}
    </section>
  );
};

export default Posts;