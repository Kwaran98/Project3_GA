import { useState } from "react";
import PostItem from "../components/PostItem";
import { postDummy } from "../data";

const CategoryPosts = () => {
  const [posts, setPosts] = useState(postDummy);
  return (
    <section>
      {posts.length > 0 ? (
        <div className="container category_posts__container">
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
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default CategoryPosts;
