import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostItem = ({postID, category, title, Description, authorID, thumbnail}) => {
    const shortDescription = Description.length > 145 ? Description.substr(0, 145) + "...": Description
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;
    return (
    <div>
      <article className="post">
        <div className="post__thumbnail">
            <img src={thumbnail} alt={title} />
        </div>
        <div className="post__content">
            <Link to={`/posts/${postID}`}>
                <h3>{postTitle}</h3>
            </Link>
            <p className="Description">{shortDescription}</p>
            <div className="post__footer">
                <PostAuthor />
                <Link to={`/posts/categories/${category}`} className='btn primary'>{category}</Link>
            </div>
        </div>
      </article>
    </div>
  )
}

export default PostItem
