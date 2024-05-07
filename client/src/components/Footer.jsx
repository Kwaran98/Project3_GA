import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to="posts/categories/Alumni">Alumni</Link></li>
        <li><Link to="posts/categories/Fulltime Students">Full-Time Students</Link></li>
        <li><Link to="posts/categories/PartTime Students">Part-Time Students</Link></li>
        <li><Link to="posts/categories/TA">Teaching Assistants</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All Rights Reserver &copy; Copyright, General Assembly Association</small>
      </div>
    </footer>
  )
}

export default Footer
