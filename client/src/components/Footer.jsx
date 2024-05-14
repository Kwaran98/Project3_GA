
import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <ul className='footer_categories'>
        <li><Link to="/posts/categories/Full Time Students">Full Time Students</Link></li>
        <li><Link to="/posts/categories/Part Time Students">Part Time Students</Link></li>
        <li><Link to="/posts/categories/Teaching Assistants">Teaching Assistants</Link></li>
        <li><Link to="/posts/categories/Alumni">Alumni</Link></li>
        <li><Link to="/posts/categories/Software Engineer">Software Engineer</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
      </ul>
      <div className='footer_copyright'>
        <small>All Rights Reserved &copy; Copyright, General Assembly.</small>
      </div>
    </footer>
  )
}
export default Footer