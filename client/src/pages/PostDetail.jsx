import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import Thumbnail from "../Images/ReactJS.png";

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className="btn sm blue">
              Edit
            </Link>
            <Link to={`/posts/werwer/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1 className="ptpb">What is React?</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="React" />
        </div>
        <p className="ptpb">
          <b>React</b> is an open-source JavaScript library for building user
          interfaces, primarily for single-page applications. Developed and
          maintained by Facebook, React has gained widespread popularity due to
          its simplicity, efficiency, and component-based architecture.
        </p>
        <p className="ptpb">
          At its core, React utilizes a declarative programming paradigm,
          allowing developers to describe the desired state of the user
          interface and React takes care of updating the DOM to match that state
          efficiently. This approach contrasts with imperative programming,
          where developers have to manually manipulate the DOM to achieve the
          desired UI state.
        </p>
        <p className="ptpb">
          Some of the <b>Key Features</b> are:
        </p>
        <p className="ptpb">
          <b>Component-Based Architecture:</b> <br></br>React applications are
          built using reusable and encapsulated components. Components are
          self-contained units that represent a part of the user interface and
          can be composed together to build complex UIs.
        </p>
        <p className="ptpb">
          <b>Virtual DOM: </b>
          <br></br>React maintains a lightweight, in-memory representation of
          the DOM known as the virtual DOM. When the state of a component
          changes, React compares the virtual DOM with the actual DOM and only
          updates the parts of the DOM that have changed. This results in faster
          updates and improved performance.
        </p>
        <p className="ptpb">
          <b>JSX:</b> <br></br>JSX is a syntax extension for JavaScript that
          allows developers to write HTML-like code within JavaScript. JSX makes
          it easier to create React components and provides a familiar syntax
          for building UIs.
        </p>
        <p className="ptpb">
          <b>Unidirectional Data Flow:</b> <br></br>React follows a
          unidirectional data flow, where data flows in a single direction—from
          parent components to child components. This makes it easier to
          understand how data is passed between components and simplifies the
          debugging process.
        </p>
        <p className="ptpb">
          <b>React Hooks:</b> <br></br> Introduced in React 16.8, Hooks are
          functions that allow developers to use state and other React features
          in functional components. Hooks provide a more elegant way to manage
          state and side effects in React components compared to class-based
          components.
        </p>
        <p className="ptpb">
          <b>React Router:</b>
          <br></br> is a popular routing library for React applications,
          allowing developers to implement client-side routing and navigation in
          single-page applications.
        </p>
        <p className="ptpb">
          Overall, React provides developers with a powerful toolkit for
          building modern, interactive, and efficient user interfaces. Its
          simplicity, performance, and vibrant ecosystem of libraries and tools
          have made it a go-to choice for building web applications across
          industries.
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
